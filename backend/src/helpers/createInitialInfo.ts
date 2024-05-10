import { hashSync } from "bcrypt";
import { db } from "../drizzle/db";
import {
  UserTable,
  LandfillTable,
  RoleTable,
  PermissionTable,
  UserRoleTable,
} from "../drizzle/schema";
import { userRole } from "../globals";
import { formatTime } from "./date";
import { permissions } from "./permissions";

export default async function createInitialInfo() {
  try {
    await db.transaction(async (tx) => {
      const [user] = await tx
        .select({ id: UserTable.id })
        .from(UserTable)
        .limit(1);

      const [landfill] = await tx
        .select({ id: LandfillTable.id })
        .from(LandfillTable)
        .limit(1);
      const [role] = await tx
        .select({ role: RoleTable.role })
        .from(RoleTable)
        .limit(1);
      const [permission] = await tx
        .select({ id: PermissionTable.id })
        .from(PermissionTable)
        .limit(1);

      if (!role && !permission) {
        console.log("Inserting default role and permission...");
        await tx.insert(RoleTable).values([
          {
            role: userRole.ADMIN,
          },
          {
            role: userRole.STS_MANAGER,
          },
          {
            role: userRole.LANDFILL_MANAGER,
          },
          {
            role: userRole.CONTRACTOR_MANAGER,
          },
          {
            role: userRole.UNASSIGNED,
          },
        ]);
        await tx.insert(PermissionTable).values(permissions);
      }

      if (!user && !landfill) {
        console.log("Inserting default user and landfill...");
        const [user] = await tx
          .insert(UserTable)
          .values({
            first_name: "EcoSync",
            last_name: "Admin",
            email: "admin@ecosync.com",
            password: hashSync("admin", 10),
            mobile: "01234567891",
          })
          .returning({ id: UserTable.id });

        await tx.insert(UserRoleTable).values({
          user_id: user.id,
          role: userRole.ADMIN,
        });

        await tx.insert(LandfillTable).values({
          latitude: 23.7995223,
          longitude: 90.2961618,
          city_corporation: "Dhaka North City Corporation",
          start_time: formatTime("08:00"),
          end_time: formatTime("22:00"),
        });
      } else {
        return;
      }
    });
  } catch (e) {
    throw e;
  }
}
