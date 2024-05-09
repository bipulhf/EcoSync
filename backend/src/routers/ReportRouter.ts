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
    const pageNo = parseInt(req.query.pageNo as string);
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
      const query = await getReportService(pageNo, pageSize);
      return res.status(200).json(query);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

reportRouter.get("/report/download/:file_path", async (req, res) => {
  try {
    let file_path = req.params.file_path;
    file_path = file_path.replace(/,/g, "/");
    res.status(200).download(file_path);
  } catch (error) {
    const err = getErrorType(error);
    return res.status(err.errorCode).json({ message: err.message });
  }
});

reportRouter.post(
  "/report/:sts_vehicle_id",
  middleware([rolePermissions.CREATE_REPORT]),
  async (req, res) => {
    const sts_vehicle_id = parseInt(req.params.sts_vehicle_id);
    try {
      let { stream, file_path } = await createReportService(sts_vehicle_id);
      file_path = file_path.replace(/\//g, ",");
      stream.on("finish", () => {
        return res.status(201).json({ file_path });
      });
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

export default reportRouter;
