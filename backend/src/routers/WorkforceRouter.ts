import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import getErrorType from "../error";
import {
  createWorkforceService,
  getAllWorkforceService,
  getWorkforceByContractorIdService,
} from "../services/WorkforceService";
import { getContractByContractorIdService } from "../services/ContractService";

const workforceRouter = Router();

workforceRouter.get(
  "/workforce",
  middleware([
    rolePermissions.READ_WORKFORCE_ALL,
    rolePermissions.READ_WORKFORCE_SELF,
  ]),
  async (req, res) => {
    try {
      let contractors;
      if (res.locals.contractor_id)
        contractors = await getWorkforceByContractorIdService(
          res.locals.contractor_id
        );
      else contractors = await getAllWorkforceService();
      return res.status(200).json(contractors);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

workforceRouter.post(
  "/workforce",
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
    } = req.body;
    try {
      const contract = await getContractByContractorIdService(
        res.locals.contractor_id
      );
      if (contract.length === 0) {
        return res.status(400).json({ message: "Contracts does not exist" });
      } else if (
        new Date(
          new Date(contract[0].created_at).setDate(
            new Date(contract[0].created_at).getDate() + contract[0].duration
          )
        ) < new Date()
      ) {
        return res.status(400).json({ message: "Contract has expired" });
      }

      const workforce = await createWorkforceService({
        full_name,
        dob,
        job_title,
        rate_per_hour,
        mobile,
        assigned_route_latitude,
        assigned_route_longitude,
        contractor_id: res.locals.contractor_id,
      });
      return res.status(201).json(workforce);
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

export default workforceRouter;
