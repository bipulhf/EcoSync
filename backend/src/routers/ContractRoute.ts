import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import getErrorType from "../error";
import {
  createContractService,
  getAllContractService,
  getContractByContractorIdService,
} from "../services/ContractService";

const contractRouter = Router();

contractRouter.get(
  "/contract",
  middleware([rolePermissions.READ_CONTRACT_ALL]),
  async (req, res) => {
    try {
      const contractors = await getAllContractService();
      return res.status(200).json(contractors);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

contractRouter.post(
  "/contract",
  middleware([rolePermissions.CREATE_CONTRACT]),
  async (req, res) => {
    try {
      const { duration, contractor_id } = req.body;
      await createContractService({ duration, contractor_id });
      return res.status(201).json({ message: "Contract created successfully" });
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

contractRouter.get(
  "/contract/:contractor_id",
  middleware([
    rolePermissions.READ_CONTRACT_ALL,
    rolePermissions.READ_CONTRACT_SELF,
  ]),
  async (req, res) => {
    try {
      const contractor_id = +req.params.contractor_id;
      const contract = await getContractByContractorIdService(contractor_id);
      return res.status(200).json(contract);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

export default contractRouter;
