import { ResourceNotFound } from "../errors/ResourceNotFound";
import { getDistance } from "../helpers/getDistance";
import { getContractorById } from "../repository/ContractorRepository";
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
  contractor_id,
}: any) => {
  try {
    const contractor = await getContractorById(contractor_id);
    if (contractor.length === 0) {
      throw new ResourceNotFound("Contractor", contractor_id);
    }
    const origin = {
      latitude: assigned_route_latitude,
      longitude: assigned_route_longitude,
    };
    const total_time_in_sec = await getDistance(origin, contractor.sts);
    const workforce = await createWorkforce({
      full_name,
      dob: new Date(dob),
      job_title,
      rate_per_hour,
      mobile,
      assigned_route_latitude,
      assigned_route_longitude,
      total_time_in_sec: total_time_in_sec.timeInSeconds,
      contractor_id,
    });
    return workforce;
  } catch (error) {
    throw error;
  }
};
