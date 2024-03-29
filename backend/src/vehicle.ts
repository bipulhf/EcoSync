import { Request, Response } from "express";
import { prisma } from "./db";
import { checkRole } from "./helpers/getRole";

export const addVehicle = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    if (!checkRole(token, "admin")) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const {
      vehicle_number,
      type,
      capacity,
      driver_name,
      driver_mobile,
      cost_per_km_load,
      cost_per_km_unload,
    } = req.body;

    const vehicle = await prisma.vehicle.create({
      data: {
        vehicle_number,
        type,
        capacity: parseFloat(capacity),
        driver_name,
        driver_mobile,
        cost_per_km_load: parseFloat(cost_per_km_load),
        cost_per_km_unload: parseFloat(cost_per_km_unload),
      },
    });

    return res.status(200).json(vehicle);
  } catch (e: any) {
    return res.status(500).json({ message: "Server Error" });
  }
};
