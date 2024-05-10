import {
  createContract,
  getAllContracts,
  getContractByContractorId,
  getContractById,
} from "../repository/ContractRepository";

export const getAllContractService = async () => {
  try {
    return await getAllContracts();
  } catch (error) {
    throw error;
  }
};

export const getContractByIdService = async (contract_id: number) => {
  try {
    return await getContractById(contract_id);
  } catch (error) {
    throw error;
  }
};

export const getContractByContractorIdService = async (
  contractor_id: number
) => {
  try {
    return await getContractByContractorId(contractor_id);
  } catch (error) {
    throw error;
  }
};

export const createContractService = async ({
  contractor_id,
  duration,
}: any) => {
  try {
    return await createContract({ contractor_id, duration });
  } catch (error) {
    throw error;
  }
};
