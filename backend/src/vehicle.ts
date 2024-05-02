import { Request, Response } from "express";
import { db } from "./drizzle/db";
import { eq } from "drizzle-orm";
import { VehicleTable } from "./drizzle/schema";

export const addVehicle = async (req: Request, res: Response) => {
  try {
    let {
      sts_id,
      vehicle_number,
      type,
      capacity,
      driver_name,
      driver_mobile,
      cost_per_km_loaded,
      cost_per_km_unloaded,
    } = req.body;

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
      return res.status(400).json({ message: "All fields are required" });
    }

    (sts_id = +sts_id),
      (capacity = parseFloat(capacity)),
      (cost_per_km_loaded = parseFloat(cost_per_km_loaded)),
      (cost_per_km_unloaded = parseFloat(cost_per_km_unloaded));

    const sts = await db.query.StsTable.findFirst({
      where: (model) => eq(model.id, sts_id),
    });
    if (!sts) {
      return res.status(404).json({ message: "STS does not exist" });
    }

    const vehicle = await db
      .insert(VehicleTable)
      .values({
        sts_id,
        vehicle_number,
        type,
        capacity,
        driver_name,
        driver_mobile,
        cost_per_km_loaded,
        cost_per_km_unloaded,
      })
      .returning();

    return res.status(200).json(vehicle);
  } catch (e: any) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await db.query.VehicleTable.findMany();
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getVehicleByNumber = async (req: Request, res: Response) => {
  const vehicleNumber = req.params.number;

  if (!vehicleNumber)
    return res.status(400).json({ message: "Vehicle number is required" });
  try {
    const vehicle = await db.query.VehicleTable.findFirst({
      where: (model) => eq(model.vehicle_number, vehicleNumber),
    });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVehicleByNumber = async (req: Request, res: Response) => {
  const vehicleNumber = req.params.number;
  if (!vehicleNumber)
    return res.status(400).json({ message: "Vehicle number is required" });
  try {
    await db
      .delete(VehicleTable)
      .where(eq(VehicleTable.vehicle_number, vehicleNumber))
      .execute();
    return res.status(204).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const oldVehicleNumber = req.params.number;
  let {
    type,
    capacity,
    driver_name,
    driver_mobile,
    cost_per_km_loaded,
    cost_per_km_unloaded,
  } = req.body;

  if (
    !type ||
    !capacity ||
    !driver_name ||
    !driver_mobile ||
    !cost_per_km_loaded ||
    !cost_per_km_unloaded
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  (capacity = parseFloat(capacity)),
    (cost_per_km_loaded = parseFloat(cost_per_km_loaded)),
    (cost_per_km_unloaded = parseFloat(cost_per_km_unloaded));

  try {
    const existingVehicle = await db.query.VehicleTable.findFirst({
      where: (model) => eq(model.vehicle_number, oldVehicleNumber),
    });

    if (!existingVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const updatedVehicle = await db
      .update(VehicleTable)
      .set({
        type,
        capacity,
        driver_name,
        driver_mobile,
        cost_per_km_loaded,
        cost_per_km_unloaded,
      })
      .where(eq(VehicleTable.vehicle_number, oldVehicleNumber))
      .returning();

    return res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
