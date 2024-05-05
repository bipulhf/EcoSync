import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  getReportService,
  createReportService,
} from "../services/ReportService";
import getErrorType from "../error";

const reportRouter = Router();

reportRouter.get(
  "/report",
  middleware([rolePermissions.READ_REPORT]),
  async (req, res) => {
    const search = req.query.query as string;
    const type = req.query.type as string;
    const pageNo = parseInt(req.query.pageNo as string);

    try {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const query = await getReportService(search, type, pageNo);
      return res.status(200).json(query);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
reportRouter.get(
  "/report/:sts_vehicle_id",
  middleware([rolePermissions.CREATE_REPORT]),
  async (req, res) => {
    const { sts_vehicle_id } = req.params;
    try {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const file = await createReportService(parseInt(sts_vehicle_id));
      return res.status(201).download(`${file}`);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
export default reportRouter;
