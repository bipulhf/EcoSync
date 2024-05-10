import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import getErrorType from "../error";
import {
  createContractorManagerService,
  createContractorService,
  deleteContractorService,
  getContractorService,
} from "../services/ContractorService";
import {
  createContractorWasteInLandfillService,
  getAllContractorMonitorService,
  getContractorMonitorTodayService,
} from "../services/ContractorMonitoringService";

const contractorMonitoringRouter = Router();

contractorMonitoringRouter.get(
  "/contractor-monitor",
  middleware([rolePermissions.READ_CONTRACTOR_MONITOR]),
  async (req, res) => {
    try {
      const contractors = await getAllContractorMonitorService();
      return res.status(200).json(contractors);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

contractorMonitoringRouter.get(
  "/contractor-monitor/today",
  middleware([rolePermissions.READ_CONTRACTOR_MONITOR]),
  async (req, res) => {
    try {
      const contractors = await getContractorMonitorTodayService();
      return res.status(200).json(contractors);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

contractorMonitoringRouter.post(
  "/contractor-monitor",
  middleware([rolePermissions.READ_CONTRACTOR_MONITOR]),
  async (req, res) => {
    const { waste_amount, type_of_waste, vehicle_type, sts_id, contractor_id } =
      req.body;
    try {
      await createContractorWasteInLandfillService({
        waste_amount,
        type_of_waste,
        vehicle_type,
        sts_id,
        contractor_id,
      });
      return res.status(201).json({ message: "Waste added successfully" });
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

export default contractorMonitoringRouter;
