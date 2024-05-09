import { InvalidType } from "../errors/InvalidType";
import { getStsById } from "../repository/StsRepository";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import {
  deleteVehicleByNumber,
  getAllVehicles,
  getVehicleByNumber,
  getVehicleByStsId,
  getVehiclesTotalWasteAmount,
  inserVehicle,
  updateVehicle,
} from "../repository/VehicleRepository";
import { getUserById } from "../repository/UserRepository";
import { rolePermissions } from "../globals";

export const addVehicleService = async ({
  sts_id,
  vehicle_number,
  type,
  capacity,
  driver_name,
  driver_mobile,
  cost_per_km_loaded,
  cost_per_km_unloaded,
}: any) => {
  try {
    if (
      !sts_id ||
      !vehicle_number ||
      !type ||
      !capacity ||
      !driver_name ||
      !driver_mobile ||
      !cost_per_km_loaded ||
      !cost_per_km_unloaded
    ) {
      throw new InvalidType("All fields are required");
    }

    (sts_id = +sts_id),
      (capacity = parseFloat(capacity)),
      (cost_per_km_loaded = parseFloat(cost_per_km_loaded)),
      (cost_per_km_unloaded = parseFloat(cost_per_km_unloaded));

    const sts = await getStsById(sts_id);
    if (!sts) {
      throw new ResourceNotFound("STS", sts_id);
    }

    const vehicle = await inserVehicle({
      sts_id,
      vehicle_number,
      type,
      capacity,
      driver_name,
      driver_mobile,
      cost_per_km_loaded,
      cost_per_km_unloaded,
    });
    return vehicle;
  } catch (error) {
    throw error;
  }
};

export const getAllVehiclesService = async (user_id: number) => {
  try {
    const user = await getUserById(user_id);
    if (!user) throw new ResourceNotFound("User", user_id);
    if (user.sts_id) return await getVehicleByStsId(user.sts_id);
    return await getAllVehicles();
  } catch (error) {
    throw error;
  }
};

export const getVehiclesTotalWasteAmountService = async (
  user_id: number,
  permissions: any
) => {
  try {
    const user = await getUserById(user_id);
    if (!user) throw new ResourceNotFound("User", user_id);
    const vehicles: any = {
      open_truck: 0,
      dump_truck: 0,
      compactor: 0,
      container: 0,
    };

    if (user.landfill_id) {
      const landfill_vehicles = await getVehiclesTotalWasteAmount(
        0,
        user.landfill_id
      );
      landfill_vehicles.forEach((vehicle: any) => {
        if (!vehicles[vehicle.vehicle.type]) vehicles[vehicle.vehicle.type] = 0;
        vehicles[vehicle.vehicle.type] += vehicle.waste_volume;
      });
    } else if (user.sts_id) {
      const sts_vehicles = await getVehiclesTotalWasteAmount(user.sts_id);
      sts_vehicles.forEach((vehicle: any) => {
        if (!vehicles[vehicle.vehicle.type]) vehicles[vehicle.vehicle.type] = 0;
        vehicles[vehicle.vehicle.type] += vehicle.waste_volume;
      });
    } else if (permissions.includes(rolePermissions.READ_VEHICLE_ALL)) {
      const all_vehicles = await getVehiclesTotalWasteAmount();
      all_vehicles.forEach((vehicle: any) => {
        if (!vehicles[vehicle.vehicle.type]) vehicles[vehicle.vehicle.type] = 0;
        vehicles[vehicle.vehicle.type] += vehicle.waste_volume;
      });
    }
    const new_vehicles = Object.keys(vehicles).map((key) => ({
      type: key,
      value: vehicles[key],
    }));
    return new_vehicles;
  } catch (error) {
    throw error;
  }
};

export const getVehicleByNumberService = async (vehicle_number: string) => {
  if (!vehicle_number) throw new InvalidType("Vehicle");
  try {
    const vehicle = await getVehicleByNumber(vehicle_number);
    if (!vehicle) throw new ResourceNotFound("Vehicle", vehicle_number);
    return vehicle;
  } catch (error) {
    throw error;
  }
};

export const deleteVehicleByNumberService = async (vehicle_number: string) => {
  if (!vehicle_number) throw new InvalidType("Vehicle");
  try {
    await deleteVehicleByNumber(vehicle_number);
    return { message: "Vehicle deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export const updateVehicleService = async (
  oldVehicleNumber: string,
  {
    type,
    capacity,
    driver_name,
    driver_mobile,
    cost_per_km_loaded,
    cost_per_km_unloaded,
  }: any
) => {
  if (
    !type ||
    !capacity ||
    !driver_name ||
    !driver_mobile ||
    !cost_per_km_loaded ||
    !cost_per_km_unloaded
  ) {
    throw new InvalidType("All fields are required");
  }

  (capacity = parseFloat(capacity)),
    (cost_per_km_loaded = parseFloat(cost_per_km_loaded)),
    (cost_per_km_unloaded = parseFloat(cost_per_km_unloaded));

  try {
    const existingVehicle = await getVehicleByNumber(oldVehicleNumber);

    if (!existingVehicle)
      throw new ResourceNotFound("Vehicle", oldVehicleNumber);

    const updatedVehicle = await updateVehicle(oldVehicleNumber, {
      type,
      capacity,
      driver_name,
      driver_mobile,
      cost_per_km_loaded,
      cost_per_km_unloaded,
    });

    return updatedVehicle;
  } catch (error) {
    throw error;
  }
};
