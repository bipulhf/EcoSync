import e, { Request, RequestHandler, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mailOptions, mailTransporter } from "./helpers/mailTransporter";
import { prisma } from "./db";
import { userRole } from "./globals";
import { checkRole, getUserId } from "./helpers/getRole";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION_MINUTES = process.env.JWT_EXPIRATION_MINUTES;

export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const {
    first_name,
    last_name,
    email,
    profile_photo,
    password,
    mobile,
    role,
    sts_id,
    landfill_id,
  } = req.body;

  try {
    const token = req.headers.authorization as string;

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({
        message:
          "Permission Denined, Only System Admin or Owner Can Update User",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT token expired or invalid" });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        first_name,
        last_name,
        email,
        profile_photo: profile_photo
          ? profile_photo
          : existingUser.profile_photo,
        password: password ? hashSync(password, 10) : existingUser.password,
        mobile,
        role,
        sts_id: sts_id ? +sts_id : null,
        landfill_id: landfill_id ? +landfill_id : null,
      },
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string) || req.cookies.jwt;
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({
        message: "Permission Denined, Only System Admin can access user",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT token expired or invalid" });
  }

  try {
    const userId = parseInt(req.params.id);
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete the user
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(204).json({ message: "Deleted user successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({
        message: "Permission Denined, Only System Admin can access user",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT token expired or invalid" });
  }

  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      // Exclude the password field from the returned user object
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        profile_photo: true,
        mobile: true,
        role: true,
        sts_id: true,
        landfill_id: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({
        message: "Permission Denined, Only System Admin can access user",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT token expired or invalid" });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        profile_photo: true,
        mobile: true,
        role: true,
        sts_id: true,
        landfill_id: true,
        token: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userId = getUserId(token);

    const { oldPassword, newPassword } = req.body;

    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!compareSync(oldPassword, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const hashedPassword = hashSync(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateEmailToken();

    const expiration = new Date(Date.now() + 3600000);

    // Update the existing token or create a new one if it doesn't exist
    await prisma.token.upsert({
      where: { userId: user.id },
      update: { body: resetToken, expiration: expiration },
      create: { body: resetToken, expiration: expiration, userId: user.id },
    });

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
    const user = await prisma.user.findUnique({
      where: { email },
      include: { token: true },
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
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        });

        // Invalidate the token
        await prisma.token.update({
          where: { id: user.token.id },
          data: { valid: false },
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
  const token = req.headers.authorization as string;
  if (!checkRole(token, userRole.admin)) {
    return res
      .status(401)
      .json({ message: "Unauthorized, Only System Admin can create users" });
  }
  const { first_name, last_name, email, mobile, role, sts_id, landfill_id } =
    req.body;

  let user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const password = generateRandomPassword(10);
  
  if(sts_id) {
    const sts = await prisma.sts.findFirst({
      where: {
        id: +sts_id
      }
    });
    if(!sts) {
      return res.status(403).json({ message: "STS does not exist" });
    }
  }
  else if(landfill_id) {
    const sts = await prisma.landfill.findFirst({
      where: {
        id: +landfill_id
      }
    });
    if(!sts) {
      return res.status(403).json({ message: "Lanfill does not exist" });
    }
  }

  user = await prisma.user.create({
    data: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashSync(password, 10),
      profile_photo:
        "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
      mobile: mobile,
      role: role,
      sts_id: sts_id != null ? +sts_id : null,
      landfill_id: landfill_id != null ? +landfill_id : null,
    },
  });

  const mail = {
    ...mailOptions,
    to: email,
    subject: "Welcome to EcoSync",
    html: `<p>Hi ${first_name}!</p><p>System Admin has created an account for you on EcoSync.</p><p>Please login with the credientials below and reset the password right after you logging in.</p><p>Email: ${user.email}</p><p>Password: <b>${password}</b></p>`,
  };
  try {
    await mailTransporter.sendMail(mail);
  } catch (e) {
    return res.status(500).json({ message: "SMTP Server Failed" });
  }

  return res.status(200).json({ message: "User created successfully" });
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if(user.role == userRole.unassigned) {
      return res.status(401).json({ message: "Ask admin to assign you a role" });
    }

    const payload = {
      userId: user.id,
      name: user.first_name,
      role: user.role,
      profile_photo: user.profile_photo,
      sts_id: user.sts_id,
      landfill_id: user.landfill_id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: `${JWT_EXPIRATION_MINUTES}m`,
    });

    return res.status(200).json({ token, role: user.role });
  } catch (error) {
    return res.status(501).json({ message: "Internal Error" });
  }
};

export const authenticateToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  try {
    const userId = getUserId(token);

    const user = await prisma.user.findFirst({ where: { id: userId } });

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
