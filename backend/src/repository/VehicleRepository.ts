import { and, eq, gte, isNull, or } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import {
  LandfillVehicleTable,
  StsTable,
  StsVehicleTable,
  VehicleTable,
} from "../drizzle/schema";

export async function inserVehicle(
  {
    sts_id,
    vehicle_number,
    type,
    capacity,
    driver_name,
    driver_mobile,
    cost_per_km_loaded,
    cost_per_km_unloaded,
  }: any,
  tx?: any
) {
  try {
    const dbCon = tx || db;
    return await dbCon
      .insert(VehicleTable)
      .values({
        sts_id,
        vehicle_number,
        type,
        capacity,
        driver_name,
        driver_mobile,
        cost_per_km_loaded,
        cost_per_km_unloaded,
      })
      .returning();
  } catch (error) {
    throw new Error("Error while inserting vehicle");
  }
}

export async function getAllVehicles() {
  try {
    return await db.query.VehicleTable.findMany();
  } catch (error) {
    throw new Error("Error while fetching vehicles");
  }
}

export async function getVehicleByNumber(vehicle_number: string, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.VehicleTable.findFirst({
      where: (model: any) => eq(model.vehicle_number, vehicle_number),
    });
  } catch (error) {
    throw new ResourceNotFound("Vehicle", vehicle_number);
  }
}

export async function getVehicleByStsId(sts_id: number, tx?: any) {
  const dbCon = tx || db;
  try {
    return await dbCon.query.VehicleTable.findMany({
      where: (model: any) => eq(model.sts_id, sts_id),
    });
  } catch (error) {
    throw new ResourceNotFound("STS", sts_id);
  }
}

export async function deleteVehicleByNumber(vehicle_number: string, tx?: any) {
  const dbCon = tx || db;
  try {
    return await dbCon
      .delete(VehicleTable)
      .where(eq(VehicleTable.vehicle_number, vehicle_number))
      .execute();
  } catch (error) {
    throw new ResourceNotFound("Vehicle", vehicle_number);
  }
}

export async function updateVehicle(
  oldVehicleNumber: string,
  {
    type,
    capacity,
    driver_name,
    driver_mobile,
    cost_per_km_loaded,
    cost_per_km_unloaded,
  }: any,
  tx?: any
) {
  const dbCon = tx || db;
  try {
    return await dbCon
      .update(VehicleTable)
      .set({
        type,
        capacity,
        driver_name,
        driver_mobile,
        cost_per_km_loaded,
        cost_per_km_unloaded,
      })
      .where(eq(VehicleTable.vehicle_number, oldVehicleNumber))
      .returning();
  } catch (error) {
    throw new Error("Error while updating vehicle");
  }
}

export async function vehiclesInSts(sts_id: number, tx?: any) {
  const dbCon = tx || db;
  try {
    return await dbCon.query.StsVehicleTable.findMany({
      where: (model: any, { and, isNotNull }: any) =>
        and(eq(model.sts_id, sts_id), isNotNull(model.departure_time)),
      with: {
        vehicle: true,
      },
    });
  } catch (error) {
    throw new ResourceNotFound("STS", sts_id);
  }
}

export async function vehicleEntryInSts(
  sts_id: number,
  vehicle_number: string,
  waste_volume: number
) {
  try {
    return await db.transaction(async (tx) => {
      const sts = await tx.query.StsTable.findFirst({
        where: (model) => eq(model.id, sts_id),
      });
      const landfill_id = sts!.landfill_id;
      const [landfill_vehicle] = await tx
        .insert(LandfillVehicleTable)
        .values({
          vehicle_number,
          waste_volume,
          landfill_id,
        })
        .returning();
      const landfill_vehicle_id = landfill_vehicle.id;
      const [sts_vehicle] = await tx
        .insert(StsVehicleTable)
        .values({
          sts_id,
          vehicle_number,
          waste_volume,
          landfill_id,
          landfill_vehicle_id,
        })
        .returning();
      return { sts_vehicle };
    });
  } catch (error) {
    throw new ResourceNotFound("Vehicle", vehicle_number);
  }
}

export async function vehicleLeavingSts(sts_vehicle_id: number) {
  try {
    return db.transaction(async (tx) => {
      const [sts_vehicle] = await tx
        .update(StsVehicleTable)
        .set({
          departure_time: new Date(),
        })
        .where(eq(StsVehicleTable.id, sts_vehicle_id))
        .returning()
        .execute();
      await tx
        .update(LandfillVehicleTable)
        .set({
          left_sts: true,
        })
        .where(eq(LandfillVehicleTable.id, sts_vehicle.landfill_vehicle_id));
      return sts_vehicle;
    });
  } catch (error) {
    throw new ResourceNotFound("STS Vehicle", sts_vehicle_id);
  }
}

export async function didVehicleReachSts(vehicle_number: string, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.StsVehicleTable.findFirst({
      where: (model: any, { and, isNull }: any) =>
        and(
          eq(model.vehicle_number, vehicle_number),
          isNull(model.departure_time)
        ),
    });
  } catch (error) {
    throw new Error("Vehicle already in STS");
  }
}

export async function didVehicleLeftSts(vehicle_number: string, tx?: any) {
  const dbCon = tx || db;
  try {
    return await dbCon.query.LandfillVehicleTable.findMany({
      where: (model: any, { and, isNotNull }: any) =>
        and(
          eq(model.vehicle_number, vehicle_number),
          isNotNull(model.arrival_time)
        ),
    });
  } catch (error) {
    throw new ResourceNotFound("Vehicle", vehicle_number);
  }
}

export async function vehicleEntryInLandfill(
  vehicle_number: string,
  waste_volume: number
) {
  try {
  } catch (error) {
    throw new ResourceNotFound("Vehicle", vehicle_number);
  }
}

export async function getFleetList(sts_id: number) {
  try {
    return await db.transaction(async (tx) => {
      const sts_vehicle = await tx.query.VehicleTable.findMany({
        where: (model) => eq(model.sts_id, sts_id),
        orderBy: (model, { asc, desc }) => [
          asc(model.cost_per_km_loaded),
          desc(model.capacity),
        ],
      });
      const vehicle_trip = await tx
        .select()
        .from(LandfillVehicleTable)
        .leftJoin(
          StsTable,
          eq(LandfillVehicleTable.landfill_id, StsTable.landfill_id)
        )
        .where(
          and(
            eq(StsTable.id, sts_id),
            or(
              isNull(LandfillVehicleTable.arrival_time),
              gte(LandfillVehicleTable.departure_time, new Date())
            )
          )
        );
      return { sts_vehicle, vehicle_trip };
    });
  } catch (error) {
    throw new ResourceNotFound("STS", sts_id);
  }
}

export async function vehiclesThatLeftSts(landfill_id?: number) {
  try {
    if (!landfill_id) {
      return await db.query.LandfillVehicleTable.findMany({
        where: (model) => eq(model.left_sts, true),
      });
    } else {
      return await db.query.LandfillVehicleTable.findMany({
        where: (model, { and }) =>
          and(eq(model.left_sts, true), eq(model.landfill_id, landfill_id)),
      });
    }
  } catch (error) {
    throw new Error("Server error");
  }
}
