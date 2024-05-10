import { and, desc, eq, gte } from "drizzle-orm";
import { db } from "../drizzle/db";
import {
  ContractorMonitoringTable,
  WorkforceMonitoringTable,
} from "../drizzle/schema";

export const getAllWorkforceMonitor = async () => {
  try {
    return await db.query.WorkforceMonitoringTable.findMany({
      with: {
        contractor: true,
        workforce: true,
      },
      orderBy: (model) => desc(model.login),
    });
  } catch (error) {
    throw new Error("Error in getAllContractorMonitor");
  }
};

export const getWorkforceMonitorToday = async () => {
  try {
    return await db.query.WorkforceMonitoringTable.findMany({
      with: {
        contractor: true,
        workforce: true,
      },
      orderBy: (model) => desc(model.login),
      where: (model) => gte(model.login, new Date(new Date().getDate() - 1)),
    });
  } catch (error) {
    throw new Error("Error in getting ContractorMonitorToday");
  }
};

export const getWorkforceMonitorByWorkforceId = async (
  workforce_id: number
) => {
  try {
    return await db.query.WorkforceMonitoringTable.findMany({
      with: {
        contractor: true,
        workforce: true,
      },
      orderBy: (model) => desc(model.login),
      where: (model) =>
        and(
          eq(model.workforce_id, workforce_id),
          gte(model.login, new Date(new Date().getDate() - 30))
        ),
    });
  } catch (error) {
    throw new Error("Error in getting ContractorMonitorToday");
  }
};

export const createWorkforceWasteInContractor = async ({
  leave_today,
  workforce_id,
  contractor_id,
}: any) => {
  try {
    return await db
      .insert(WorkforceMonitoringTable)
      .values({
        leave_today,
        workforce_id,
        contractor_id,
      })
      .execute();
  } catch (error) {
    throw new Error("Error in getAllContractorMonitor");
  }
};

export const updateWorkforceWasteInContractor = async ({
  workforce_id,
  contractor_id,
}: any) => {
  try {
    return await db
      .update(WorkforceMonitoringTable)
      .set({
        logout: new Date(),
      })
      .where(
        and(
          and(
            eq(WorkforceMonitoringTable.contractor_id, contractor_id),
            and(
              eq(WorkforceMonitoringTable.workforce_id, workforce_id),
              eq(WorkforceMonitoringTable.leave_today, false)
            )
          ),
          gte(
            WorkforceMonitoringTable.login,
            new Date(new Date().getDate() - 1)
          )
        )
      )
      .execute();
  } catch (error) {
    throw new Error("Error in getAllContractorMonitor");
  }
};
