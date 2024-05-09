import { Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mailOptions, mailTransporter } from "../helpers/mailTransporter";
import { userRole } from "../globals";
import { extractPermissions, extractRole, getUserId } from "../helpers/getRole";
import { db } from "../drizzle/db";
import {
  changeUserPassword,
  getUserByEmail,
  getUserByEmailWithPermissions,
  getUserByEmailWithToken,
  getUserById,
} from "../repository/UserRepository";
import { InvalidAccess } from "../errors/InvalidAccess";
import { InvalidType } from "../errors/InvalidType";
import { InvalidCredentials } from "../errors/InvalideCredentials";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { deleteToken, insertToken } from "../repository/TokenRepository";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION_MINUTES = process.env.JWT_EXPIRATION_MINUTES;
const emailPattern: RegExp = /^[\w\.-]+@[\w\.-]+\.\w+$/;

export const changePasswordService = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const user = await getUserById(userId, true);

    if (!user) throw new ResourceNotFound("User", userId);

    if (!compareSync(oldPassword, user.password))
      throw new InvalidCredentials();

    const hashedPassword = hashSync(newPassword, 10);
    await changeUserPassword(userId, hashedPassword);
    return { message: "Password updated successfully" };
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (email: string) => {
  try {
    if (!emailPattern.test(email)) throw new InvalidType("Email");
    const user = await getUserByEmail(email);
    if (!user) throw new ResourceNotFound("User", email);

    const resetToken = generateEmailToken();
    const expiration = new Date(Date.now() + 3600000);
    const token = await insertToken(user.id, resetToken, expiration);
    if (!token) throw new Error("Failed to insert token");

    const mail = {
      ...mailOptions,
      to: email,
      subject: "Password Reset Token",
      html: `<p>Your password reset token is: <b>${resetToken}</b></p>`,
    };
    try {
      await mailTransporter.sendMail(mail);
    } catch (e) {
      throw new Error("Failed to send email");
    }

    return { message: "Password reset email sent successfully" };
  } catch (error) {
    throw error;
  }
};

export const resetPasswordConfirmSerice = async ({
  email,
  token,
  newPassword,
}: any) => {
  try {
    const user = await getUserByEmailWithToken(email);
    if (!user) throw new ResourceNotFound("User", email);

    // Check if the token matches the user's token and if it's still valid
    if (user.token && user.token.body === token && user.token.valid) {
      // Check if the token is still valid based on the expiration time
      const currentTime = new Date();
      if (currentTime < user.token.expiration) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await db.transaction(async (tx) => {
          await changeUserPassword(user.id, hashedPassword, tx);
          // Invalidate the token
          await deleteToken(user.id, tx);
        });

        return { message: "Password confirmed successfully" };
      } else throw new InvalidType("Token");
    } else throw new InvalidType("Token");
  } catch (error) {
    throw new Error("Failed to confirm password");
  }
};

export const logout = async (req: Request, res: Response) => {};

export const getTokenService = async ({ email, password }: any) => {
  try {
    if (emailPattern.test(email) == false) throw new InvalidType("Email", 400);

    let user = await getUserByEmailWithPermissions(email);

    if (!user) throw new ResourceNotFound("User", email);

    if (!compareSync(password, user.password)) throw new InvalidCredentials();

    const roles = extractRole(user.roles);
    const permissions = extractPermissions(user.roles);

    if (roles.includes(userRole.UNASSIGNED)) throw new InvalidAccess();

    const payload = {
      userId: user.id,
      name: user.first_name,
      roles,
      permissions,
      profile_photo: user.profile_photo,
      sts_id: user.sts_id,
      landfill_id: user.landfill_id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: `${JWT_EXPIRATION_MINUTES}m`,
    });

    return { token, roles };
  } catch (error) {
    throw error;
  }
};

export const authenticateTokenService = async (token: string) => {
  try {
    const userId = getUserId(token);
    const user = await getUserById(userId);
    if (!user) throw new ResourceNotFound("User", userId);
    return user;
  } catch (error: any) {
    throw error;
  }
};

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export function generateRandomPassword(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}
