import { Request, Response } from "express";
import { prisma } from "../db";
import { checkRole, getUserId } from "../helpers/getRole";
import { userRole } from "../globals";
import { getDistance } from "../helpers/getDistance";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm";
import { StsTable, StsVehicleTable } from "../drizzle/schema";

export const getAllSts = async (req: Request, res: Response) => {
  let managerId = req.query.managerId as string;
  if (!managerId) {
    try {
      const sts = await db.query.StsTable.findMany({
        with: {
          landfill: true,
        },
      });
      return res.status(200).json(sts);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  } else {
    try {
      let parsedManagerId = +managerId;
      const token = (req.headers.authorization as string).split(" ")[1];
      const userId = getUserId(token);
      if (userId != parsedManagerId) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const user = await db.query.UserTable.findFirst({
        where: (model) => eq(model.id, parsedManagerId),
        columns: {
          sts_id: true,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const sts_id = user.sts_id as number;
      const sts = await db.query.StsTable.findFirst({
        where: (model) => eq(model.id, sts_id),
      });
      return res.status(200).json(sts);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }
};

export const getSts = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const sts = await db.query.StsTable.findFirst({
      where: (model) => eq(model.id, id),
      with: {
        landfill: true,
      },
    });
    if (!sts) {
      return res.status(404).json({ message: "STS not Found" });
    }
    return res.status(200).json(sts);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const createSts = async (req: Request, res: Response) => {
  try {
    let { ward, capacity, latitude, longitude, landfill_id } = req.body;
    (ward = parseInt(ward)),
      (capacity = parseFloat(capacity)),
      (landfill_id = parseInt(landfill_id));
    const lat = latitude.split(".");
    const lng = longitude.split(".");

    if (lat.length != 2 || lng.length != 2) {
      return res.status(400).json({ message: "Latitude/Longitude error" });
    }
    const landfill = await db.query.LandfillTable.findFirst({
      where: (model) => eq(model.id, landfill_id),
      columns: {
        latitude: true,
        longitude: true,
      },
    });
    if (!landfill) {
      return res.status(403).json({ message: "Landfill not found" });
    }

    const distance = await getDistance(
      { latitude, longitude },
      { latitude: landfill!.latitude, longitude: landfill!.longitude }
    );

    const sts = await db.insert(StsTable).values({
      ward,
      capacity,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      distance_meter: distance.distanceInMeter,
      possible_time_sec: distance.timeInSeconds,
      landfill_id,
    });
    return res.status(200).json(sts);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const vehicleStsEntry = async (req: Request, res: Response) => {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    const userId = getUserId(token);
    const { vehicle_number, waste_volume } = req.body;

    const txn = await db.transaction(async (tx) => {
      // @ts-ignore
      const [user] = await tx.query.UserTable.findFirst({
        where: (model) => eq(model.id, userId),
        columns: {
          sts_id: true,
        },
      });
      // @ts-ignore
      const [vehicle] = await tx.query.VehicleTable.findFirst({
        where: (model) => eq(model.vehicle_number, vehicle_number),
      });
      // @ts-ignore
      const [vehicleEnteredSts] = await tx.query.StsVehicleTable.findFirst({
        where: (model, { and, isNull }) =>
          and(
            eq(model.vehicle_number, vehicle_number),
            isNull(model.departure_time)
          ),
      });
      // @ts-ignore
      const [vehicleNotInLandfill] =
        await tx.query.LandfillVehicleTable.findFirst({
          where: (model, { and, isNull }) =>
            and(
              eq(model.vehicle_number, vehicle_number),
              isNull(model.arrival_time)
            ),
        });
      return { user, vehicle, vehicleEnteredSts, vehicleNotInLandfill };
    });

    if (!txn.user) {
      return res.status(403).json({ message: "Forbidden" });
    } else if (txn.vehicleEnteredSts) {
      return res.status(403).json({ message: "Vehicle already in STS" });
    } else if (txn.vehicleNotInLandfill) {
      return res
        .status(403)
        .json({ message: "Vehicle already left STS. On the way to landfill." });
    } else if (txn.user.sts_id != txn.vehicle.sts_id) {
      return res.status(403).json({ message: "Vehicle doesn't belong to you" });
    }

    // const stsVehicle = await db.insert(StsVehicleTable).values({
    //   sts_id: txn.user.sts_id,
    //   vehicle_number,
    //   waste_volume: parseFloat(waste_volume),
    // });

    return res.status(200).json(null);
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
    if (!user?.landfill_id && user?.role != userRole.ADMIN) {
      return res.status(403).json({ message: "User Not Found" });
    }

    let tmp;

    if (user?.role == userRole.ADMIN) {
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
          in: tmp.map((x: any) => x.sts_vehicle_id),
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

    sts_vechile.forEach((vehicle: any) => {
      const tmp = {
        ...vehicle,
        trip: 3,
        cost_loaded: vehicle.cost_per_km_unload + vehicle.cost_per_km_load,
        travelling: false,
        per_ton:
          (vehicle.cost_per_km_unload + vehicle.cost_per_km_load) /
          (3 * vehicle.capacity),
      };
      vehicle_trip.forEach((trip: any) => {
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
