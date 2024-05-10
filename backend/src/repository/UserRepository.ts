import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { UserRoleTable, UserTable } from "../drizzle/schema";

export async function getAllUsersWithRoles() {
  return await db.query.UserTable.findMany({
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
}

export async function getUserById(
  userId: number,
  withPassword?: boolean,
  tx?: any
) {
  try {
    const dbCon = tx || db;
    if (withPassword)
      return await dbCon.query.UserTable.findFirst({
        where: (model: any) => eq(model.id, userId),
      });
    return await db.query.UserTable.findFirst({
      where: (model: any) => eq(model.id, userId),
      columns: {
        password: false,
      },
      with: {
        roles: {
          columns: {
            role: true,
          },
        },
      },
    });
  } catch (error) {
    throw new ResourceNotFound("User", userId);
  }
}

export async function getUserByEmail(
  email: string,
  withPassword?: boolean,
  tx?: any
) {
  try {
    const dbCon = tx || db;
    if (withPassword)
      return await dbCon.query.UserTable.findFirst({
        where: (model: any) => eq(model.email, email),
      });
    return await dbCon.query.UserTable.findFirst({
      where: (model: any) => eq(model.email, email),
      columns: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        profile_photo: true,
        mobile: true,
        created_at: true,
        sts_id: true,
        landfill_id: true,
      },
    });
  } catch (error) {
    throw new ResourceNotFound("User", email);
  }
}

export async function getUserByEmailWithPermissions(email: string, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.UserTable.findFirst({
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
      where: (model: any) => eq(model.email, email),
    });
  } catch (error) {
    throw new ResourceNotFound("User", email);
  }
}

export async function getUserByIdWithRole(
  user_id: number,
  withPassword?: boolean,
  tx?: any
) {
  try {
    const dbCon = tx || db;
    if (withPassword)
      return await dbCon.query.UserTable.findFirst({
        where: (model: any) => eq(model.id, user_id),
      });
    return await dbCon.query.UserTable.findFirst({
      where: (model: any) => eq(model.id, user_id),
      columns: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        profile_photo: true,
        mobile: true,
        created_at: true,
        sts_id: true,
        landfill_id: true,
      },
      with: {
        roles: true,
      },
    });
  } catch (error) {
    throw new ResourceNotFound("User", user_id);
  }
}

export async function getUserByEmailWithToken(email: string, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.UserTable.findFirst({
      with: {
        token: true,
      },
      where: (model: any) => eq(model.email, email),
    });
  } catch (error) {
    throw new ResourceNotFound("User", email);
  }
}

export async function changeUserPassword(
  user_id: number,
  password: string,
  tx?: any
) {
  try {
    const dbCon = tx || db;
    return await dbCon
      .update(UserTable)
      .set({
        password: password,
      })
      .where(eq(UserTable.id, user_id))
      .execute();
  } catch (error) {
    throw new ResourceNotFound("User", user_id);
  }
}

export async function updateUserAndRoleById(
  {
    userId,
    first_name,
    last_name,
    email,
    profile_photo,
    mobile,
    roles,
    sts_id,
    landfill_id,
  }: any,
  tx?: any
) {
  try {
    return await db.transaction(async (tx) => {
      const [user] = await db
        .update(UserTable)
        .set({
          first_name,
          last_name,
          email,
          profile_photo,
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
  } catch (error) {
    throw new ResourceNotFound("User", userId);
  }
}

export async function updateUserById({
  userId,
  first_name,
  last_name,
  email,
  profile_photo,
  password,
  mobile,
}: any) {
  try {
    return await db
      .update(UserTable)
      .set({
        first_name,
        last_name,
        email,
        profile_photo,
        password,
        mobile,
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
  } catch (error) {
    throw new ResourceNotFound("User", userId);
  }
}

export async function createUser(
  {
    first_name,
    last_name,
    email,
    password,
    mobile,
    roles,
    sts_id,
    landfill_id,
    contractor_id,
  }: any,
  tx?: any
) {
  try {
    const dbCon = tx || db;
    return await dbCon.transaction(async (tx: any) => {
      const [user] = await tx
        .insert(UserTable)
        .values({
          first_name,
          last_name,
          email: email,
          password,
          mobile,
          sts_id: sts_id ? sts_id : null,
          landfill_id: landfill_id ? landfill_id : null,
          contractor_id: contractor_id ? contractor_id : null,
        })
        .returning();
      roles.forEach(
        async (role: string) =>
          await tx
            .insert(UserRoleTable)
            .values({ user_id: user.id, role: role })
            .execute()
      );
      return user;
    });
  } catch (error) {
    throw new ResourceNotFound("User", email);
  }
}

export async function deleteUserById(user_id: number, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon
      .delete(UserTable)
      .where(eq(UserTable.id, user_id))
      .execute();
  } catch (error) {
    throw new ResourceNotFound("User", user_id);
  }
}
