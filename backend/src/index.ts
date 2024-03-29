import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";
import { prisma } from "./db";
import { hashSync } from "bcrypt";
import { formatTime } from "./helpers/date";

app.listen(8000, async () => {
  console.log("Server started on http://localhost:8000");
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: "admin@ecosync.com",
      },
    });

    const landfill = await prisma.landfill.findFirst({
      where: {
        id: 1,
      },
    });

    if (!user)
      await prisma.user.create({
        data: {
          first_name: "EcoSync",
          last_name: "Admin",
          email: "admin@ecosync.com",
          password: hashSync("admin", 10),
          profile_photo:
            "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
          mobile: "01234567891",
          role: "admin",
          sts_id: null,
          landfill_id: null,
        },
      });

    if (!landfill)
      await prisma.landfill.create({
        data: {
          latitude: 23.7995223,
          longitude: 90.2961618,
          city_corporation: "Dhaka North City Corporation",
          start_time: formatTime("08:00"),
          end_time: formatTime("22:00"),
        },
      });
  } catch (e) {
    console.log(e);
  }
});
