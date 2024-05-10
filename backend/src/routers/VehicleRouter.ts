import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  addVehicleService,
  getAllVehiclesService,
  getVehicleByNumberService,
  updateVehicleService,
  deleteVehicleByNumberService,
  getVehiclesTotalWasteAmountService,
} from "../services/VehicleService";
import getErrorType from "../error";

const vehicleRouter = Router();

vehicleRouter.post(
  "/vehicle",
  middleware([rolePermissions.CREATE_VEHICLE]),
  async (req, res) => {
    try {
      let {
        sts_id,
        vehicle_number,
        type,
        capacity,
        driver_name,
        driver_mobile,
        cost_per_km_loaded,
        cost_per_km_unloaded,
      } = req.body;
      const vehicle = addVehicleService({
        sts_id,
        vehicle_number,
        type,
        capacity,
        driver_name,
        driver_mobile,
        cost_per_km_loaded,
        cost_per_km_unloaded,
      });
      return res.status(201).json(vehicle);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
vehicleRouter.get(
  "/vehicle",
  middleware([
    rolePermissions.READ_VEHICLE_ALL,
    rolePermissions.READ_VEHICLE_SELF,
  ]),
  async (req, res) => {
    try {
      const vehicles = await getAllVehiclesService(res.locals.userId);
      return res.status(200).json(vehicles);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

vehicleRouter.get(
  "/vehicle/transported-waste",
  middleware([
    rolePermissions.READ_VEHICLE_ALL,
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_LANDFILL_SELF,
  ]),
  async (req, res) => {
    try {
      const vehicles = await getVehiclesTotalWasteAmountService(
        res.locals.userId,
        res.locals.permissions
      );
      return res.status(200).json(vehicles);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

vehicleRouter.get(
  "/vehicle/:number",
  middleware([rolePermissions.READ_VEHICLE_SELF]),
  async (req, res) => {
    try {
      const vehicleNumber = req.params.number;
      const vehicle = await getVehicleByNumberService(vehicleNumber);
      return res.status(200).json(vehicle);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
vehicleRouter.put(
  "/vehicle/:number",
  middleware([rolePermissions.UPDATE_VEHICLE]),
  async (req, res) => {
    try {
      const oldVehicleNumber = req.params.number;
      let {
        type,
        capacity,
        driver_name,
        driver_mobile,
        cost_per_km_loaded,
        cost_per_km_unloaded,
      } = req.body;
      const updatedVehicle = updateVehicleService(oldVehicleNumber, {
        type,
        capacity,
        driver_name,
        driver_mobile,
        cost_per_km_loaded,
        cost_per_km_unloaded,
      });
      return res.status(200).json(updatedVehicle);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
vehicleRouter.delete(
  "/vehicle/:number",
  middleware([rolePermissions.DELETE_VEHICLE]),
  async (req, res) => {
    try {
      const vehicleNumber = req.params.number;
      const message = await deleteVehicleByNumberService(vehicleNumber);
      return res.status(200).json(message);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
export default vehicleRouter;
