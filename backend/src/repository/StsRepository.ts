import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { StsTable } from "../drizzle/schema";

export async function getAllSts(tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.StsTable.findMany({
      with: {
        landfill: true,
      },
    });
  } catch (error) {
    throw new Error("Error while fetching all STS");
  }
}

export async function getStsById(sts_id: number, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.StsTable.findFirst({
      where: (model: any) => eq(model.id, sts_id),
    });
  } catch (error) {
    throw new ResourceNotFound("STS", sts_id);
  }
}

export async function getStsByManagerId(manager_id: number, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.StsTable.findMany({
      where: (model: any) => eq(model.manager_id, manager_id),
    });
  } catch (error) {
    throw new ResourceNotFound("STS", manager_id);
  }
}

export async function createSts(
  {
    ward,
    capacity,
    latitude,
    longitude,
    distance_meter,
    possible_time_sec,
    landfill_id,
  }: any,
  tx?: any
) {
  try {
    const dbCon = tx || db;
    return await dbCon
      .insert(StsTable)
      .values({
        ward,
        capacity,
        latitude,
        longitude,
        distance_meter,
        possible_time_sec,
        landfill_id,
      })
      .returning();
  } catch (error) {
    throw new Error("Error while creating STS");
  }
}
