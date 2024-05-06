import { Router } from "express";
import { rolePermissions } from "../globals";
import {
  getAllLandfillService,
  createLandfillService,
  vehiclesInLandfillService,
  vehicleEntryInLandfillService,
  weeklyWasteAmountService,
  vehiclesThatLeftLandfillService,
  vehicleLeavingLandfillService,
  getLandfillService,
} from "../services/LandfillService";
import { middleware } from "../middleware";
import getErrorType from "../error";
import { vehiclesInLandfill } from "../repository/VehicleRepository";

const landfillRouter = Router();

landfillRouter.get(
  "/landfill",
  middleware([rolePermissions.READ_LANDFILL_ALL]),
  async (req, res) => {
    try {
      const managerId = parseInt(req.query.managerId as string);
      let landfills: any;
      if (res.locals.permission == rolePermissions.READ_LANDFILL_ALL)
        landfills = getAllLandfillService();
      else landfills = getAllLandfillService(managerId);
      return res.status(200).json(landfills);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

landfillRouter.post(
  "/landfill",
  middleware([rolePermissions.CREATE_LANDFILL]),
  async (req, res) => {
    try {
      let { city_corporation, start_time, latitude, longitude, end_time } =
        req.body;
      const landfill = await createLandfillService({
        city_corporation,
        start_time,
        latitude,
        longitude,
        end_time,
      });
      return res.status(201).json(landfill);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

landfillRouter.get(
  "/landfill/vehicle",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  async (req, res) => {
    try {
      const vehicles_in_landfill = await vehiclesInLandfill(res.locals.userId);
      return res.status(201).json(vehicles_in_landfill);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

landfillRouter.post(
  "/landfill/vehicle",
  middleware([rolePermissions.LANDFILL_VEHICLE_UPDATE]),
  async (req, res) => {
    try {
      const { vehicle_number, waste_volume } = req.body;
      const landfill_vehicle = await vehicleEntryInLandfillService(
        res.locals.userId,
        vehicle_number,
        waste_volume
      );
      return res.status(201).json(landfill_vehicle);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

landfillRouter.get(
  "/landfill/weekly-waste",
  middleware([
    rolePermissions.READ_LANDFILL_SELF,
    rolePermissions.READ_LANDFILL_ALL,
  ]),
  async (req, res) => {
    try {
      const amount = await weeklyWasteAmountService(
        res.locals.userId,
        res.locals.permission
      );
      return res.status(200).json(amount);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

landfillRouter.get(
  "/landfill/left",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  async (req, res) => {
    try {
      const vehiclesLeftLandfill = await vehiclesThatLeftLandfillService(
        res.locals.userId,
        res.locals.permission
      );
      return res.status(200).json(vehiclesLeftLandfill);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

landfillRouter.put(
  "/landfill/vehicle/:landfill_vehicle_id",
  middleware([rolePermissions.LANDFILL_VEHICLE_UPDATE]),
  async (req, res) => {
    try {
      const landfill_vehicle_id = parseInt(
        req.params.landfill_vehicle_id as string
      );
      const landfill_vehicle = await getLandfillService(landfill_vehicle_id);
      return res.status(200).json(landfill_vehicle);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

landfillRouter.get(
  "/landfill/:landfill_id",
  middleware([
    rolePermissions.READ_LANDFILL_SELF,
    rolePermissions.READ_LANDFILL_ALL,
  ]),
  async (req, res) => {
    try {
      const landfill_id = parseInt(req.params.landfill_id as string);
      const landfill = await getLandfillService(landfill_id);
      return res.status(200).json(landfill);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

export default landfillRouter;
