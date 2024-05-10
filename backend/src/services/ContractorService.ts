import { ResourceNotFound } from "../errors/ResourceNotFound";
import {
  createContractor,
  createContractorManager,
  deleteContractor,
  getAllContractors,
  getContractorById,
} from "../repository/ContractorRepository";
import { getStsById } from "../repository/StsRepository";

export const getAllContractorsService = async (sts_id?: number) => {
  try {
    if (sts_id) return await getAllContractors(sts_id);
    return await getAllContractors();
  } catch (error) {
    throw error;
  }
};

export const getContractorService = async (contractor_id: number) => {
  try {
    return await getContractorById(contractor_id);
  } catch (error) {
    throw error;
  }
};

export const createContractorService = async ({
  company_name,
  tin,
  mobile,
  payment_per_ton_waste,
  required_amount_waste,
  area_collection,
  sts_id,
}: any) => {
  try {
    const sts = await getStsById(sts_id);
    if (!sts) throw new ResourceNotFound("STS", sts_id);
    return await createContractor({
      company_name,
      tin,
      mobile,
      payment_per_ton_waste,
      required_amount_waste,
      area_collection,
      sts_id,
    });
  } catch (error) {
    throw error;
  }
};

export const createContractorManagerService = async (
  user_id: number,
  contractor_id: number
) => {
  try {
    await createContractorManager(user_id, contractor_id);
    return { message: "Contractor manager created successfully" };
  } catch (error) {
    throw error;
  }
};

export const deleteContractorService = async (contractor_id: number) => {
  try {
    await deleteContractor(contractor_id);
    return { message: "Contractor deleted successfully" };
  } catch (error) {
    throw error;
  }
};
