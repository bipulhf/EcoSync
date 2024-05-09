import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  getAllStsService,
  createStsService,
  vehiclesInStsService,
  vehicleEnteredInStsService,
  vehiclesThatLeftStsService,
  vehicleLeavingStsService,
  fleetOptimizationService,
  getStsService,
  stsLastWeekWasteService,
} from "../services/StsService";
import getErrorType from "../error";
import { getUserService } from "../services/UserService";

const stsRouter = Router();

stsRouter.get(
  "/sts",
  middleware([rolePermissions.READ_STS_ALL, rolePermissions.READ_STS_SELF]),
  async (req, res) => {
    try {
      const permission: string[] = [];
      res.locals.permission.forEach((element: any) => {
        permission.push(element.permission);
      });
      const sts = await getAllStsService(
        permission,
        parseInt(res.locals.userId)
      );
      return res.json(sts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
stsRouter.post(
  "/sts",
  middleware([rolePermissions.CREATE_STS]),
  async (req, res) => {
    let { ward, capacity, latitude, longitude, landfill_id } = req.body;
    try {
      const sts = await createStsService({
        ward,
        capacity,
        latitude,
        longitude,
        landfill_id,
      });
      return res.status(201).json(sts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
stsRouter.get(
  "/sts/vehicle",
  middleware([rolePermissions.READ_VEHICLE_SELF]),
  async (req, res) => {
    try {
      const sts = await vehiclesInStsService(parseInt(res.locals.userId));
      return res.status(200).json(sts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
stsRouter.post(
  "/sts/vehicle",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  async (req, res) => {
    try {
      const { vehicle_number, waste_volume } = req.body;
      const message = await vehicleEnteredInStsService(
        res.locals.userId,
        vehicle_number,
        parseFloat(waste_volume)
      );
      return res.status(201).json(message);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
stsRouter.get(
  "/sts/left",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_LANDFILL_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  async (req, res) => {
    try {
      const vehicleLeftSts = await vehiclesThatLeftStsService(
        res.locals.userId,
        res.locals.permission
      );
      return res.status(200).json(vehicleLeftSts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

stsRouter.get(
  "/sts/last-week-waste",
  middleware([rolePermissions.READ_LANDFILL_SELF]),
  async (req, res) => {
    try {
      const user = await getUserService(res.locals.userId);
      if (!user.landfill_id)
        return res
          .status(403)
          .json({ message: "You don't have any assigned Landfill" });
      const all_landfills_last_week_waste = await stsLastWeekWasteService(
        user.landfill_id
      );
      return res.status(200).json(all_landfills_last_week_waste);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

stsRouter.put(
  "/sts/vehicle/:sts_vehicle_id",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  async (req, res) => {
    try {
      const sts_vehicle_id = +req.params.sts_vehicle_id;

      const vehicle = await vehicleLeavingStsService(
        res.locals.userId,
        sts_vehicle_id
      );
      return res.status(200).json();
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

stsRouter.get(
  "/fleet",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_STS_SELF,
  ]),
  async (req, res) => {
    try {
      const fleet = await fleetOptimizationService(parseInt(res.locals.userId));
      return res.status(200).json(fleet);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

stsRouter.get(
  "/sts/:id",
  middleware([rolePermissions.READ_STS_ALL, rolePermissions.READ_STS_SELF]),
  async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const sts = await getStsService(id);
      return res.status(200).json(sts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

export default stsRouter;
