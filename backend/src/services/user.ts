import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { UserRoleTable, UserTable } from "../drizzle/schema";
import { getUserId } from "../helpers/getRole";
import { hashSync } from "bcrypt";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.query.UserTable.findMany({
      columns: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        profile_photo: true,
        mobile: true,
        sts_id: true,
        landfill_id: true,
      },
      orderBy: (model, { asc }) => asc(model.id),
      with: {
        roles: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await db.query.UserTable.findFirst({
      where: (model) => eq(model.id, userId),
      columns: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        profile_photo: true,
        mobile: true,
        sts_id: true,
        landfill_id: true,
      },
      orderBy: (model, { asc }) => asc(model.id),
      with: {
        roles: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const existingUser = await db.query.UserTable.findFirst({
      where: (model) => eq(model.id, userId),
    });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete the user
    await db.delete(UserTable).where(eq(UserTable.id, userId)).execute();
    return res.status(204).json({ message: "Deleted user successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const {
    first_name,
    last_name,
    email,
    profile_photo,
    password,
    mobile,
    roles,
    sts_id,
    landfill_id,
  } = req.body;
  const token = (req.headers.authorization as string).split(" ")[1];
  const adminId = getUserId(token);
  if (userId == adminId) {
    return res
      .status(403)
      .json({ message: "Update your info from your profile (on the header)." });
  }

  try {
    const existingUser = await db.query.UserTable.findFirst({
      where: (model) => eq(model.id, userId),
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (sts_id) {
      const sts = await db.query.StsTable.findFirst({
        where: (model) => eq(model.id, +sts_id),
      });
      if (!sts) {
        return res.status(403).json({ message: "STS does not exist" });
      }
    } else if (landfill_id) {
      const landfill = await db.query.LandfillTable.findFirst({
        where: (model) => eq(model.id, +landfill_id),
      });
      if (!landfill) {
        return res.status(403).json({ message: "Lanfill does not exist" });
      }
    }

    const updatedUser = await db.transaction(async (tx) => {
      const [user] = await db
        .update(UserTable)
        .set({
          first_name,
          last_name,
          email,
          profile_photo: profile_photo
            ? profile_photo
            : existingUser.profile_photo,
          password: password ? hashSync(password, 10) : existingUser.password,
          mobile,
          sts_id: sts_id ? +sts_id : null,
          landfill_id: landfill_id ? +landfill_id : null,
        })
        .where(eq(UserTable.id, userId))
        .returning({
          id: UserTable.id,
          first_name: UserTable.first_name,
          last_name: UserTable.last_name,
          email: UserTable.email,
          profile_photo: UserTable.profile_photo,
          mobile: UserTable.mobile,
        });

      roles.forEach(
        async (role: string) =>
          await tx
            .insert(UserRoleTable)
            .values({ user_id: userId, role: role })
            .onConflictDoNothing()
            .execute()
      );
      return user;
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
