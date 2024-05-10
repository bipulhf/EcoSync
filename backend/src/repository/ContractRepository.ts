import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ContractTable } from "../drizzle/schema";

export const getAllContracts = async () => {
  try {
    return await db.query.ContractTable.findMany({
      with: {
        contractor: true,
      },
    });
  } catch (error) {
    throw new Error("Error in getAllContracts");
  }
};

export const getContractById = async (contract_id: number) => {
  try {
    return await db.query.ContractTable.findMany({
      where: (model) => eq(model.id, contract_id),
      with: {
        contractor: true,
      },
    });
  } catch (error) {
    throw new Error("Error in getting Contract");
  }
};

export const getContractByContractorId = async (contractor_id: number) => {
  try {
    return await db.query.ContractTable.findMany({
      where: (model) => eq(model.contractor_id, contractor_id),
      with: {
        contractor: true,
      },
    });
  } catch (error) {
    throw new Error("Error in getting Contract");
  }
};

export const createContract = async ({ contractor_id, duration }: any) => {
  try {
    return await db
      .insert(ContractTable)
      .values({
        contractor_id,
        duration,
      })
      .returning();
  } catch (error) {
    throw new Error("Error in inserting contracts");
  }
};
