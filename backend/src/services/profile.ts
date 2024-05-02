import { Request, Response } from "express";
import { getUserId } from "../helpers/getRole";
import { hashSync } from "bcrypt";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { UserTable } from "../drizzle/schema";

const emailPattern: RegExp = /^[\w\.-]+@[\w\.-]+\.\w+$/;

export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    let currentUserId = getUserId(token);
    const user = await db.query.UserTable.findFirst({
      where: (model) => eq(model.id, currentUserId),
      columns: {
        first_name: true,
        last_name: true,
        email: true,
        mobile: true,
        profile_photo: true,
        created_at: true,
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

  if (!first_name || !last_name || !email || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  } else if (emailPattern.test(email) == false) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    let currentUserId = getUserId(token);

    const oldUser = await db.query.UserTable.findFirst({
      where: (model) => eq(model.id, currentUserId),
      columns: {
        profile_photo: true,
        password: true,
      },
    });

    if (!oldUser) return res.status(404).json({ error: "User not found" });

    const newPass = password ? hashSync(password, 10) : oldUser.password;
    const user = await db
      .update(UserTable)
      .set({
        first_name,
        last_name,
        email,
        mobile,
        profile_photo: profile_photo ? profile_photo : oldUser.profile_photo,
        password: newPass,
      })
      .where(eq(UserTable.id, currentUserId))
      .execute();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};
