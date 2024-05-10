import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  real,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const RoleTable = pgTable("roles", {
  role: varchar("role", { length: 255 }).notNull().primaryKey(),
});

export const RoleTableRelations = relations(RoleTable, ({ many }) => ({
  roles: many(UserRoleTable),
  permissions: many(PermissionTable),
}));

export const PermissionTable = pgTable(
  "permissions",
  {
    id: serial("id").primaryKey(),
    permission: varchar("permission", { length: 255 }).notNull(),
    role_name: varchar("role_name", { length: 255 })
      .notNull()
      .references(() => RoleTable.role, { onDelete: "cascade" }),
  },
  (table) => ({
    unique_role_permission: unique("unique_role_permission").on(
      table.permission,
      table.role_name
    ),
  })
);

export const PermissionTableRelations = relations(
  PermissionTable,
  ({ one }) => ({
    role: one(RoleTable, {
      fields: [PermissionTable.role_name],
      references: [RoleTable.role],
    }),
  })
);

export const UserTable = pgTable("users", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  profile_photo: varchar("profile_photo", { length: 255 })
    .notNull()
    .default(
      "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
    ),
  sts_id: integer("sts_id").references(() => StsTable.id, {
    onDelete: "set null",
  }),
  landfill_id: integer("landfill_id").references(() => LandfillTable.id, {
    onDelete: "set null",
  }),
  contractor_id: integer("contractor_id").references(() => ContractorTable.id, {
    onDelete: "set null",
  }),
  mobile: varchar("mobile", { length: 11 }).notNull().unique(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const UserTableRelations = relations(UserTable, ({ one, many }) => ({
  roles: many(UserRoleTable),
  sts: one(StsTable, {
    fields: [UserTable.sts_id],
    references: [StsTable.id],
  }),
  landfill: one(LandfillTable, {
    fields: [UserTable.landfill_id],
    references: [LandfillTable.id],
  }),
  token: one(TokenTable, {
    fields: [UserTable.id],
    references: [TokenTable.user_id],
  }),
  contractor: one(ContractorTable, {
    fields: [UserTable.contractor_id],
    references: [ContractorTable.id],
  }),
}));

export const TokenTable = pgTable("tokens", {
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
  body: varchar("body", { length: 1000 }).notNull(),
  valid: boolean("valid").notNull().default(true),
  expiration: timestamp("expiration").notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" })
    .primaryKey(),
});

export const TokenTableRelations = relations(TokenTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [TokenTable.user_id],
    references: [UserTable.id],
  }),
}));

export const UserRoleTable = pgTable(
  "user_roles",
  {
    user_id: integer("user_id")
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 255 })
      .notNull()
      .references(() => RoleTable.role, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.user_id, table.role] }),
  })
);

export const UserRoleTableRelations = relations(UserRoleTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [UserRoleTable.user_id],
    references: [UserTable.id],
  }),
  role: one(RoleTable, {
    fields: [UserRoleTable.role],
    references: [RoleTable.role],
  }),
}));

