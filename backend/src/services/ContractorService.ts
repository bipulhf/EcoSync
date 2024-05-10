import {
  createContractor,
  deleteContractor,
  getAllContractors,
  getContractorById,
} from "../repository/ContractorRepository";

export const getAllContractorsService = async () => {
  try {
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

export const deleteContractorService = async (contractor_id: number) => {
  try {
    await deleteContractor(contractor_id);
    return { message: "Contractor deleted successfully" };
  } catch (error) {
    throw error;
  }
};
