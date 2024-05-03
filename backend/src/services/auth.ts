import { Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mailOptions, mailTransporter } from "../helpers/mailTransporter";
import { userRole } from "../globals";
import { extractPermissions, extractRole, getUserId } from "../helpers/getRole";
import { db } from "../drizzle/db";
import { TokenTable, UserRoleTable, UserTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { getUserByEmailWithPermissions } from "../repository/UserRepository";
import { InvalidAccess } from "../errors/InvalidAccess";
import { InvalidType } from "../errors/InvalidType";
import { InvalidCredentials } from "../errors/InvalideCredentials";
import { ResourceNotFound } from "../errors/ResourceNotFound";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION_MINUTES = process.env.JWT_EXPIRATION_MINUTES;
const emailPattern: RegExp = /^[\w\.-]+@[\w\.-]+\.\w+$/;

export const changePassword = async (req: Request, res: Response) => {
  const token = (req.headers.authorization as string).split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = getUserId(token);

    const { oldPassword, newPassword } = req.body;

    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.id, userId),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!compareSync(oldPassword, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const hashedPassword = hashSync(newPassword, 10);

    await db
      .update(UserTable)
      .set({ password: hashedPassword })
      .where(eq(UserTable.id, user.id))
      .execute();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!emailPattern.test(email))
      return res.status(400).json({ message: "Invalid email" });

    const user = await db.query.UserTable.findFirst({
      where: (model) => eq(model.email, email),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateEmailToken();
    const expiration = new Date(Date.now() + 3600000);

    await db
      .insert(TokenTable)
      .values({
        user_id: user.id,
        body: resetToken,
        expiration: expiration,
      })
      .onConflictDoUpdate({
        target: TokenTable.user_id,
        set: {
          body: resetToken,
          expiration: expiration,
        },
      })
      .execute();

    const mail = {
      ...mailOptions,
      to: email,
      subject: "Password Reset Token",
      html: `<p>Your password reset token is: <b>${resetToken}</b></p>`,
    };
    try {
      await mailTransporter.sendMail(mail);
    } catch (e) {
      return res.status(500).json({ message: "SMTP Server Failed" });
    }

    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPasswordConfirm = async (req: Request, res: Response) => {
  const { email, token, newPassword } = req.body;

  try {
    const user = await db.query.UserTable.findFirst({
      where: (model) => eq(model.email, email),
      with: {
        token: true,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the token matches the user's token and if it's still valid
    if (user.token && user.token.body === token && user.token.valid) {
      // Check if the token is still valid based on the expiration time
      const currentTime = new Date();
      if (currentTime < user.token.expiration) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await db.transaction(async (tx) => {
          await tx
            .update(UserTable)
            .set({ password: hashedPassword })
            .where(eq(UserTable.id, user.id))
            .execute();

          // Invalidate the token
          await tx
            .delete(TokenTable)
            .where(eq(TokenTable.user_id, user.id))
            .execute();
        });

        return res
          .status(200)
          .send({ message: "Password confirmed successfully" });
      } else {
        return res.status(400).send({ message: "Token has expired" });
      }
    } else {
      return res.status(400).send({ message: "Invalid token" });
    }
  } catch (error) {
    console.error("Error confirming password:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {};

export const createUser = async (req: Request, res: Response) => {
  try {
    let { first_name, last_name, email, mobile, roles, sts_id, landfill_id } =
      req.body;

    (sts_id = +sts_id), (landfill_id = +landfill_id);

    if (!first_name || !last_name || !email || !mobile || !roles) {
      return res.status(400).json({ message: "All fields are required" });
    } else if (
      (roles.includes(userRole.STS_MANAGER) && !sts_id) ||
      (roles.includes(userRole.LANDFILL_MANAGER) && !landfill_id)
    ) {
      return res
        .status(400)
        .json({ message: "STS or Landfill ID is required" });
    } else if (mobile.length != 11 || mobile[0] !== "0" || mobile[1] !== "1") {
      return res.status(400).json({ message: "Invalid mobile number" });
    } else if (emailPattern.test(email) == false) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const password = generateRandomPassword(10);

    const present = await db.transaction(async (db) => {
      const user = await db.query.UserTable.findFirst({
        where: (model) => eq(model.email, email),
      });
      let sts;
      if (sts_id)
        sts = await db.query.StsTable.findFirst({
          where: (model) => eq(model.id, sts_id),
        });
      let landfill;
      if (landfill_id)
        landfill = await db.query.LandfillTable.findFirst({
          where: (model) => eq(model.id, landfill_id),
        });
      return { user, sts, landfill };
    });

    if (present.user) {
      return res.status(409).json({ message: "User already exists" });
    } else if (!present.sts && sts_id)
      return res.status(404).json({ message: "STS not found" });
    else if (!present.landfill && landfill_id)
      return res.status(404).json({ message: "Landfill not found" });

    const newUser = await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(UserTable)
        .values({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: hashSync(password, 10),
          mobile: mobile,
          sts_id: sts_id ? sts_id : null,
          landfill_id: landfill_id ? landfill_id : null,
        })
        .returning({
          id: UserTable.id,
        });
      roles.forEach(
        async (role: string) =>
          await tx
            .insert(UserRoleTable)
            .values({ user_id: user.id, role: role })
            .execute()
      );
      return user;
    });

    const mail = {
      ...mailOptions,
      to: email,
      subject: "Welcome to EcoSync",
      html: `<p>Hi ${first_name}!</p><p>System Admin has created an account for you on EcoSync.</p><p>Please login with the credientials below and reset the password right after you logging in.</p><p>Email: ${email}</p><p>Password: <b>${password}</b></p>`,
    };
    try {
      await mailTransporter.sendMail(mail);
    } catch (e) {
      return res.status(500).json({ message: "SMTP Server Failed" });
    }
    return res.status(200).json({ message: "User created successfully" });
  } catch (e) {
    return res.status(501).json({ message: "Internal Server Error" });
  }
};

export const getToken = async ({ email, password }: any) => {
  try {
    if (emailPattern.test(email) == false) {
      throw new InvalidType("Email", 400);
    }

    let user = await getUserByEmailWithPermissions(email);

    if (!user) {
      throw new ResourceNotFound("User", email);
    }

    if (!compareSync(password, user.password)) {
      throw new InvalidCredentials();
    }

    const roles = extractRole(user.roles);
    const permissions = extractPermissions(user.roles);

    if (roles.includes(userRole.UNASSIGNED)) {
      throw new InvalidAccess();
    }

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

    return token;
  } catch (error) {
    throw error;
  }
};

export const authenticateToken = async (req: Request, res: Response) => {
  const token = (req.headers.authorization as string).split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  try {
    const userId = getUserId(token);

    const user = await db.query.UserTable.findFirst({
      where: (model) => eq(model.id, userId),
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(403).json({ message: error.message });
  }
};

// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function generateRandomPassword(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}
