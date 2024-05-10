import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import getErrorType from "../error";
import {
  createWorkforceWasteInContractorService,
  getAllWorkforceMonitorService,
  getWorkforceMonitorByWorkforceIdService,
  getWorkforceMonitorTodayService,
  updateWorkforceWasteInContractorService,
} from "../services/WorkforceMonitoringService";

const workforceMonitoringRouter = Router();

workforceMonitoringRouter.get(
  "/workforce-monitor",
  middleware([rolePermissions.READ_WORKFORCE_MONITOR]),
  async (req, res) => {
    try {
      const contractors = await getAllWorkforceMonitorService();
      return res.status(200).json(contractors);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

workforceMonitoringRouter.get(
  "/workforce-monitor/today",
  middleware([rolePermissions.READ_WORKFORCE_MONITOR]),
  async (req, res) => {
    try {
      const contractors = await getWorkforceMonitorTodayService();
      return res.status(200).json(contractors);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

workforceMonitoringRouter.post(
  "/workforce-monitor",
  middleware([rolePermissions.READ_WORKFORCE_MONITOR]),
  async (req, res) => {
    let { leave_today, workforce_id } = req.body;
    try {
      const contractor_id = res.locals.contractor_id;
      leave_today = leave_today === "true";
      const data = await createWorkforceWasteInContractorService({
        leave_today,
        workforce_id,
        contractor_id,
      });
      return res.status(201).json(data);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

workforceMonitoringRouter.put(
  "/workforce-monitor",
  middleware([rolePermissions.READ_WORKFORCE_MONITOR]),
  async (req, res) => {
    const { workforce_id } = req.body;
    try {
      const data = await updateWorkforceWasteInContractorService({
        workforce_id,
      });
      return res.status(200).json(data);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

workforceMonitoringRouter.get(
  "/workforce-monitor/:workforce_id",
  middleware([rolePermissions.READ_WORKFORCE_MONITOR]),
  async (req, res) => {
    try {
      const workforce_id = +req.params.workforce_id;
      const contractors = await getWorkforceMonitorByWorkforceIdService(
        workforce_id
      );
      return res.status(200).json(contractors);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

export default workforceMonitoringRouter;
