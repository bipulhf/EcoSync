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
      const sts = await prisma.sts.findMany({
        include: { landfill: true },
      });
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
        include: {
          vehicle: true,
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

    const [user, vehicle, vehicleIn] = await prisma.$transaction([
      prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          sts_id: true,
        },
      }),
      prisma.vehicle.findFirst({
        where: {
          vehicle_number,
        },
        select: {
          sts_id: true,
        },
      }),
      prisma.sts_Vehicle.findFirst({
        where: {
          vehicle_number,
          departure_time: null,
        },
      }),
    ]);

    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    } else if (!user.sts_id) {
      return res
        .status(403)
        .json({ message: "You don't have any assigned STS" });
    } else if (user.sts_id != sts_id) {
      return res.status(403).json({ message: "Forbidden" });
    } else if (vehicle?.sts_id != sts_id) {
      return res
        .status(403)
        .json({ message: "The vehicle belong to another STS" });
    } else if (vehicleIn) {
      return res.status(403).json({ message: "Vehicle already in STS" });
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

export const fleetOptimization = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const sts_id = parseInt(req.params.id as string);
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
      return res.status(403).json({ message: "User Not Found" });
    } else if (user.sts_id != sts_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    let currentDate = new Date();
    currentDate.setHours(5, 0, 0, 0);

    const [sts_vechile, vehicle_trip] = await prisma.$transaction([
      prisma.vehicle.findMany({
        where: {
          sts_id,
        },
        orderBy: [
          {
            cost_per_km_load: "asc",
          },
          {
            capacity: "desc",
          },
        ],
      }),
      prisma.landfill_Vehicle.findMany({
        where: {
          vehicle: {
            sts_id,
          },
          OR: [
            { arrival_time: null },
            {
              departure_time: {
                gte: currentDate,
              },
            },
          ],
        },
      }),
    ]);

    const vehicles: {
      trip: number;
      cost_loaded: number;
      vehicle_number: string;
      type: string;
      capacity: number;
      driver_name: string;
      driver_mobile: string;
      cost_per_km_load: number;
      cost_per_km_unload: number;
      sts_id: number;
      per_ton: number;
    }[] = [];

    sts_vechile.forEach((vehicle) => {
      const tmp = {
        ...vehicle,
        trip: 3,
        cost_loaded: vehicle.cost_per_km_unload + vehicle.cost_per_km_load,
        travelling: false,
        per_ton: 0,
      };
      vehicle_trip.forEach((trip) => {
        if (trip.vehicle_number == vehicle.vehicle_number) {
          tmp.trip -= 1;
          tmp.travelling = trip.departure_time ? false : true;
        }
      });
      if (tmp.trip) {
        tmp.per_ton = tmp.cost_loaded / (tmp.trip * tmp.capacity);
        vehicles.push(tmp);
      }
    });

    vehicles.sort(comparator);

    return res.status(200).json(vehicles);
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};

function comparator(a: any, b: any) {
  if (a.per_ton == b.per_ton) {
    return b.capacity - a.capacity;
  }
  return a.per_ton - b.per_ton;
}
