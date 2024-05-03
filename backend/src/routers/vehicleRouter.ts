import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  addVehicle,
  getAllVehicles,
  getVehicleByNumber,
  updateVehicle,
  deleteVehicleByNumber,
} from "../vehicle";

const vehicleRouter = Router();

vehicleRouter.post(
  "/vehicle",
  middleware([rolePermissions.CREATE_VEHICLE]),
  addVehicle
);
vehicleRouter.get(
  "/vehicle",
  middleware([rolePermissions.READ_VEHICLE_ALL]),
  getAllVehicles
);
vehicleRouter.get(
  "/vehicle/:number",
  middleware([rolePermissions.READ_VEHICLE_SELF]),
  getVehicleByNumber
);
vehicleRouter.put(
  "/vehicle/:number",
  middleware([rolePermissions.UPDATE_VEHICLE]),
  updateVehicle
);
vehicleRouter.delete(
  "/vehicle/:number",
  middleware([rolePermissions.DELETE_VEHICLE]),
  deleteVehicleByNumber
);
export default vehicleRouter;
