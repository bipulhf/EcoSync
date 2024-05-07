import { Router } from "express";
import getErrorType from "../error";
import { middleware } from "../middleware";
import { rolePermissions } from "../globals";
import {
  createRoleService,
  getRolesPermissionsService,
} from "../services/RolePermissionService";
const rolePermissionRouter = Router();

rolePermissionRouter.get(
  "/roles-permissions",
  middleware([rolePermissions.READ_ROLES]),
  async (req, res) => {
    try {
      const result = await getRolesPermissionsService();
      return res.status(200).json(result);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

rolePermissionRouter.get(
  "/roles-permissions/:user_id",
  middleware([rolePermissions.READ_ROLES]),
  async (req, res) => {
    try {
      const user_id = parseInt(req.params.user_id);
      const result = await getRolesPermissionsService(user_id);
      return res.status(200).json(result);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

rolePermissionRouter.get(
  "/permissions/:role",
  middleware([rolePermissions.READ_ROLES]),
  async (req, res) => {
    try {
      const role = req.params.roles;
      const result = await getRolesPermissionsService(0, role);
      return res.status(200).json(result);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

rolePermissionRouter.post(
  "/role",
  middleware([rolePermissions.CREATE_ROLES]),
  async (req, res) => {
    try {
      let { role, permissions } = req.body;
      const result = await createRoleService(role, permissions);
      return res.status(201).json(result);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

export default rolePermissionRouter;
