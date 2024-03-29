import { prisma } from "./db";
import { Request, Response } from "express";
import { getUserId } from "./helpers/getRole";
import { hashSync } from "bcrypt";

export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const currentUserId = getUserId(token);
    const user = await prisma.user.findFirst({
      where: {
        id: currentUserId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        mobile: true,
        profile_photo: true,
        role: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

export const updateLoggedInUser = async (req: Request, res: Response) => {
  const { first_name, last_name, email, mobile, profile_photo, password } =
    req.body;
  try {
    const token = req.headers.authorization as string;
    const currentUserId = getUserId(token);
    const oldUser = await prisma.user.findFirst({
      where: {
        id: currentUserId,
      },
      select: {
        profile_photo: true,
        password: true,
      },
    });

    if (!oldUser) return res.status(404).json({ error: "User not found" });

    const newPass = password ? hashSync(password, 10) : oldUser.password;
    const user = await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        first_name,
        last_name,
        email,
        mobile,
        profile_photo: profile_photo ? profile_photo : oldUser.profile_photo,
        password: newPass,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};
