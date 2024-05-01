import { rolePermissions, userRole } from "../globals";

export const permissions = [
  {
    permission: rolePermissions.CREATE_USER,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.DELETE_USER,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.UPDATE_USER,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.READ_USER,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.CREATE_STS,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.UPDATE_STS,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.DELETE_STS,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.READ_STS,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.CREATE_LANDFILL,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.UPDATE_LANDFILL,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.DELETE_LANDFILL,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.READ_LANDFILL,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.CREATE_VEHICLE,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.UPDATE_VEHICLE,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.DELETE_VEHICLE,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.READ_VEHICLE,
    role_name: userRole.admin,
  },
  {
    permission: rolePermissions.READ_PROFILE,
    role_name: userRole.sts_manager,
  },
  {
    permission: rolePermissions.UPDATE_PROFILE,
    role_name: userRole.sts_manager,
  },
  {
    permission: rolePermissions.STS_VEHICLE_UPDATE,
    role_name: userRole.sts_manager,
  },
  {
    permission: rolePermissions.READ_VEHICLE,
    role_name: userRole.sts_manager,
  },
  {
    permission: rolePermissions.READ_PROFILE,
    role_name: userRole.landfill_manager,
  },
  {
    permission: rolePermissions.UPDATE_PROFILE,
    role_name: userRole.landfill_manager,
  },
  {
    permission: rolePermissions.LANDFILL_VEHICLE_UPDATE,
    role_name: userRole.landfill_manager,
  },
  {
    permission: rolePermissions.READ_STS,
    role_name: userRole.landfill_manager,
  },
];
