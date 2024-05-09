import {
  createRole,
  getRolePermissionsByRole,
  getRoles,
  getRolesPermissions,
  getUserRolesPermissionsById,
} from "../repository/RolesPermissionRepository";

export async function getRolesService() {
  try {
    return await getRoles();
  } catch (error) {
    throw error;
  }
}

export async function getRolesPermissionsService(
  user_id?: number,
  role?: string
) {
  try {
    let roles_permissions;
    let new_roles_permissions: any[] = [];
    if (user_id && user_id > 1)
      roles_permissions = await getUserRolesPermissionsById(user_id);
    else if (role) roles_permissions = await getRolePermissionsByRole(role);
    roles_permissions = await getRolesPermissions();
    roles_permissions = roles_permissions.map((role) => {
      new_roles_permissions.push({
        role: role.role,
        permissions: role.permissions.map(
          (permission) => permission.permission
        ),
      });
    });
    return new_roles_permissions;
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
