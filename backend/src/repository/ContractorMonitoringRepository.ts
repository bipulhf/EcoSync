import { desc, gte } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ContractorMonitoringTable } from "../drizzle/schema";

export const getAllContractorMonitor = async () => {
  try {
    return await db.query.ContractorMonitoringTable.findMany({
      with: {
        contractor: true,
        sts: true,
      },
      orderBy: (model) => desc(model.collection_time),
    });
  } catch (error) {
    throw new Error("Error in getAllContractorMonitor");
  }
};

export const getContractorMonitorToday = async () => {
  try {
    return await db.query.ContractorMonitoringTable.findMany({
      with: {
        contractor: true,
        sts: true,
      },
      where: (model) =>
        gte(model.collection_time, new Date(new Date().getDate() - 1)),
      orderBy: (model) => desc(model.collection_time),
    });
  } catch (error) {
    throw new Error("Error in getting ContractorMonitorToday");
  }
};

export const createContractorWasteInLandfill = async ({
  waste_amount,
  type_of_waste,
  vehicle_type,
  sts_id,
  contractor_id,
}: any) => {
  try {
    return await db
      .insert(ContractorMonitoringTable)
      .values({
        waste_amount,
        type_of_waste,
        vehicle_type,
        sts_id,
        contractor_id,
      })
      .execute();
  } catch (error) {
    throw new Error("Error in getAllContractorMonitor");
  }
};
