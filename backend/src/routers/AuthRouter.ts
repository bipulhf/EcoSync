import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  getToken,
  authenticateToken,
  resetPassword,
  resetPasswordConfirm,
  changePassword,
} from "../services/auth";
import { InvalidAccess } from "../errors/InvalidAccess";
import { InvalidType } from "../errors/InvalidType";
import { InvalidCredentials } from "../errors/InvalideCredentials";
import { ResourceNotFound } from "../errors/ResourceNotFound";

const authRouter = Router();

authRouter.post("/auth/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const token = await getToken({ email, password });
    return res.status(200).json({ token });
  } catch (error) {
    if (
      error instanceof InvalidAccess ||
      error instanceof ResourceNotFound ||
      error instanceof InvalidType ||
      error instanceof InvalidCredentials
    ) {
      return res.status(error.errorCode).json({ message: error.message });
    } else return res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/authenticate", authenticateToken);
authRouter.post("/auth/reset-password/initiate", resetPassword);
authRouter.post("/auth/reset-password/confirm", resetPasswordConfirm);
authRouter.post(
  "/auth/change-password",
  middleware([rolePermissions.UPDATE_USER_SELF]),
  changePassword
);

export default authRouter;
