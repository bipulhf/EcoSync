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
  fleetOptimization,
  getAllSts,
  getSts,
  vehicleInSts,
  vehicleLeftSts,
  vehicleStsEntry,
  vehicleStsUpdate,
} from "./sts";
import {
  addVehicle,
  deleteVehicleByNumber,
  getAllVehicles,
  getVehicleByNumber,
  updateVehicle,
} from "./vehicle";
import { getLoggedInUser, updateLoggedInUser } from "./profile";
import { createReport, getReport } from "./report";

const router = Router();

router.post("/users", createUser);
router.post("/auth/create", createUser);

router.post("/auth/login", login);
router.post("/authenticate", authenticateToken);
router.post("/auth/reset-password/initiate", resetPassword);
router.post("/auth/reset-password/confirm", resetPasswordConfirm);
router.post("/auth/change-password", changePassword);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/profile", getLoggedInUser);
router.put("/profile", updateLoggedInUser);
router.post("/vehicle", addVehicle);
router.get("/vehicle", getAllVehicles);
router.get("/vehicle/:number", getVehicleByNumber);
router.put("/vehicle/:number", updateVehicle);
router.delete("/vehicle/:number", deleteVehicleByNumber);
router.get("/sts", getAllSts);
router.post("/sts", createSts);
router.get("/sts/vehicle", vehicleInSts);
router.post("/sts/vehicle", vehicleStsEntry);
router.get("/sts/left", vehicleLeftSts);
router.put("/sts/vehicle/:id", vehicleStsUpdate);
router.get("/sts/:id/fleet", fleetOptimization);
router.get("/sts/:id", getSts);
router.get("/landfill", getAllLandfill);
router.post("/landfill", createLandfill);
router.get("/landfill/vehicle", vehicleInLandfill);
router.post("/landfill/vehicle", vehicleLandfillEntry);
router.get("/landfill/weekly-waste", weeklyWasteAmount);
router.get("/landfill/left", vehicleLeftLandfill);
router.put("/landfill/vehicle/:id", vehicleLandfillUpdate);
router.get("/landfill/:id", getLandfill);
router.get("/report", getReport);
router.get("/report/:sts_vehicle_id", createReport);

export default router;
