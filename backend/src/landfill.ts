import { Request, Response } from "express";
import { prisma } from "./db";
import { formatTime } from "./helpers/date";
import { checkRole, getUserId } from "./helpers/getRole";
import { userRole } from "./globals";

export const getAllLandfill = async (req: Request, res: Response) => {
  const managerId = req.query.managerId;
  if (!managerId) {
    try {
      const token = req.headers.authorization as string;

      if (!checkRole(token, userRole.admin)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const landfill = await prisma.landfill.findMany();
      return res.status(200).json(landfill);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  } else {
    try {
      const token = req.headers.authorization as string;
      const userId = getUserId(token);

      if (userId != +managerId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const landfill = await prisma.landfill.findFirst({
        where: {
          manager: {
            every: {
              id: +managerId,
            },
          },
        },
      });

      if (!landfill) {
        return res.status(404).json({ message: "Not Found" });
      }
      return res.status(200).json(landfill);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }
};

export const getLandfill = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const id = parseInt(req.params.id);

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const landfill = await prisma.landfill.findFirst({
      where: {
        id,
      },
    });

    if (!landfill) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json(landfill);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const createLandfill = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    let { city_corporation, start_time, latitude, longitude, end_time } =
      req.body;

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const landfill = await prisma.landfill.create({
      data: {
        city_corporation,
        latitude,
        longitude,
        start_time: formatTime(start_time),
        end_time: formatTime(end_time),
      },
    });

    return res.status(200).json(landfill);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const vehicleLandfillEntry = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userId = getUserId(token);
    const { vehicle_number, waste_volume } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        landfill_id: true,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    } else if (!user.landfill_id) {
      return res
        .status(403)
        .json({ message: "You don't have any assigned Landfill" });
    }

    const landfillVehicle = await prisma.landfill_Vehicle.updateMany({
      where: {
        vehicle_number,
        waste_volume,
        arrival_time: null,
      },
      data: {
        arrival_time: new Date(),
      },
    });

    if (!landfillVehicle) {
      return res.status(404).json({ message: "Vehicle Not Found" });
    }

    return res.status(200).json(landfillVehicle);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const vehicleInLandfill = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userId = getUserId(token);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        landfill_id: true,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    } else if (!user.landfill_id) {
      return res
        .status(403)
        .json({ message: "You don't have any assigned Landfill" });
    }

    const landfillVehicle = await prisma.landfill_Vehicle.findMany({
      where: {
        landfill_id: user.landfill_id,
        arrival_time: {
          not: null,
        },
        departure_time: null,
      },
    });

    return res.status(200).json(landfillVehicle);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const vehicleLandfillUpdate = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userId = getUserId(token);
    const id = +req.params.id;

    const landfillVehicle = await prisma.landfill_Vehicle.findFirst({
      where: {
        id,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        landfill_id: true,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "User Not Found" });
    } else if (!user.landfill_id) {
      return res
        .status(403)
        .json({ message: "You don't have any assigned Landfill" });
    } else if (!landfillVehicle) {
      return res.status(404).json({ message: "Vehicle Not Found" });
    } else if (landfillVehicle.landfill_id !== user.landfill_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedLandfillVehicle = await prisma.landfill_Vehicle.update({
      where: {
        id,
      },
      data: {
        ...landfillVehicle,
        departure_time: new Date(),
      },
    });

    return res.status(200).json(updatedLandfillVehicle);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const weeklyWasteAmount = async (req: Request, res: Response) => {
  let landfillId = req.query.landfillId;
  try {
    const token = req.headers.authorization as string;
    const userId = getUserId(token);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        role: true,
        landfill_id: true,
      },
    });
    console.log(user);

    if (!user) {
      return res.status(403).json({ message: "User Not Found" });
    } else if (!user.landfill_id) {
      return res
        .status(403)
        .json({ message: "You don't have any assigned Landfill" });
    } else if (
      !checkRole(token, userRole.admin) &&
      !checkRole(token, userRole.landfill_manager)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    } else if (
      landfillId &&
      !checkRole(token, userRole.admin) &&
      user.landfill_id !== +landfillId
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const landfillVehicles = await prisma.landfill_Vehicle.findMany({
      where: {
        landfill_id: landfillId ? +landfillId : user.landfill_id,
        departure_time: {
          gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    let weekly_waste_amount = 0;
    landfillVehicles.forEach((vehicle) => {
      weekly_waste_amount += vehicle.waste_volume;
    });

    return res.status(200).json({ weekly_waste_amount });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const vehicleLeftLandfill = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userId = getUserId(token);

    if (!userId) {
      return res.status(403).json({ message: "User Not Found" });
    }

    const vehicleLeftLandfill = await prisma.landfill_Vehicle.findMany({
      where: {
        departure_time: {
          not: null,
        },
        arrival_time: {
          not: null,
        },
      },
      orderBy: {
        departure_time: "desc",
      },
      take: 10,
    });

    return res.status(200).json(vehicleLeftLandfill);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
