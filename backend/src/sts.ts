import { Request, Response } from "express";
import { prisma } from "./db";
import { checkRole, getUserId } from "./helpers/getRole";
import { userRole } from "./globals";
import { getDistance } from "./helpers/getDistance";

export const getAllSts = async (req: Request, res: Response) => {
  const managerId = req.query.managerId;
  if (!managerId) {
    try {
      const token = req.headers.authorization as string;
      if (!checkRole(token, userRole.admin)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const sts = await prisma.sts.findMany({ include: { landfill: true } });
      return res.status(200).json(sts);
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

      const sts = await prisma.sts.findFirst({
        where: {
          manager: {
            every: {
              id: +managerId,
            },
          },
        },
      });

      if (!sts) {
        return res.status(404).json({ message: "Not Found" });
      }

      return res.status(200).json(sts);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }
};

export const getSts = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const id = parseInt(req.params.id);

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const sts = await prisma.sts.findFirst({
      where: {
        id,
      },
      include: {
        landfill: true,
      },
    });

    if (!sts) {
      return res.status(404).json({ message: "Not Found" });
    }

    return res.status(200).json(sts);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const createSts = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const { ward, capacity, latitude, longitude, landfill_id } = req.body;

    if (!checkRole(token, userRole.admin)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const landfill = await prisma.landfill.findFirst({
      where: { id: parseInt(landfill_id) },
      select: { latitude: true, longitude: true },
    });

    const distance = await getDistance(
      { latitude, longitude },
      { latitude: landfill!.latitude, longitude: landfill!.longitude }
    );

    const sts = await prisma.sts.create({
      data: {
        ward: parseInt(ward),
        capacity: parseFloat(capacity),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        distance_meter: distance.distanceInMeter,
        possible_time_sec: distance.timeInSeconds,
        landfill_id: parseInt(landfill_id),
      },
    });

    return res.status(200).json(sts);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const vehicleStsEntry = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userId = getUserId(token);
    const { sts_id, vehicle_number, waste_volume } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        sts_id: true,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    } else if (!user.sts_id) {
      return res
        .status(403)
        .json({ message: "You don't have any assigned STS" });
    } else if (user.sts_id != sts_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const stsVehicle = await prisma.sts_Vehicle.create({
      data: {
        sts_id: parseInt(sts_id),
        vehicle_number,
        waste_volume: parseFloat(waste_volume),
        arrival_time: new Date(),
      },
    });

    return res.status(200).json(stsVehicle);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const vehicleInSts = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userId = getUserId(token);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        sts_id: true,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    } else if (!user.sts_id) {
      return res
        .status(403)
        .json({ message: "You don't have any assigned STS" });
    }

    const vehicleInSts = await prisma.sts_Vehicle.findMany({
      where: {
        sts_id: user.sts_id,
        departure_time: null,
      },
      include: {
        vehicle: true,
      },
    });

    return res.status(200).json(vehicleInSts);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const vehicleStsUpdate = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userId = getUserId(token);
    const id = +req.params.id;

    const stsVehicle = await prisma.sts_Vehicle.findFirst({
      where: {
        id,
      },
      include: {
        sts: true,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        sts_id: true,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "User Not Found" });
    } else if (!user.sts_id) {
      return res
        .status(403)
        .json({ message: "You don't have any assigned STS" });
    } else if (!stsVehicle) {
      return res.status(404).json({ message: "Vehicle Not Found" });
    } else if (stsVehicle.sts_id !== user.sts_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const update = await prisma.$transaction([
      prisma.sts_Vehicle.update({
        where: {
          id,
        },
        data: {
          departure_time: new Date(),
        },
      }),
      prisma.landfill_Vehicle.create({
        data: {
          landfill_id: stsVehicle.sts.landfill_id,
          vehicle_number: stsVehicle.vehicle_number,
          waste_volume: stsVehicle.waste_volume,
          sts_vehicle_id: id,
        },
      }),
    ]);

    return res.status(200).json(update[0]);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export const vehicleLeftSts = async (req: Request, res: Response) => {
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
    if (!user?.landfill_id && user?.role != userRole.admin) {
      return res.status(403).json({ message: "User Not Found" });
    }

    let tmp;

    if (user?.role == userRole.admin) {
      tmp = await prisma.landfill_Vehicle.findMany({
        where: {
          arrival_time: null,
        },
      });
    } else {
      tmp = await prisma.landfill_Vehicle.findMany({
        where: {
          landfill_id: user!.landfill_id!,
          arrival_time: null,
        },
      });
    }

    const vehicleLeftSts = await prisma.sts_Vehicle.findMany({
      where: {
        id: {
          in: tmp.map((x) => x.sts_vehicle_id),
        },
      },
      include: {
        vehicle: true,
      },
    });

    return res.status(200).json(vehicleLeftSts);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
