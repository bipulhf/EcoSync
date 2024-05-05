import { Request, Response } from "express";
import { prisma } from "./db";
import { userRole } from "./globals";
import { checkRole } from "./helpers/getRole";
import { generatePdf } from "./helpers/generatePdf";
import path from "path";
import fs from "fs";

export const getReport = async (req: Request, res: Response) => {
  const search = req.query.query as string;
  const type = req.query.type as string;
  if (search && type) {
    try {
      const pageNo = parseInt(req.query.pageNo as string);

      if (!pageNo) {
        return res.status(400).json({ message: "Bad Request" });
      }

      let report: any;

      if (type == "sts_id") {
        report = await prisma.$transaction([
          prisma.sts_Vehicle.count(),
          prisma.sts_Vehicle.findMany({
            where: {
              sts_id: parseInt(search),
              departure_time: {
                not: null,
              },
            },
            orderBy: [
              {
                Landfill_Vehicle: {
                  departure_time: "desc",
                },
              },
              {
                Landfill_Vehicle: {
                  arrival_time: "desc",
                },
              },
              {
                departure_time: "desc",
              },
              {
                arrival_time: "desc",
              },
            ],
            include: {
              vehicle: true,
              Landfill_Vehicle: {
                select: {
                  landfill_id: true,
                  departure_time: true,
                  arrival_time: true,
                },
              },
              sts: {
                select: {
                  id: true,
                  ward: true,
                  capacity: true,
                  distance_meter: true,
                  possible_time_sec: true,
                },
              },
            },
            skip: (pageNo - 1) * 10,
            take: 10,
          }),
        ]);
      } else if (type == "vehicle_number") {
        report = await prisma.$transaction([
          prisma.sts_Vehicle.count(),
          prisma.sts_Vehicle.findMany({
            where: {
              vehicle_number: search,
              departure_time: {
                not: null,
              },
            },
            orderBy: [
              {
                Landfill_Vehicle: {
                  departure_time: "desc",
                },
              },
              {
                Landfill_Vehicle: {
                  arrival_time: "desc",
                },
              },
              {
                departure_time: "desc",
              },
              {
                arrival_time: "desc",
              },
            ],
            include: {
              vehicle: true,
              Landfill_Vehicle: {
                select: {
                  landfill_id: true,
                  departure_time: true,
                  arrival_time: true,
                },
              },
              sts: {
                select: {
                  id: true,
                  ward: true,
                  capacity: true,
                  distance_meter: true,
                  possible_time_sec: true,
                },
              },
            },
            skip: (pageNo - 1) * 10,
            take: 10,
          }),
        ]);
      } else if (type == "date") {
        search.replace("%ff", "-");
        console.log(type);
        report = await prisma.$transaction([
          prisma.sts_Vehicle.count(),
          prisma.sts_Vehicle.findMany({
            where: {
              departure_time: {
                gte: new Date(search),
              },
            },
            orderBy: [
              {
                Landfill_Vehicle: {
                  departure_time: "desc",
                },
              },
              {
                Landfill_Vehicle: {
                  arrival_time: "desc",
                },
              },
              {
                departure_time: "desc",
              },
              {
                arrival_time: "desc",
              },
            ],
            include: {
              vehicle: true,
              Landfill_Vehicle: {
                select: {
                  landfill_id: true,
                  departure_time: true,
                  arrival_time: true,
                },
              },
              sts: {
                select: {
                  id: true,
                  ward: true,
                  capacity: true,
                  distance_meter: true,
                  possible_time_sec: true,
                },
              },
            },
            skip: (pageNo - 1) * 10,
            take: 10,
          }),
        ]);
      }

      const query = {
        pageNo,
        isFirst: pageNo === 1,
        isLast: report[0] - pageNo * 10 <= 0,
        total: report[0],
        data: report[1],
      };

      res.setHeader("Access-Control-Allow-Credentials", "true");

      return res.status(200).json(query);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  } else {
    try {
      const token = (req.headers.authorization as string) || req.cookies.jwt;
      const pageNo = parseInt(req.query.pageNo as string);

      if (!pageNo) {
        return res.status(400).json({ message: "Bad Request" });
      }

      if (!checkRole(token, userRole.ADMIN)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const report = await prisma.$transaction([
        prisma.sts_Vehicle.count(),
        prisma.sts_Vehicle.findMany({
          where: {
            departure_time: {
              not: null,
            },
          },
          orderBy: [
            {
              Landfill_Vehicle: {
                departure_time: "desc",
              },
            },
            {
              Landfill_Vehicle: {
                arrival_time: "desc",
              },
            },
            {
              departure_time: "desc",
            },
            {
              arrival_time: "desc",
            },
          ],
          include: {
            vehicle: true,
            Landfill_Vehicle: {
              select: {
                landfill_id: true,
                departure_time: true,
                arrival_time: true,
              },
            },
            sts: {
              select: {
                id: true,
                ward: true,
                capacity: true,
                distance_meter: true,
                possible_time_sec: true,
              },
            },
          },
          skip: (pageNo - 1) * 10,
          take: 10,
        }),
      ]);

      const query = {
        pageNo,
        isFirst: pageNo === 1,
        isLast: report[0] - pageNo * 10 <= 0,
        total: report[0],
        data: report[1],
      };

      res.setHeader("Access-Control-Allow-Credentials", "true");

      return res.status(200).json(query);
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }
};

export const createReport = async (req: Request, res: Response) => {
  const { sts_vehicle_id } = req.params;
  try {
    const token = (req.headers.authorization as string) || req.cookies.jwt;

    if (!checkRole(token, userRole.ADMIN) || !sts_vehicle_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const sts_vehicle = await prisma.sts_Vehicle.findFirst({
      where: {
        id: +sts_vehicle_id,
      },
      include: {
        vehicle: true,
        sts: true,
        Landfill_Vehicle: {
          select: {
            landfill_id: true,
            departure_time: true,
            arrival_time: true,
          },
        },
      },
    });

    if (!sts_vehicle) {
      return res.status(400).json({ message: "Bad Request" });
    } else if (
      !sts_vehicle.Landfill_Vehicle ||
      !sts_vehicle.Landfill_Vehicle.departure_time
    ) {
      return res.status(400).json({ message: "Vehicle is still in landfill" });
    }

    const stream = fs.createWriteStream(
      `public/pdf/report_${sts_vehicle.vehicle_number}_${new Date(
        sts_vehicle.Landfill_Vehicle.departure_time
      ).toLocaleTimeString()}.pdf`
    );

    generatePdf({ sts_vehicle }, stream);

    stream.on("finish", () => {
      if (
        sts_vehicle.Landfill_Vehicle &&
        sts_vehicle.Landfill_Vehicle.departure_time
      ) {
        return res
          .status(200)
          .download(
            path.join(
              __dirname,
              "..",
              "public",
              "pdf",
              `report_${sts_vehicle.vehicle_number}_${new Date(
                sts_vehicle.Landfill_Vehicle.departure_time
              ).toLocaleTimeString()}.pdf`
            )
          );
      } else {
        return res
          .status(400)
          .json({ message: "Invalid vehicle or departure time" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
