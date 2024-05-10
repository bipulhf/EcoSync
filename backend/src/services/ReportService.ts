import { generatePdf } from "../helpers/generatePdf";
import path from "path";
import fs from "fs";
import { getReport, getStsVehicleById } from "../repository/ReportRepository";
import { InvalidAccess } from "../errors/InvalidAccess";
import { InvalidType } from "../errors/InvalidType";

export const getReportService = async (pageNo: number, pageSize: number) => {
  try {
    if (!pageNo) throw new InvalidType("Page Number");

    let report = await getReport(pageNo, pageSize);

    const query = {
      pageNo,
      total: report.vehicleCount.count,
      data: report.vehicles,
    };

    return query;
  } catch (error) {
    throw error;
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
    const file_path = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "pdf",
      `report_${
        sts_vehicle.vehicle_number
      }_${sts_vehicle.landfill_vehicle.departure_time?.toLocaleTimeString()}.pdf`
    );
    generatePdf({ sts_vehicle }, stream);
    return { stream, file_path };
  } catch (error) {
    throw error;
  }
};
