import { Request, Response } from "express";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { VehicleTable } from "../drizzle/schema";
import { InvalidType } from "../errors/InvalidType";
import { getStsById } from "../repository/StsRepository";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import {
  deleteVehicleByNumber,
  getAllVehicles,
  getVehicleByNumber,
  getVehicleByStsId,
  inserVehicle,
  updateVehicle,
} from "../repository/VehicleRepository";

export const addVehicleService = async ({
  sts_id,
  vehicle_number,
  type,
  capacity,
  driver_name,
  driver_mobile,
  cost_per_km_loaded,
  cost_per_km_unloaded,
}: any) => {
  try {
    if (
      !sts_id ||
      !vehicle_number ||
      !type ||
      !capacity ||
      !driver_name ||
      !driver_mobile ||
      !cost_per_km_loaded ||
      !cost_per_km_unloaded
    ) {
      throw new InvalidType("All fields are required");
    }

    (sts_id = +sts_id),
      (capacity = parseFloat(capacity)),
      (cost_per_km_loaded = parseFloat(cost_per_km_loaded)),
      (cost_per_km_unloaded = parseFloat(cost_per_km_unloaded));

    const sts = await getStsById(sts_id);
    if (!sts) {
      throw new ResourceNotFound("STS", sts_id);
    }

    const vehicle = await inserVehicle({
      sts_id,
      vehicle_number,
      type,
      capacity,
      driver_name,
      driver_mobile,
      cost_per_km_loaded,
      cost_per_km_unloaded,
    });
    return vehicle;
  } catch (error: any) {
    throw error;
  }
};

export const getAllVehiclesService = async () => {
  try {
    const vehicles = await getAllVehicles();
    return vehicles;
  } catch (error) {
    throw error;
  }
};

export const getVehicleByNumberService = async (vehicle_number: string) => {
  if (!vehicle_number) throw new InvalidType("Vehicle");
  try {
    const vehicle = await getVehicleByNumber(vehicle_number);
    if (!vehicle) throw new ResourceNotFound("Vehicle", vehicle_number);
    return vehicle;
  } catch (error) {
    throw error;
  }
};

export const getVehicleByStsIdService = async (sts_id: number) => {
  try {
    const vehicles = await getVehicleByStsId(sts_id);
    return vehicles;
  } catch (error) {
    throw error;
  }
};

export const deleteVehicleByNumberService = async (vehicle_number: string) => {
  if (!vehicle_number) throw new InvalidType("Vehicle");
  try {
    await deleteVehicleByNumber(vehicle_number);
    return { message: "Vehicle deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export const updateVehicleService = async (
  oldVehicleNumber: string,
  {
    type,
    capacity,
    driver_name,
    driver_mobile,
    cost_per_km_loaded,
    cost_per_km_unloaded,
  }: any
) => {
  if (
    !type ||
    !capacity ||
    !driver_name ||
    !driver_mobile ||
    !cost_per_km_loaded ||
    !cost_per_km_unloaded
  ) {
    throw new InvalidType("All fields are required");
  }

  (capacity = parseFloat(capacity)),
    (cost_per_km_loaded = parseFloat(cost_per_km_loaded)),
    (cost_per_km_unloaded = parseFloat(cost_per_km_unloaded));

  try {
    const existingVehicle = await getVehicleByNumber(oldVehicleNumber);

    if (!existingVehicle)
      throw new ResourceNotFound("Vehicle", oldVehicleNumber);

    const updatedVehicle = await updateVehicle(oldVehicleNumber, {
      type,
      capacity,
      driver_name,
      driver_mobile,
      cost_per_km_loaded,
      cost_per_km_unloaded,
    });

    return updatedVehicle;
  } catch (error) {
    throw error;
  }
};
