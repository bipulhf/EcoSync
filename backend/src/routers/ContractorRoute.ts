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

export const contractorRoute = Router();

contractorRoute.get(
  "/contractor",
  middleware([rolePermissions.READ_CONTRACTOR_ALL]),
  async (req, res) => {
    try {
      const contractors = await getAllContractorsService();
      return res.status(200).json(contractors);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

contractorRoute.post(
  "/contractor",
  middleware([rolePermissions.CREATE_CONTRACTOR]),
  async (req, res) => {
    const {
      company_name,
      tin,
      mobile,
      payment_per_ton_waste,
      required_amount_waste,
      area_collection,
      sts_id,
    } = req.body;
    try {
      await createContractorService({
        company_name,
        tin,
        mobile,
        payment_per_ton_waste,
        required_amount_waste,
        area_collection,
        sts_id,
      });
      return res
        .status(200)
        .json({ message: "Contractor created successfully" });
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

contractorRoute.get(
  "/contractor/:contractor_id",
  middleware([
    rolePermissions.READ_CONTRACTOR_ALL,
    rolePermissions.READ_CONTRACTOR_SELF,
  ]),
  async (req, res) => {
    try {
      const contractor_id = +req.params.contractor_id;
      const contractor = await getContractorService(contractor_id);
      return res.status(200).json(contractor);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

contractorRoute.delete(
  "/contractor/:contractor_id",
  middleware([rolePermissions.DELETE_CONTRACTOR]),
  async (req, res) => {
    try {
      const contractor_id = +req.params.contractor_id;
      const contractor = await deleteContractorService(contractor_id);
      return res.status(200).json(contractor);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
