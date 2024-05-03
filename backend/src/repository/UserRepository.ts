import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ResourceNotFound } from "../errors/ResourceNotFound";

export async function getAllUser() {
  return await db.query.UserTable.findMany();
}
export async function getUserById(userId: number, withPassword?: boolean) {
  try {
    if (withPassword)
      return await db.query.UserTable.findFirst({
        where: (model) => eq(model.id, userId),
      });
    return await db.query.UserTable.findFirst({
      where: (model) => eq(model.id, userId),
      columns: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        profile_photo: true,
        created_at: true,
        sts_id: true,
        landfill_id: true,
      },
    });
  } catch (error) {
    throw new ResourceNotFound("User", userId);
  }
}

export async function getUserByEmail(email: string, withPassword?: boolean) {
  try {
    if (withPassword)
      return await db.query.UserTable.findFirst({
        where: (model) => eq(model.email, email),
      });
    return await db.query.UserTable.findFirst({
      where: (model) => eq(model.email, email),
      columns: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        profile_photo: true,
        created_at: true,
        sts_id: true,
        landfill_id: true,
      },
    });
  } catch (error) {
    throw new ResourceNotFound("User", email);
  }
}

export async function getUserByEmailWithPermissions(email: string) {
  try {
    return await db.query.UserTable.findFirst({
      with: {
        roles: {
          with: {
            role: {
              with: {
                permissions: {
                  columns: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
      where: (model) => eq(model.email, email),
    });
  } catch (error) {
    throw new ResourceNotFound("User", email);
  }
}
