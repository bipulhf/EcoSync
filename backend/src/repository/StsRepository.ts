import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ResourceNotFound } from "../errors/ResourceNotFound";

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