export const StsTable = pgTable("sts", {
  id: serial("id").primaryKey(),
  ward: varchar("ward", { length: 255 }).notNull(),
  capacity: real("capacity").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  distance_meter: real("distance_meter").notNull(),
  possible_time_sec: real("possible_time_sec").notNull(),
  landfill_id: integer("landfill_id")
    .references(() => LandfillTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const StsTableRelations = relations(StsTable, ({ one, many }) => ({
  manager: many(UserTable),
  vehicle: many(VehicleTable),
  sts_vehicle: many(StsVehicleTable),
  landfill: one(LandfillTable, {
    fields: [StsTable.landfill_id],
    references: [LandfillTable.id],
  }),
  contractor: many(ContractorTable),
  contractor_monitor: many(ContractorMonitoringTable),
}));

export const ContractTable = pgTable("contracts", {
  id: serial("id").primaryKey(),
  duration: integer("duration").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  contractor_id: integer("contractor_id")
    .notNull()
    .references(() => ContractorTable.id, { onDelete: "cascade" }),
});

export const ContractTableRelations = relations(ContractTable, ({ one }) => ({
  contractor: one(ContractorTable, {
    fields: [ContractTable.contractor_id],
    references: [ContractorTable.id],
  }),
}));

export const ContractorTable = pgTable("contractors", {
  id: serial("id").primaryKey(),
  company_name: varchar("company_name", { length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  tin: varchar("tin", { length: 255 }).notNull().unique(),
  mobile: varchar("mobile", { length: 11 }).notNull().unique(),
  payment_per_ton_waste: real("payment_per_ton_waste").notNull(),
  required_amount_waste: real("required_amount_waste").notNull(),
  area_collection: varchar("area_collection", { length: 255 }).notNull(),
  sts_id: integer("sts_id").references(() => StsTable.id, {
    onDelete: "cascade",
  }),
});

export const ContractorTableRelations = relations(
  ContractorTable,
  ({ one, many }) => ({
    contract: many(ContractTable),
    sts: one(StsTable, {
      fields: [ContractorTable.sts_id],
      references: [StsTable.id],
    }),
    user: many(UserTable),
    workforce: many(ContractorWorkforceTable),
    monitor_workforce: many(WorkforceMonitoringTable),
    monitor_contractor: many(ContractorMonitoringTable),
  })
);

export const WorkforceTable = pgTable("workforces", {
  id: serial("id").primaryKey(),
  full_name: varchar("full_name", { length: 255 }).notNull(),
  dob: timestamp("dob").notNull(),
  job_title: varchar("job_title", { length: 255 }).notNull(),
  rate_per_hour: real("rate_per_hour").notNull(),
  mobile: varchar("mobile", { length: 11 }).notNull().unique(),
  assigned_route_latitude: real("assigned_route_latitude").notNull(),
  assigned_route_longitude: real("assigned_route_longitude").notNull(),
  total_time_in_sec: integer("total_time_in_sec").notNull(),
});

export const WorkforceTableRelations = relations(
  WorkforceTable,
  ({ many }) => ({
    sts: many(ContractorWorkforceTable),
    monitor: many(WorkforceMonitoringTable),
    contractor: many(ContractorWorkforceTable),
  })
);

export const ContractorWorkforceTable = pgTable(
  "contractor_workforce",
  {
    contractor_id: integer("contractor_id")
      .notNull()
      .references(() => ContractorTable.id, { onDelete: "cascade" }),
    workforce_id: integer("workforce_id")
      .notNull()
      .references(() => WorkforceTable.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.contractor_id, table.workforce_id] }),
    };
  }
);

export const ContractorWorkforceTableRelations = relations(
  ContractorWorkforceTable,
  ({ one }) => ({
    contractor: one(ContractorTable, {
      fields: [ContractorWorkforceTable.contractor_id],
      references: [ContractorTable.id],
    }),
    workforce: one(WorkforceTable, {
      fields: [ContractorWorkforceTable.workforce_id],
      references: [WorkforceTable.id],
    }),
  })
);

export const WorkforceMonitoringTable = pgTable("workforce_monitoring", {
  id: serial("id").primaryKey(),
  login: timestamp("login").notNull().defaultNow(),
  logout: timestamp("logout"),
  start_time: timestamp("start_time").notNull().defaultNow(),
  end_time: timestamp("end_time"),
  overtime_hours: real("overtime_hours").notNull().default(0),
  leave_today: boolean("leave_today").notNull().default(false),
  contractor_id: integer("contractor_id")
    .notNull()
    .references(() => ContractorTable.id, { onDelete: "cascade" }),
  workforce_id: integer("workforce_id")
    .notNull()
    .references(() => WorkforceTable.id, { onDelete: "cascade" }),
});

export const WorkforceMonitoringTableRelations = relations(
  WorkforceMonitoringTable,
  ({ one }) => ({
    contractor: one(ContractorTable, {
      fields: [WorkforceMonitoringTable.contractor_id],
      references: [ContractorTable.id],
    }),
    workforce: one(WorkforceTable, {
      fields: [WorkforceMonitoringTable.workforce_id],
      references: [WorkforceTable.id],
    }),
  })
);

export const ContractorMonitoringTable = pgTable("contractor_monitoring", {
  id: serial("id").primaryKey(),
  waste_amount: real("waste_amount").notNull(),
  type_of_waste: varchar("type_of_waste", { length: 255 }).notNull(),
  collection_time: timestamp("collection_time").notNull().defaultNow(),
  vehicle_type: varchar("vehicle_type", { length: 255 }).notNull(),
  sts_id: integer("sts_id")
    .references(() => StsTable.id, { onDelete: "cascade" })
    .notNull(),
  contractor_id: integer("contractor_id")
    .notNull()
    .references(() => ContractorTable.id, { onDelete: "cascade" }),
});

export const ContractorMonitoringTableRelations = relations(
  ContractorMonitoringTable,
  ({ one }) => ({
    sts: one(StsTable, {
      fields: [ContractorMonitoringTable.sts_id],
      references: [StsTable.id],
    }),
    contractor: one(ContractorTable, {
      fields: [ContractorMonitoringTable.contractor_id],
      references: [ContractorTable.id],
    }),
  })
);

export const LandfillTable = pgTable("landfills", {
  id: serial("id").primaryKey(),
  city_corporation: varchar("city_corporation", { length: 255 }).notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  start_time: timestamp("start_time").notNull(),
  end_time: timestamp("end_time").notNull(),
});

export const LandfillTableRelations = relations(LandfillTable, ({ many }) => ({
  manager: many(UserTable),
  sts: many(StsTable),
  landfill_vehicle: many(LandfillVehicleTable),
}));

export const VehicleTable = pgTable("vehicles", {
  vehicle_number: varchar("vehicle_number", { length: 15 })
    .notNull()
    .primaryKey(),
  type: varchar("type", { length: 255 }).notNull(),
  capacity: real("capacity").notNull(),
  driver_name: varchar("driver_name", { length: 255 }).notNull(),
  driver_mobile: varchar("driver_mobile", { length: 11 }).notNull(),
  cost_per_km_loaded: real("cost_per_km_loaded").notNull(),
  cost_per_km_unloaded: real("cost_per_km_unloaded").notNull(),
  sts_id: integer("sts_id").references(() => StsTable.id, {
    onDelete: "cascade",
  }),
});

export const VehicleTableRelations = relations(
  VehicleTable,
  ({ one, many }) => ({
    sts: one(StsTable, {
      fields: [VehicleTable.sts_id],
      references: [StsTable.id],
    }),
    sts_vehicle: many(StsVehicleTable),
    landfill_vehicle: many(LandfillVehicleTable),
  })
);

export const StsVehicleTable = pgTable(
  "sts_vehicles",
  {
    id: serial("id").primaryKey(),
    waste_volume: real("waste_volume").notNull(),
    arrival_time: timestamp("arrival_time").notNull().defaultNow(),
    vehicle_number: varchar("vehicle_number", { length: 15 })
      .notNull()
      .references(() => VehicleTable.vehicle_number, { onDelete: "cascade" }),
    departure_time: timestamp("departure_time"),
    sts_id: integer("sts_id")
      .references(() => StsTable.id, { onDelete: "cascade" })
      .notNull(),
    landfill_id: integer("landfill_id")
      .references(() => LandfillTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    landfill_vehicle_id: integer("landfill_vehicle_id")
      .notNull()
      .references(() => LandfillVehicleTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    sts_vehicle_index: index("sts_vehicle_index").on(
      table.sts_id,
      table.vehicle_number
    ),
  })
);

export const StsVehicleTableRelations = relations(
  StsVehicleTable,
  ({ one }) => ({
    sts: one(StsTable, {
      fields: [StsVehicleTable.sts_id],
      references: [StsTable.id],
    }),
    landfill: one(LandfillTable, {
      fields: [StsVehicleTable.landfill_id],
      references: [LandfillTable.id],
    }),
    landfill_vehicle: one(LandfillVehicleTable, {
      fields: [StsVehicleTable.landfill_vehicle_id],
      references: [LandfillVehicleTable.id],
    }),
    vehicle: one(VehicleTable, {
      fields: [StsVehicleTable.vehicle_number],
      references: [VehicleTable.vehicle_number],
    }),
  })
);

export const LandfillVehicleTable = pgTable(
  "landfill_vehicles",
  {
    id: serial("id").primaryKey(),
    waste_volume: real("waste_volume").notNull(),
    arrival_time: timestamp("arrival_time"),
    departure_time: timestamp("departure_time"),
    left_sts: boolean("left_sts").default(false),
    vehicle_number: varchar("vehicle_number", { length: 15 })
      .notNull()
      .references(() => VehicleTable.vehicle_number, { onDelete: "cascade" }),
    landfill_id: integer("landfill_id")
      .references(() => LandfillTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    landfill_vehicle_index: index("landfill_vehicle_index").on(
      table.landfill_id,
      table.vehicle_number
    ),
  })
);

export const LandfillVehicleTableRelations = relations(
  LandfillVehicleTable,
  ({ one }) => ({
    landfill: one(LandfillTable, {
      fields: [LandfillVehicleTable.landfill_id],
      references: [LandfillTable.id],
    }),
    sts_vehicle: one(StsVehicleTable, {
      fields: [LandfillVehicleTable.id],
      references: [StsVehicleTable.landfill_vehicle_id],
    }),
    vehicle: one(VehicleTable, {
      fields: [LandfillVehicleTable.vehicle_number],
      references: [VehicleTable.vehicle_number],
    }),
  })
);
