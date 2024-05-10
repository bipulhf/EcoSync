import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { StsTable } from "../drizzle/schema";
import { InvalidAccess } from "../errors/InvalidAccess";

export async function getAllSts(tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.StsTable.findMany({
      with: {
        landfill: true,
        manager: true,
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
      with: {
        landfill: true,
        vehicle: true,
        manager: {
          columns: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            mobile: true,
          },
        },
      },
    });
  } catch (error) {
    throw new ResourceNotFound("STS", sts_id);
  }
}

export async function getStsVehicleWeeklyAmount(landfill_id: number) {
  try {
    return await db.query.StsVehicleTable.findMany({
      where: (model, { and, gte }) =>
        and(
          eq(model.landfill_id, landfill_id),
          gte(
            model.departure_time,
            new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
          )
        ),
    });
  } catch (error) {
    throw new ResourceNotFound("Landfill", landfill_id);
  }
}

export async function getStsByManagerId(manager_id: number, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.transaction(async (txInner: any) => {
      const user = await txInner.query.UserTable.findFirst({
        where: (model: any) => eq(model.id, manager_id),
      });
      if (!user?.sts_id)
        throw new InvalidAccess("You don't have assigned STS.");
      const sts_id = user.sts_id;
      const sts = await txInner.query.StsTable.findMany({
        where: (model: any) => eq(model.id, sts_id),
        with: {
          landfill: true,
        },
      });
      return sts;
    });
  } catch (error) {
    throw new InvalidAccess(`STS for manager with id ${manager_id} not found`);
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
