import { Request, Response } from "express";
import { prisma } from "./db";
import { checkRole } from "./helpers/getRole";
import { userRole } from "./globals";

export const addVehicle = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    if (!checkRole(token, "admin")) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const {
      sts_id,
      vehicle_number,
      type,
      capacity,
      driver_name,
      driver_mobile,
      cost_per_km_load,
      cost_per_km_unload,
    } = req.body;
    
    if(sts_id) {
      const sts = await prisma.sts.findFirst({
        where: {
          id: +sts_id
        }
      });
      if(!sts) {
        return res.status(403).json({ message: "STS does not exist" });
      }
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        sts_id: +sts_id,
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

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({
        message: "Permission Denined, Only System Admin can access user",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT token expired or invalid" });
  }

  try {
    const vehicles = await prisma.vehicle.findMany();

    return res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getVehicleByNumber = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({
        message: "Permission Denined, Only System Admin can access user",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT token expired or invalid" });
  }

  const vehicleNumber = req.params.number;

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        vehicle_number: vehicleNumber,
      },
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
  try {
    const token = req.headers.authorization as string;

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({
        message: "Permission Denined, Only System Admin can access user",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT token expired or invalid" });
  }

  const vehicleNumber = req.params.number;
  try {
    const existingVehicle = await prisma.vehicle.findUnique({
      where: {
        vehicle_number: vehicleNumber,
      },
    });

    if (!existingVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const oldVehicleNumber = req.params.number;
  const {
    vehicle_number,
    type,
    capacity,
    driver_name,
    driver_mobile,
    cost_per_km_load,
    cost_per_km_unload,
  } = req.body;

  try {
    const token = req.headers.authorization as string;

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({
        message:
          "Permission Denined, Only System Admin can update vehicle details.",
      });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: JWT token expired or invalid" });
  }

  try {
    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        vehicle_number: oldVehicleNumber,
      },
    });

    if (!existingVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: {
        vehicle_number: oldVehicleNumber,
      },
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

    return res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
