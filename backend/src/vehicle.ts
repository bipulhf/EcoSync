import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "./db";

const JWT_SECRET = process.env.JWT_SECRET!;


export const addVehicle = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const currentUserRole = decoded.role;
    if (currentUserRole !== "admin") {
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
        capacity,
        driver_name,
        driver_mobile,
        cost_per_km_load,
        cost_per_km_unload,
      },
    });
    return res.status(200).json(vehicle);
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};
