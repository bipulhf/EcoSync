import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import { getReport, createReport } from "../report";

const reportRouter = Router();

reportRouter.get(
  "/report",
  middleware([rolePermissions.READ_REPORT]),
  getReport
);
reportRouter.get(
  "/report/:sts_vehicle_id",
  middleware([rolePermissions.CREATE_REPORT]),
  createReport
);
export default reportRouter;
