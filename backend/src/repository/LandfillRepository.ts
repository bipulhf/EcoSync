import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { LandfillTable } from "../drizzle/schema";

export async function getAllLandfill(tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.LandfillTable.findMany({
      with: {
        sts: true,
        manager: {
          columns: {
            id: true,
            first_name: true,
            last_name: true,
            mobile: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("Error while fetching all Landfill");
  }
}

export async function getLandfillById(landfill_id: number, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.LandfillTable.findFirst({
      where: (model: any) => eq(model.id, landfill_id),
      with: {
        sts: true,
        manager: {
          columns: {
            id: true,
            first_name: true,
            last_name: true,
            mobile: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    throw new ResourceNotFound("Landfill", landfill_id);
  }
}

export async function getLandfillByManagerId(manager_id: number, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.LandfillTable.findMany({
      where: (model: any) => eq(model.manager_id, manager_id),
      with: {
        sts: true,
        manager: {
          columns: {
            id: true,
            first_name: true,
            last_name: true,
            mobile: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    throw new ResourceNotFound("Landfill", manager_id);
  }
}

export async function createLandfill({
  city_corporation,
  start_time,
  latitude,
  longitude,
  end_time,
}: any) {
  try {
    return await db
      .insert(LandfillTable)
      .values({
        city_corporation,
        start_time,
        latitude,
        longitude,
        end_time,
      })
      .returning()
      .execute();
  } catch (error) {
    throw new Error("Error while inserting element");
  }
}

export async function getWeeklyWasteAmount(landfill_id?: number) {
  try {
    if (landfill_id)
      return await db.query.LandfillVehicleTable.findMany({
        where: (model, { gte, and, eq }) =>
          and(
            eq(model.landfill_id, landfill_id),
            gte(
              model.departure_time,
              new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
            )
          ),
      });
    else
      return await db.query.LandfillVehicleTable.findMany({
        where: (model, { gte }) =>
          gte(
            model.departure_time,
            new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
          ),
      });
  } catch (error) {
    throw new Error("Error while fetching Landfill Vehicles");
  }
}
