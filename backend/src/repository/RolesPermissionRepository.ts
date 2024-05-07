import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { PermissionTable, RoleTable } from "../drizzle/schema";
import { ResourceNotFound } from "../errors/ResourceNotFound";

export async function getRolesPermissions() {
  try {
    return await db.query.RoleTable.findMany({
      with: {
        permissions: {
          columns: {
            permission: true,
          },
        },
      },
    });
  } catch (e) {
    throw new Error("Error while fetching roles and permissions");
  }
}

export async function getUserRolesPermissionsById(user_id: number) {
  try {
    return await db.query.UserTable.findFirst({
      where: (model, { eq }) => eq(model.id, user_id),
      columns: {
        email: true,
      },
      with: {
        roles: {
          columns: {
            role: true,
          },
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
    });
  } catch (e) {
    throw new Error("Error while fetching roles and permissions");
  }
}

export async function getRolePermissionsByRole(role: string) {
  try {
    return await db.query.RoleTable.findFirst({
      where: (model, { eq }) => eq(model.role, role),
      with: {
        permissions: {
          columns: {
            permission: true,
          },
        },
      },
    });
  } catch (e) {
    throw new Error("Error while fetching role permissions");
  }
}

export async function createRole(role: string, permissions: string[]) {
  try {
    return await db.transaction(async (tx) => {
      await tx
        .insert(RoleTable)
        .values({
          role: role,
        })
        .returning()
        .execute();
      permissions.forEach(async (permission) => {
        await tx.insert(PermissionTable).values({
          permission,
          role_name: role,
        });
      });
      return role;
    });
  } catch (e) {
    throw new ResourceNotFound("Permission", permissions[0]);
  }
}

export async function addPermissionsToRole(
  role: string,
  permissions: string[]
) {
  try {
    return await db.transaction(async (tx) => {
      permissions.forEach(async (permission) => {
        await tx.insert(PermissionTable).values({
          permission,
          role_name: role,
        });
      });
      return role;
    });
  } catch (e) {
    throw new ResourceNotFound("Role", role);
  }
}

export async function updateRolePermissions(
  role: string,
  permissions: string[]
) {
  try {
    return await db.transaction(async (tx) => {
      await tx
        .delete(PermissionTable)
        .where(eq(PermissionTable.role_name, role))
        .execute();
      permissions.forEach(async (permission) => {
        await tx.insert(PermissionTable).values({
          permission,
          role_name: role,
        });
      });
      return role;
    });
  } catch (e) {
    throw new ResourceNotFound("Permission", permissions[0]);
  }
}
