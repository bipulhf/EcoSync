import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  login,
  authenticateToken,
  resetPassword,
  resetPasswordConfirm,
  changePassword,
} from "../services/auth";

const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post("/authenticate", authenticateToken);
authRouter.post("/auth/reset-password/initiate", resetPassword);
authRouter.post("/auth/reset-password/confirm", resetPasswordConfirm);
authRouter.post(
  "/auth/change-password",
  middleware([rolePermissions.UPDATE_USER_SELF]),
  changePassword
);

export default authRouter;
