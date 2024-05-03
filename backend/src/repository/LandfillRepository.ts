import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ResourceNotFound } from "../errors/ResourceNotFound";

export async function getLandfillById(landfill_id: number, tx?: any) {
  try {
    const dbCon = tx || db;
    return await dbCon.query.LandfillTable.findFirst({
      where: (model: any) => eq(model.id, landfill_id),
    });
  } catch (error) {
    throw new ResourceNotFound("Landfill", landfill_id);
  }
}
