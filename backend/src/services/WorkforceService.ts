import {
  createWorkforce,
  getAllWorkforce,
  getAllWorkforceByContractorId,
  getAllWorkforceById,
} from "../repository/WorkforceRepository";

export const getAllWorkforceService = async () => {
  try {
    return await getAllWorkforce();
  } catch (error) {
    throw error;
  }
};

export const getWorkforceByIdService = async (workforce_id: number) => {
  try {
    return await getAllWorkforceById(workforce_id);
  } catch (error) {
    throw error;
  }
};

export const getWorkforceByContractorIdService = async (
  workforce_id: number
) => {
  try {
    return await getAllWorkforceByContractorId(workforce_id);
  } catch (error) {
    throw error;
  }
};

export const createWorkforceService = async ({
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
    return await createWorkforce({
      full_name,
      dob,
      job_title,
      rate_per_hour,
      mobile,
      assigned_route_latitude,
      assigned_route_longitude,
      total_time_in_sec,
      contractor_id,
    });
  } catch (error) {
    throw error;
  }
};
