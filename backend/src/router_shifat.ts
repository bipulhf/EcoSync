import { Router } from "express";
import { prisma } from "./db";
import {
  createUser,
  login,
  authenticateToken,
  resetPassword,
  resetPasswordConfirm,
  changePassword,
} from "./auth";
import { mailOptions, mailTransporter } from "./helpers/mailTransporter";

const router_shifat = Router();

router_shifat.post("/auth/create", createUser);

router_shifat.post("/auth/login", login);
router_shifat.post("/authenticate", authenticateToken);
router_shifat.post("/auth/reset-password/initiate", resetPassword);
router_shifat.post("/auth/reset-password/confirm", resetPasswordConfirm);
router_shifat.post("/auth/change-password", changePassword);
router_shifat.get("/send-mail", async (req, res) => {
  try {
    mailOptions.to = "bipulhf@gmail.com";
    mailOptions.subject = "Test Email";
    mailOptions.html = "<p>This is a test email</p>";
    await mailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error:", error);
  }
});
export default router_shifat;
