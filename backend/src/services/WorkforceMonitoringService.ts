import { ResourceNotFound } from "../errors/ResourceNotFound";
import { getContractorById } from "../repository/ContractorRepository";
import {
  createWorkforceWasteInContractor,
  getAllWorkforceMonitor,
  getWorkforceMonitorByWorkforceId,
  getWorkforceMonitorToday,
  updateWorkforceWasteInContractor,
} from "../repository/WorkforceMonitoringRepository";

export const getAllWorkforceMonitorService = async () => {
  try {
    return await getAllWorkforceMonitor();
  } catch (error) {
    throw error;
  }
};

export const getWorkforceMonitorTodayService = async () => {
  try {
    return await getWorkforceMonitorToday();
  } catch (error) {
    throw error;
  }
};

export const getWorkforceMonitorByWorkforceIdService = async (
  workforce_id: number
) => {
  try {
    return await getWorkforceMonitorByWorkforceId(workforce_id);
  } catch (error) {
    throw error;
  }
};

export const createWorkforceWasteInContractorService = async ({
  leave_today,
  workforce_id,
  contractor_id,
}: any) => {
  try {
    const contractor = await getContractorById(contractor_id);
    if (!contractor) {
      throw new ResourceNotFound("Contractor", contractor_id);
    }
    await createWorkforceWasteInContractor({
      leave_today,
      workforce_id,
      contractor_id,
    });
    return { message: "Workforce added successfully" };
  } catch (error) {
    throw error;
  }
};

export const updateWorkforceWasteInContractorService = async ({
  leave_today,
  workforce_id,
  contractor_id,
}: any) => {
  try {
    const contractor = await getContractorById(contractor_id);
    if (!contractor) {
      throw new ResourceNotFound("Contractor", contractor_id);
    }
    await updateWorkforceWasteInContractor({
      workforce_id,
      contractor_id,
    });
    return { message: "Workforce updated successfully" };
  } catch (error) {
    throw error;
  }
};
