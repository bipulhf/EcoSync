import {
  createRole,
  getRolePermissionsByRole,
  getRolesPermissions,
  getUserRolesPermissionsById,
} from "../repository/RolesPermissionRepository";

export async function getRolesPermissionsService(
  user_id?: number,
  role?: string
) {
  try {
    if (user_id && user_id > 1)
      return await getUserRolesPermissionsById(user_id);
    else if (role) return await getRolePermissionsByRole(role);
    return await getRolesPermissions();
  } catch (error) {
    throw error;
  }
}

export async function createRoleService(role: string, permissions: string[]) {
  try {
    await createRole(role, permissions);
    return { message: "Role created successfully" };
  } catch (error) {
    throw error;
  }
}
