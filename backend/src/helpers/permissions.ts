import { rolePermissions, userRole } from "../globals";

export const permissions = [
  {
    permission: rolePermissions.CREATE_USER,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.DELETE_USER,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.UPDATE_USER_ALL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.READ_USER_ALL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.CREATE_STS,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.UPDATE_STS,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.DELETE_STS,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.READ_STS_ALL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.CREATE_LANDFILL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.UPDATE_LANDFILL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.DELETE_LANDFILL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.READ_LANDFILL_ALL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.CREATE_VEHICLE,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.UPDATE_VEHICLE,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.DELETE_VEHICLE,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.READ_VEHICLE_ALL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.READ_REPORT,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.CREATE_REPORT,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.CREATE_ROLES,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.READ_ROLES,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.UPDATE_ROLES,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.UPDATE_PERMISSIONS,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.READ_CONTRACTOR_ALL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.READ_CONTRACT_ALL,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.CREATE_CONTRACT,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.CREATE_CONTRACTOR,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.CREATE_CONTRACTOR_MANAGER,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.DELETE_CONTRACTOR,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.UPDATE_CONTRACT,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.UPDATE_CONTRACTOR,
    role_name: userRole.ADMIN,
  },
  {
    permission: rolePermissions.READ_USER_SELF,
    role_name: userRole.STS_MANAGER,
  },
  {
    permission: rolePermissions.UPDATE_USER_SELF,
    role_name: userRole.STS_MANAGER,
  },
  {
    permission: rolePermissions.STS_VEHICLE_UPDATE,
    role_name: userRole.STS_MANAGER,
  },
  {
    permission: rolePermissions.READ_VEHICLE_SELF,
    role_name: userRole.STS_MANAGER,
  },
  {
    permission: rolePermissions.READ_STS_SELF,
    role_name: userRole.STS_MANAGER,
  },
  {
    permission: rolePermissions.READ_USER_SELF,
    role_name: userRole.LANDFILL_MANAGER,
  },
  {
    permission: rolePermissions.UPDATE_USER_SELF,
    role_name: userRole.LANDFILL_MANAGER,
  },
  {
    permission: rolePermissions.LANDFILL_VEHICLE_UPDATE,
    role_name: userRole.LANDFILL_MANAGER,
  },
  {
    permission: rolePermissions.READ_STS_SELF,
    role_name: userRole.LANDFILL_MANAGER,
  },
  {
    permission: rolePermissions.READ_LANDFILL_SELF,
    role_name: userRole.LANDFILL_MANAGER,
  },
  {
    permission: rolePermissions.READ_CONTRACTOR_MONITOR,
    role_name: userRole.STS_MANAGER,
  },
  {
    permission: rolePermissions.READ_WORKFORCE_MONITOR,
    role_name: userRole.CONTRACTOR_MANAGER,
  },
  {
    permission: rolePermissions.READ_CONTRACTOR_SELF,
    role_name: userRole.CONTRACTOR_MANAGER,
  },
  {
    permission: rolePermissions.READ_CONTRACT_SELF,
    role_name: userRole.CONTRACTOR_MANAGER,
  },
  {
    permission: rolePermissions.CREATE_WORKFORCE,
    role_name: userRole.CONTRACTOR_MANAGER,
  },
  {
    permission: rolePermissions.READ_WORKFORCE_SELF,
    role_name: userRole.CONTRACTOR_MANAGER,
  },
];
