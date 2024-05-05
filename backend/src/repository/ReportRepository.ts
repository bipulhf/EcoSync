import { db } from "../drizzle/db";
import { StsVehicleTable } from "../drizzle/schema";
import { and, count, eq, isNotNull } from "drizzle-orm";
import { ResourceNotFound } from "../errors/ResourceNotFound";

export async function getReports(pageNo: number) {
  try {
    return await db.transaction(async (tx) => {
      const [vehicleCount] = await tx
        .select({ count: count() })
        .from(StsVehicleTable);
      const [vehicles] = await tx.query.LandfillVehicleTable.findMany({
        with: {
          vehicle: true,
          sts_vehicle: {
            with: {
              sts: true,
            },
          },
        },
        limit: 10,
        offset: (pageNo - 1) * 10,
        orderBy: (model, { desc }) => [
          desc(model.departure_time),
          desc(model.arrival_time),
        ],
      });
      return { vehicleCount, vehicles };
    });
  } catch (error) {
    throw new Error("Error fetching reports");
  }
}

export async function getReportByStsId(landfill_id: number, pageNo: number) {
  try {
    return await db.transaction(async (tx) => {
      const [vehicleCount] = await tx
        .select({ count: count() })
        .from(StsVehicleTable);
      const [vehicles] = await tx.query.LandfillVehicleTable.findMany({
        where: (model) =>
          and(
            eq(model.landfill_id, landfill_id),
            isNotNull(model.departure_time)
          ),
        with: {
          vehicle: true,
          sts_vehicle: {
            with: {
              sts: true,
            },
          },
        },
        limit: 10,
        offset: (pageNo - 1) * 10,
        orderBy: (model, { desc }) => [
          desc(model.departure_time),
          desc(model.arrival_time),
        ],
      });
      return { vehicleCount, vehicles };
    });
  } catch (error) {
    throw new ResourceNotFound("STS", landfill_id);
  }
}

export async function getReportByVehicleNumber(
  vehicle_number: string,
  pageNo: number
) {
  try {
    return await db.transaction(async (tx) => {
      const [vehicleCount] = await tx
        .select({ count: count() })
        .from(StsVehicleTable);
      const [vehicles] = await tx.query.LandfillVehicleTable.findMany({
        where: (model) =>
          and(
            eq(model.vehicle_number, vehicle_number),
            isNotNull(model.departure_time)
          ),
        with: {
          vehicle: true,
          sts_vehicle: {
            with: {
              sts: true,
            },
          },
        },
        limit: 10,
        offset: (pageNo - 1) * 10,
        orderBy: (model, { desc }) => [
          desc(model.departure_time),
          desc(model.arrival_time),
        ],
      });
      return { vehicleCount, vehicles };
    });
  } catch (error) {
    throw new ResourceNotFound("STS", vehicle_number);
  }
}

export async function getStsVehicleById(sts_vehicle_id: number) {
  try {
    return await db.query.StsVehicleTable.findFirst({
      where: (model) => eq(model.id, sts_vehicle_id),
      with: {
        vehicle: true,
        sts: true,
        landfill_vehicle: true,
      },
    });
  } catch (error) {
    throw new ResourceNotFound("STS", sts_vehicle_id);
  }
}
