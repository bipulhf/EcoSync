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
import { getLoggedInUser, updateLoggedInUser } from "./services/profile";
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
  middleware([rolePermissions.UPDATE_USER_SELF]),
  changePassword
);
router.get("/users", middleware([rolePermissions.READ_USER_ALL]), getAllUsers);
router.get("/users/:id", middleware([rolePermissions.READ_USER_ALL]), getUser);
router.delete(
  "/users/:id",
  middleware([rolePermissions.DELETE_USER]),
  deleteUser
);
router.put(
  "/users/:id",
  middleware([rolePermissions.UPDATE_USER_ALL]),
  updateUser
);
router.get(
  "/profile",
  middleware([rolePermissions.READ_USER_SELF]),
  getLoggedInUser
);
router.put(
  "/profile",
  middleware([rolePermissions.UPDATE_USER_SELF]),
  updateLoggedInUser
);
router.post(
  "/vehicle",
  middleware([rolePermissions.CREATE_VEHICLE]),
  addVehicle
);
router.get(
  "/vehicle",
  middleware([rolePermissions.READ_VEHICLE_ALL]),
  getAllVehicles
);
router.get(
  "/vehicle/:number",
  middleware([rolePermissions.READ_VEHICLE_SELF]),
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
router.get("/sts", middleware([rolePermissions.READ_STS_ALL]), getAllSts);
router.post("/sts", middleware([rolePermissions.CREATE_STS]), createSts);
router.get(
  "/sts/vehicle",
  middleware([rolePermissions.READ_VEHICLE_SELF]),
  vehicleInSts
);
router.post(
  "/sts/vehicle",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  vehicleStsEntry
);
router.get(
  "/sts/left",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  vehicleLeftSts
);
router.put(
  "/sts/vehicle/:id",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  vehicleStsUpdate
);
router.get(
  "/sts/:id/fleet",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_STS_SELF,
  ]),
  fleetOptimization
);
router.get(
  "/sts/:id",
  middleware([rolePermissions.READ_STS_ALL, rolePermissions.READ_STS_SELF]),
  getSts
);
router.get(
  "/landfill",
  middleware([rolePermissions.READ_LANDFILL_ALL]),
  getAllLandfill
);
router.post(
  "/landfill",
  middleware([rolePermissions.CREATE_LANDFILL]),
  createLandfill
);
router.get(
  "/landfill/vehicle",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  vehicleInLandfill
);
router.post(
  "/landfill/vehicle",
  middleware([rolePermissions.LANDFILL_VEHICLE_UPDATE]),
  vehicleLandfillEntry
);
router.get(
  "/landfill/weekly-waste",
  middleware([rolePermissions.READ_LANDFILL_SELF]),
  weeklyWasteAmount
);
router.get(
  "/landfill/left",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  vehicleLeftLandfill
);
router.put(
  "/landfill/vehicle/:id",
  middleware([rolePermissions.LANDFILL_VEHICLE_UPDATE]),
  vehicleLandfillUpdate
);
router.get(
  "/landfill/:id",
  middleware([
    rolePermissions.READ_LANDFILL_SELF,
    rolePermissions.READ_LANDFILL_ALL,
  ]),
  getLandfill
);
router.get("/report", middleware([rolePermissions.READ_REPORT]), getReport);
router.get(
  "/report/:sts_vehicle_id",
  middleware([rolePermissions.CREATE_REPORT]),
  createReport
);

export default router;
