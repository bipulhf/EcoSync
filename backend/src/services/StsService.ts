import { rolePermissions, userRole } from "../globals";
import { getDistance } from "../helpers/getDistance";
import { db } from "../drizzle/db";
import {
  createSts,
  getAllSts,
  getStsById,
  getStsByManagerId,
} from "../repository/StsRepository";
import { ResourceNotFound } from "../errors/ResourceNotFound";
import { getLandfillById } from "../repository/LandfillRepository";
import { InvalidAccess } from "../errors/InvalidAccess";
import {
  didVehicleLeftSts,
  didVehicleReachSts,
  getFleetList,
  getVehicleByNumber,
  vehicleEntryInSts,
  vehicleLeavingSts,
  vehiclesInSts,
  vehiclesThatLeftSts,
} from "../repository/VehicleRepository";
import { getUserById } from "../repository/UserRepository";
import { getStsVehicleById } from "../repository/ReportRepository";

export const getAllStsService = async (
  permission: string[],
  userId: number
) => {
  try {
    if (permission.includes(rolePermissions.READ_STS_ALL)) {
      const sts = await getAllSts();
      return sts;
    } else {
      const sts = await getStsByManagerId(userId);
      return sts;
    }
  } catch (error) {
    throw error;
  }
};

export const getStsService = async (sts_id: number) => {
  try {
    const sts = await getStsById(sts_id);
    if (!sts) throw new ResourceNotFound("STS", sts_id);
    return sts;
  } catch (error) {
    throw error;
  }
};

export const createStsService = async ({
  ward,
  capacity,
  latitude,
  longitude,
  landfill_id,
}: any) => {
  try {
    (ward = parseInt(ward)),
      (capacity = parseFloat(capacity)),
      (landfill_id = parseInt(landfill_id)),
      (latitude = parseFloat(latitude)),
      (longitude = parseFloat(longitude));
    const landfill = await getLandfillById(landfill_id);
    if (!landfill) throw new ResourceNotFound("Landfill", landfill_id);

    const distance = await getDistance(
      { latitude, longitude },
      { latitude: landfill!.latitude, longitude: landfill!.longitude }
    );

    const sts = await createSts({
      ward,
      capacity,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      distance_meter: distance.distanceInMeter,
      possible_time_sec: distance.timeInSeconds,
      landfill_id,
    });

    return sts;
  } catch (error) {
    throw error;
  }
};

export const vehicleEnteredInStsService = async (
  userId: number,
  vehicle_number: string,
  waste_volume: number
) => {
  try {
    const txn = await db.transaction(async (tx) => {
      const [sts] = await getStsByManagerId(userId, tx);
      const vehicle = await getVehicleByNumber(vehicle_number, tx);
      const vehicleEnteredSts = await didVehicleReachSts(vehicle_number, tx);
      const vehicleAlreadyLeftSts = await didVehicleLeftSts(vehicle_number, tx);

      return { sts, vehicle, vehicleEnteredSts, vehicleAlreadyLeftSts };
    });

    if (txn.vehicleEnteredSts)
      throw new InvalidAccess("Vehicle already in STS");
    else if (txn.vehicleAlreadyLeftSts)
      throw new InvalidAccess("Vehicle left STS");
    else if (txn.sts.id != txn.vehicle.sts_id) throw new InvalidAccess();

    await vehicleEntryInSts(
      txn.sts.id,
      txn.sts.landfill.id,
      vehicle_number,
      waste_volume
    );
    return { message: "Vehicle entered in STS" };
  } catch (error) {
    throw error;
  }
};

export const vehiclesInStsService = async (userId: number) => {
  try {
    const [sts] = await getStsByManagerId(userId);
    if (!sts) throw new InvalidAccess("You don't have STS assigned");
    const vehicles = await vehiclesInSts(sts.id);
    return vehicles;
  } catch (error) {
    throw error;
  }
};

export const vehicleLeavingStsService = async (
  user_id: number,
  sts_vehicle_id: number
) => {
  try {
    const stsVehicle = await getStsVehicleById(sts_vehicle_id);

    const user = await getUserById(user_id);

    if (!user) throw new ResourceNotFound("User", user_id);
    else if (!user.sts_id)
      throw new InvalidAccess("You don't have assigned STS.");
    else if (!stsVehicle) throw new ResourceNotFound("Vehicle", sts_vehicle_id);
    else if (stsVehicle.sts_id !== user.sts_id) throw new InvalidAccess();

    const update = await vehicleLeavingSts(sts_vehicle_id);
    return update;
  } catch (error) {
    throw error;
  }
};
export const vehiclesThatLeftStsService = async (
  user_id: number,
  permission: string
) => {
  try {
    let vehicleLeftSts;
    const user = await getUserById(user_id);
    if ((permission = rolePermissions.READ_VEHICLE_ALL))
      vehicleLeftSts = await vehiclesThatLeftSts();
    else vehicleLeftSts = await vehiclesThatLeftSts(user.landfill_id);
    return vehicleLeftSts;
  } catch (error) {
    throw error;
  }
};

export const fleetOptimizationService = async (userId: number) => {
  try {
    const user = await getUserById(userId);

    if (!user) throw new ResourceNotFound("User", userId);
    else if (!user.sts_id)
      throw new InvalidAccess("You don't have assigned STS.");

    let { sts_vehicle, vehicle_trip } = await getFleetList(user.sts_id);

    vehicle_trip = vehicle_trip.filter(
      (vehicle) => vehicle.sts_vehicle.sts_id === user.sts_id
    );
    console.log(vehicle_trip);

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

    sts_vehicle.forEach((vehicle: any) => {
      const tmp = {
        ...vehicle,
        trip: 3,
        cost_loaded: vehicle.cost_per_km_unloaded + vehicle.cost_per_km_loaded,
        travelling: false,
        per_ton:
          (vehicle.cost_per_km_unloaded + vehicle.cost_per_km_loaded) /
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

    return vehicles;
  } catch (e) {
    throw e;
  }
};

function comparator(a: any, b: any) {
  if (a.per_ton == b.per_ton) {
    return b.capacity - a.capacity;
  }
  return a.per_ton - b.per_ton;
}
