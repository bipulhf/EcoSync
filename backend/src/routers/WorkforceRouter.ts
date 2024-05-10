import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import getErrorType from "../error";
import {
  createContractorService,
  deleteContractorService,
  getAllContractorsService,
  getContractorService,
} from "../services/ContractorService";
import {
  createWorkforceService,
  getAllWorkforceService,
  getWorkforceByContractorIdService,
} from "../services/WorkforceService";

export const workforceRouter = Router();

workforceRouter.get(
  "/workforce",
  middleware([rolePermissions.READ_WORKFORCE_ALL]),
  async (req, res) => {
    try {
      const contractors = await getAllWorkforceService();
      return res.status(200).json(contractors);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

workforceRouter.post(
  "/contractor",
  middleware([rolePermissions.CREATE_WORKFORCE]),
  async (req, res) => {
    const {
      full_name,
      dob,
      job_title,
      rate_per_hour,
      mobile,
      assigned_route_latitude,
      assigned_route_longitude,
      total_time_in_sec,
    } = req.body;
    try {
      await createWorkforceService({
        full_name,
        dob,
        job_title,
        rate_per_hour,
        mobile,
        assigned_route_latitude,
        assigned_route_longitude,
        total_time_in_sec,
        contractor_id: res.locals.contractor_id,
      });
      return res
        .status(200)
        .json({ message: "Workforce created successfully" });
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

workforceRouter.get(
  "/workforce/:contractor_id",
  middleware([
    rolePermissions.READ_CONTRACTOR_ALL,
    rolePermissions.READ_CONTRACTOR_SELF,
  ]),
  async (req, res) => {
    try {
      const contractor_id = +req.params.contractor_id;
      const contractor = await getWorkforceByContractorIdService(contractor_id);
      return res.status(200).json(contractor);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
