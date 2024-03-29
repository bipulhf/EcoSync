import { Router } from "express";
import { prisma } from "./db";
import {
  createUser,
  login,
  authenticateToken,
  resetPassword,
  resetPasswordConfirm,
  changePassword,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} from "./auth";
import {
  getAllLandfill,
  getLandfill,
  createLandfill,
  vehicleLandfillEntry,
  vehicleLandfillUpdate,
  weeklyWasteAmount,
  vehicleLeftLandfill,
  vehicleInLandfill,
} from "./landfill";
import {
  createSts,
  getAllSts,
  getSts,
  vehicleInSts,
  vehicleLeftSts,
  vehicleStsEntry,
  vehicleStsUpdate,
} from "./sts";
import { addVehicle } from "./vehicle";
import { getLoggedInUser, updateLoggedInUser } from "./profile";
import { createReport, getReport } from "./report";

const router_shifat = Router();

router_shifat.post("/users", createUser);
router_shifat.post("/auth/create", createUser);

router_shifat.post("/auth/login", login);
router_shifat.post("/authenticate", authenticateToken);
router_shifat.post("/auth/reset-password/initiate", resetPassword);
router_shifat.post("/auth/reset-password/confirm", resetPasswordConfirm);
router_shifat.post("/auth/change-password", changePassword);
router_shifat.get("/users", getAllUsers);
router_shifat.get("/users/:id", getUser);
router_shifat.delete("/users/:id", deleteUser);
router_shifat.put("/users/:id", updateUser);
router_shifat.get("/profile", getLoggedInUser);
router_shifat.put("/profile", updateLoggedInUser);
router_shifat.post("/vehicle", addVehicle);
router_shifat.get("/sts", getAllSts);
router_shifat.post("/sts", createSts);
router_shifat.get("/sts/vehicle", vehicleInSts);
router_shifat.post("/sts/vehicle", vehicleStsEntry);
router_shifat.get("/sts/left", vehicleLeftSts);
router_shifat.put("/sts/vehicle/:id", vehicleStsUpdate);
router_shifat.get("/sts/:id", getSts);
router_shifat.get("/landfill", getAllLandfill);
router_shifat.post("/landfill", createLandfill);
router_shifat.get("/landfill/vehicle", vehicleInLandfill);
router_shifat.post("/landfill/vehicle", vehicleLandfillEntry);
router_shifat.get("/landfill/weekly-waste", weeklyWasteAmount);
router_shifat.get("/landfill/left", vehicleLeftLandfill);
router_shifat.put("/landfill/vehicle/:id", vehicleLandfillUpdate);
router_shifat.get("/landfill/:id", getLandfill);
router_shifat.get("/report", getReport);
router_shifat.get("/report/:sts_vehicle_id", createReport);

export default router_shifat;
