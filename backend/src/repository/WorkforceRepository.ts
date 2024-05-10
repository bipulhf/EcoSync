import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ContractorWorkforceTable, WorkforceTable } from "../drizzle/schema";

export const getAllWorkforce = async () => {
  try {
    return await db.query.WorkforceTable.findMany({
      with: {
        contractor: true,
        sts: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getAllWorkforceById = async (workforce_id: number) => {
  try {
    return await db.query.WorkforceTable.findMany({
      where: (model) => eq(model.id, workforce_id),
      with: {
        contractor: true,
        sts: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getAllWorkforceByContractorId = async (workforce_id: number) => {
  try {
    return await db.query.ContractorWorkforceTable.findMany({
      where: (model) => eq(model.workforce_id, workforce_id),
      with: {
        contractor: true,
        workforce: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const createWorkforce = async ({
  full_name,
  dob,
  job_title,
  rate_per_hour,
  mobile,
  assigned_route_latitude,
  assigned_route_longitude,
  total_time_in_sec,
  contractor_id,
}: any) => {
  try {
    return await db.transaction(async (tx) => {
      const [workforce]: any = tx
        .insert(WorkforceTable)
        .values({
          full_name,
          dob,
          job_title,
          rate_per_hour,
          mobile,
          assigned_route_latitude,
          assigned_route_longitude,
          total_time_in_sec,
        })
        .returning();
      tx.insert(ContractorWorkforceTable).values({
        contractor_id,
        workforce_id: workforce.id,
      });
    });
  } catch (error) {
    throw error;
  }
};
