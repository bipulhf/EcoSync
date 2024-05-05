import { generatePdf } from "../helpers/generatePdf";
import path from "path";
import fs from "fs";
import {
  getReportByStsId,
  getReportByVehicleNumber,
  getReports,
  getStsVehicleById,
} from "../repository/ReportRepository";
import { InvalidAccess } from "../errors/InvalidAccess";

export const getReportService = async (
  search: string,
  type: string,
  pageNo: number
) => {
  if (search && type) {
    try {
      if (!pageNo) throw new Error("Bad Request");

      let report: any;
      if (type == "sts_id") {
        report = await getReportByStsId(parseInt(search), pageNo);
      } else if (type == "vehicle_number") {
        report = await getReportByVehicleNumber(search, pageNo);
      } else if (type == "date") {
        search.replace("%ff", "-");
        console.log(type);
      }
      const query = {
        pageNo,
        isFirst: pageNo === 1,
        isLast: report.vehicleCount - pageNo * 10 <= 0,
        total: report.vehicleCount,
        data: report.vehicles,
      };

      return query;
    } catch (error) {
      throw error;
    }
  } else {
    try {
      const report: any = await getReports(pageNo);
      const query = {
        pageNo,
        isFirst: pageNo === 1,
        isLast: report.vehicleCount - pageNo * 10 <= 0,
        total: report.vehicleCount,
        data: report.vehicles,
      };
      return query;
    } catch (error) {
      throw error;
    }
  }
};

export const createReportService = async (sts_vehicle_id: number) => {
  try {
    const sts_vehicle = await getStsVehicleById(sts_vehicle_id);

    if (!sts_vehicle) throw new Error("Invalid vehicle");
    else if (
      !sts_vehicle.landfill_vehicle ||
      !sts_vehicle.landfill_vehicle.departure_time
    )
      throw new InvalidAccess("Vehicle is still in Landfill");

    const stream = fs.createWriteStream(
      `public/pdf/report_${sts_vehicle.vehicle_number}_${new Date(
        sts_vehicle.landfill_vehicle.departure_time
      ).toLocaleTimeString()}.pdf`
    );

    generatePdf({ sts_vehicle }, stream);

    stream.on("finish", () => {
      return path.join(
        __dirname,
        "..",
        "public",
        "pdf",
        `report_${
          sts_vehicle.vehicle_number
        }_${sts_vehicle.landfill_vehicle.departure_time?.toLocaleTimeString()}.pdf`
      );
    });
  } catch (error) {
    throw error;
  }
};
