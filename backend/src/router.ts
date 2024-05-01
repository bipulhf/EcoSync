import { Router } from "express";
import {
  createUser,
  login,
  authenticateToken,
  resetPassword,
  resetPasswordConfirm,
  changePassword,
} from "./services/auth";
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
import { middleware } from "./middleware";
import { rolePermissions } from "./globals";
import { getAllUsers, getUser, deleteUser, updateUser } from "./services/user";

const router = Router();

router.post("/users", middleware([rolePermissions.CREATE_USER]), createUser);
router.post(
  "/auth/create",
  middleware([rolePermissions.CREATE_USER]),
  createUser
);

router.post("/auth/login", login);
router.post("/authenticate", authenticateToken);
router.post("/auth/reset-password/initiate", resetPassword);
router.post("/auth/reset-password/confirm", resetPasswordConfirm);
router.post(
  "/auth/change-password",
  middleware([rolePermissions.UPDATE_PROFILE]),
  changePassword
);
router.get("/users", middleware([rolePermissions.READ_USER]), getAllUsers);
router.get("/users/:id", middleware([rolePermissions.READ_USER]), getUser);
router.delete(
  "/users/:id",
  middleware([rolePermissions.DELETE_USER]),
  deleteUser
);
router.put("/users/:id", middleware([rolePermissions.UPDATE_USER]), updateUser);
router.get(
  "/profile",
  middleware([rolePermissions.READ_PROFILE]),
  getLoggedInUser
);
router.put(
  "/profile",
  middleware([rolePermissions.UPDATE_PROFILE]),
  updateLoggedInUser
);
router.post(
  "/vehicle",
  middleware([rolePermissions.CREATE_VEHICLE]),
  addVehicle
);
router.get(
  "/vehicle",
  middleware([rolePermissions.READ_VEHICLE]),
  getAllVehicles
);
router.get(
  "/vehicle/:number",
  middleware([rolePermissions.READ_VEHICLE]),
  getVehicleByNumber
);
router.put(
  "/vehicle/:number",
  middleware([rolePermissions.UPDATE_VEHICLE]),
  updateVehicle
);
router.delete(
  "/vehicle/:number",
  middleware([rolePermissions.DELETE_VEHICLE]),
  deleteVehicleByNumber
);
router.get("/sts", middleware([rolePermissions.READ_STS]), getAllSts);
router.post("/sts", middleware([rolePermissions.CREATE_STS]), createSts);
router.get(
  "/sts/vehicle",
  middleware([rolePermissions.READ_STS]),
  vehicleInSts
);
router.post(
  "/sts/vehicle",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  vehicleStsEntry
);
router.get(
  "/sts/left",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  vehicleLeftSts
);
router.put("/sts/vehicle/:id", vehicleStsUpdate);
router.get("/sts/:id/fleet", fleetOptimization);
router.get("/sts/:id", getSts);
router.get(
  "/landfill",
  middleware([rolePermissions.READ_LANDFILL]),
  getAllLandfill
);
router.post(
  "/landfill",
  middleware([rolePermissions.CREATE_LANDFILL]),
  createLandfill
);
router.get("/landfill/vehicle", vehicleInLandfill);
router.post("/landfill/vehicle", vehicleLandfillEntry);
router.get("/landfill/weekly-waste", weeklyWasteAmount);
router.get("/landfill/left", vehicleLeftLandfill);
router.put("/landfill/vehicle/:id", vehicleLandfillUpdate);
router.get("/landfill/:id", getLandfill);
router.get("/report", getReport);
router.get("/report/:sts_vehicle_id", createReport);

export default router;
