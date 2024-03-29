import PDFDocument from "pdfkit";
import fs, { WriteStream } from "fs";
import { getTimeFromDate } from "./date";

export const generatePdf = ({ sts_vehicle }: any, stream: WriteStream) => {
  const doc = new PDFDocument({ size: "A4" });
  doc.pipe(stream);
  doc.image("public/Logo.png", 200, 30, {
    fit: [200, 200],
    align: "center",
  });
  doc.font("Times-Roman").fontSize(36).text("Vehicle Record", 185, 130);
  doc
    .font("Helvetica")
    .fontSize(20)
    .text(`Driver Name: ${sts_vehicle.vehicle.driver_name}`, 50, 190);
  doc
    .font("Helvetica")
    .fontSize(20)
    .text(`Driver Mobile: ${sts_vehicle.vehicle.driver_mobile}`, 50, 230);
  doc
    .font("Helvetica")
    .fontSize(18)
    .text(`STS ID: ${sts_vehicle.sts_id}`, 50, 270);
  doc
    .font("Helvetica")
    .fontSize(20)
    .text(
      `STS Arrival Time: ${getTimeFromDate(
        new Date(sts_vehicle.arrival_time)
      )}`,
      50,
      310
    );
  doc
    .font("Helvetica")
    .fontSize(20)
    .text(
      `STS Departure Time: ${getTimeFromDate(
        new Date(sts_vehicle.departure_time)
      )}`,
      50,
      350
    );
  doc
    .font("Helvetica")
    .fontSize(18)
    .text(`Landfill ID: ${sts_vehicle.sts.landfill_id}`, 50, 390);
  doc
    .font("Helvetica")
    .fontSize(20)
    .text(
      `Landfill Arrival Time: ${getTimeFromDate(
        new Date(sts_vehicle.Landfill_Vehicle.arrival_time)
      )}`,
      50,
      430
    );
  doc
    .font("Helvetica")
    .fontSize(20)
    .text(
      `Landfill Departure Time: ${getTimeFromDate(
        new Date(sts_vehicle.Landfill_Vehicle.departure_time)
      )}`,
      50,
      470
    );
  doc
    .font("Helvetica")
    .fontSize(18)
    .text(
      `Distance (Approx.): ${(sts_vehicle.sts.distance_meter / 1000).toFixed(
        2
      )} km`,
      50,
      510
    );
  doc
    .font("Times-Roman")
    .fontSize(28)
    .text(
      `Oil Cost: ${(
        (sts_vehicle.vehicle.cost_per_km_unload +
          (sts_vehicle.waste_volume / sts_vehicle.vehicle.capacity) *
            (sts_vehicle.vehicle.cost_per_km_load -
              sts_vehicle.vehicle.cost_per_km_unload)) *
        (sts_vehicle.sts.distance_meter / 1000)
      ).toFixed(2)} ltr`,
      50,
      570,
      {
        align: "center",
      }
    );
  doc.end();
};
