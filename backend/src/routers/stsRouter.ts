import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  getAllSts,
  createSts,
  vehicleInSts,
  vehicleStsEntry,
  vehicleLeftSts,
  vehicleStsUpdate,
  fleetOptimization,
  getSts,
} from "../services/sts";

const stsRouter = Router();

stsRouter.get(
  "/sts",
  middleware([rolePermissions.READ_STS_ALL, rolePermissions.READ_STS_SELF]),
  getAllSts
);
stsRouter.post("/sts", middleware([rolePermissions.CREATE_STS]), createSts);
stsRouter.get(
  "/sts/vehicle",
  middleware([rolePermissions.READ_VEHICLE_SELF]),
  vehicleInSts
);
stsRouter.post(
  "/sts/vehicle",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  vehicleStsEntry
);
stsRouter.get(
  "/sts/left",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  vehicleLeftSts
);
stsRouter.put(
  "/sts/vehicle/:id",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  vehicleStsUpdate
);
stsRouter.get(
  "/sts/:id/fleet",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_STS_SELF,
  ]),
  fleetOptimization
);
stsRouter.get(
  "/sts/:id",
  middleware([rolePermissions.READ_STS_ALL, rolePermissions.READ_STS_SELF]),
  getSts
);

export default stsRouter;
