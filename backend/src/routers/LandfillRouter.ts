import { Router } from "express";
import { rolePermissions } from "../globals";
import {
  getAllLandfill,
  createLandfill,
  vehicleInLandfill,
  vehicleLandfillEntry,
  weeklyWasteAmount,
  vehicleLeftLandfill,
  vehicleLandfillUpdate,
  getLandfill,
} from "../landfill";
import { middleware } from "../middleware";

const landfillRouter = Router();

landfillRouter.get(
  "/landfill",
  middleware([rolePermissions.READ_LANDFILL_ALL]),
  getAllLandfill
);
landfillRouter.post(
  "/landfill",
  middleware([rolePermissions.CREATE_LANDFILL]),
  createLandfill
);
landfillRouter.get(
  "/landfill/vehicle",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  vehicleInLandfill
);
landfillRouter.post(
  "/landfill/vehicle",
  middleware([rolePermissions.LANDFILL_VEHICLE_UPDATE]),
  vehicleLandfillEntry
);
landfillRouter.get(
  "/landfill/weekly-waste",
  middleware([rolePermissions.READ_LANDFILL_SELF]),
  weeklyWasteAmount
);
landfillRouter.get(
  "/landfill/left",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  vehicleLeftLandfill
);
landfillRouter.put(
  "/landfill/vehicle/:id",
  middleware([rolePermissions.LANDFILL_VEHICLE_UPDATE]),
  vehicleLandfillUpdate
);
landfillRouter.get(
  "/landfill/:id",
  middleware([
    rolePermissions.READ_LANDFILL_SELF,
    rolePermissions.READ_LANDFILL_ALL,
  ]),
  getLandfill
);

export default landfillRouter;
