import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  getToken,
  authenticateToken,
  resetPassword,
  resetPasswordConfirm,
  changePassword,
} from "../services/AuthService";
import getErrorType from "../error";

const authRouter = Router();

authRouter.post("/auth/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const token = await getToken({ email, password });
    return res.status(200).json({ token });
  } catch (error) {
    const err = getErrorType(error);
    return res.status(err.errorCode).json({ message: err.message });
  }
});

authRouter.post("/authenticate", async (req, res) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const user = await authenticateToken(token);
    return res.status(200).json(user);
  } catch (error) {
    const err = getErrorType(error);
    return res.status(err.errorCode).json({ message: err.message });
  }
});

authRouter.post("/auth/reset-password/initiate", async (req, res) => {
  try {
    const { email } = req.body;
    const message = await resetPassword(email);
    return res.status(200).json(message);
  } catch (error) {
    const err = getErrorType(error);
    return res.status(err.errorCode).json({ message: err.message });
  }
});

authRouter.post("/auth/reset-password/confirm", async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const message = await resetPasswordConfirm({ email, token, newPassword });

    return res.status(200).json(message);
  } catch (error) {
    const err = getErrorType(error);
    return res.status(err.errorCode).json({ message: err.message });
  }
});

authRouter.post(
  "/auth/change-password",
  middleware([rolePermissions.UPDATE_USER_SELF]),
  async (req, res) => {
    try {
      const token = (req.headers.authorization as string).split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
      const { oldPassword, newPassword } = req.body;
      const message = await changePassword(token, oldPassword, newPassword);
      return res.status(200).json(message);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

export default authRouter;
