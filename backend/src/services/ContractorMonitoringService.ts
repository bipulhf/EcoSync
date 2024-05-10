import { ResourceNotFound } from "../errors/ResourceNotFound";
import {
  createContractorWasteInLandfill,
  getAllContractorMonitor,
  getContractorMonitorToday,
} from "../repository/ContractorMonitoringRepository";
import { getContractorById } from "../repository/ContractorRepository";

export const getAllContractorMonitorService = async () => {
  try {
    return await getAllContractorMonitor();
  } catch (error) {
    throw error;
  }
};

export const getContractorMonitorTodayService = async () => {
  try {
    return await getContractorMonitorToday();
  } catch (error) {
    throw error;
  }
};

export const createContractorWasteInLandfillService = async ({
  waste_amount,
  type_of_waste,
  vehicle_type,
  sts_id,
  contractor_id,
}: any) => {
  try {
    const contractor = await getContractorById(contractor_id);
    if (!contractor) {
      throw new ResourceNotFound("Contractor", contractor_id);
    }
    await createContractorWasteInLandfill({
      waste_amount: waste_amount / 1000,
      type_of_waste,
      vehicle_type,
      sts_id,
      contractor_id,
    });
    return { message: "Waste added successfully" };
  } catch (error) {
    throw error;
  }
};
