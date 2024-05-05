import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { VehicleTable } from "../drizzle/schema";

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
