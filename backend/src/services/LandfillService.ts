import { formatTime } from "../helpers/date";
import { rolePermissions, userRole } from "../globals";
import {
  createLandfill,
  getAllLandfill,
  getLandfillById,
  getLandfillByManagerId,
  getWeeklyWasteAmount,
} from "../repository/LandfillRepository";
import { InvalidType } from "../errors/InvalidType";
import { getUserById } from "../repository/UserRepository";
import { InvalidAccess } from "../errors/InvalidAccess";
import {
  getLandfillVehicleById,
  getLandfillVehicleByVehicleNumber,
  vehicleEntryInLandfill,
  vehicleLeavingLandfill,
  vehiclesInLandfill,
  vehiclesThatLeftLandfill,
} from "../repository/VehicleRepository";
import { ResourceNotFound } from "../errors/ResourceNotFound";

export const getAllLandfillService = async (manager_id?: number) => {
  try {
    let landfills: any;
    if (!manager_id) landfills = await getAllLandfill();
    else landfills = await getLandfillByManagerId(manager_id);
    return landfills;
  } catch (error) {
    throw error;
  }
};

export const getLandfillService = async (landfill_id: number) => {
  try {
    const landfill = await getLandfillById(landfill_id);
    return landfill;
  } catch (error) {
    throw error;
  }
};

export const createLandfillService = async ({
  city_corporation,
  start_time,
  latitude,
  longitude,
  end_time,
}: any) => {
  try {
    const lat = latitude.split(".");
    const lng = longitude.split(".");
    if (lat.length !== 2 || lng.length !== 2)
      throw new InvalidType("Latitude/Longitude");

    const landfill = await createLandfill({
      city_corporation,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      start_time: formatTime(start_time),
      end_time: formatTime(end_time),
    });

    return landfill;
  } catch (error) {
    throw error;
  }
};

export async function landfillsLastWeekWasteService() {
  try {
    const landfills = await getWeeklyWasteAmount();
    let result: any = {};
    landfills.forEach((landfill) => {
      if (landfill.departure_time) {
        if (!result[landfill.departure_time.toLocaleDateString()])
          result[landfill.departure_time?.toLocaleDateString()] = {};

        if (
          !result[landfill.departure_time.toLocaleDateString()][
            landfill.landfill_id
          ]
        )
          result[landfill.departure_time.toLocaleDateString()][
            landfill.landfill_id
          ] = 0;

        result[landfill.departure_time.toLocaleDateString()][
          landfill.landfill_id
        ] += landfill.waste_volume;
      }
    });

    const data: any[] = [];
    Object.keys(result).forEach((date) => {
      Object.keys(result[date]).forEach((landfill_id) => {
        const volume_waste = result[date][landfill_id];
        data.push({ date, landfill_id, value: volume_waste });
      });
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export const vehicleEntryInLandfillService = async (
  user_id: number,
  vehicle_number: string,
  waste_volume: number
) => {
  try {
    const user = await getUserById(user_id);
    if (!user.landfill_id) throw new InvalidAccess("Landfill not assigned");

    const landfillVehicleId = await getLandfillVehicleByVehicleNumber(
      vehicle_number,
      user.landfill_id
    );

    if (landfillVehicleId?.landfill_id !== user.landfill_id)
      throw new InvalidAccess();

    const landfillVehicle = await vehicleEntryInLandfill(
      vehicle_number,
      waste_volume
    );
    return landfillVehicle;
  } catch (error) {
    throw error;
  }
};

export const vehiclesInLandfillService = async (user_id: number) => {
  try {
    const user = await getUserById(user_id);
    if (!user.landfill_id)
      throw new InvalidAccess("You don't have any assigned Landfill");
    const landfillVehicle = await vehiclesInLandfill(user.landfill_id);
    return landfillVehicle;
  } catch (error) {
    throw error;
  }
};

export const vehicleLeavingLandfillService = async (
  user_id: number,
  landfill_vehicle_id: number
) => {
  try {
    const landfillVehicle = await getLandfillVehicleById(landfill_vehicle_id);
    const user = await getUserById(user_id);

    if (!landfillVehicle)
      throw new ResourceNotFound("Landfill Vehicle", landfill_vehicle_id);
    else if (landfillVehicle.landfill_id !== user.landfill_id)
      throw new InvalidAccess();

    const updatedLandfillVehicle = await vehicleLeavingLandfill(
      landfill_vehicle_id
    );
    return updatedLandfillVehicle;
  } catch (error) {
    throw error;
  }
};

export const weeklyWasteAmountService = async (
  user_id: number,
  permission: string
) => {
  try {
    const user = await getUserById(user_id);
    if (!user.landfill_id)
      throw new InvalidAccess("You don't have any assigned Landfill");

    let weekly_waste_amount = 0;

    if (permission === rolePermissions.READ_LANDFILL_ALL) {
      const landfillVehicles = await getWeeklyWasteAmount();
      landfillVehicles?.forEach((vehicle) => {
        weekly_waste_amount += vehicle.waste_volume;
      });
    }
    if (user.landfill_id) {
      const landfillVehicles = await getWeeklyWasteAmount(user.landfill_id);
      landfillVehicles?.forEach((vehicle) => {
        weekly_waste_amount += vehicle.waste_volume;
      });
    }
    return { weekly_waste_amount };
  } catch (error) {
    throw error;
  }
};

export const vehiclesThatLeftLandfillService = async (
  userId: number,
  permission: string
) => {
  try {
    const user = await getUserById(userId);
    let vehiclesLeftLandfill;
    if (permission === rolePermissions.READ_LANDFILL_ALL)
      vehiclesLeftLandfill = await vehiclesThatLeftLandfill();
    else vehiclesLeftLandfill = await vehiclesThatLeftLandfill(user.sts_id);
    return vehiclesLeftLandfill;
  } catch (error) {
    throw error;
  }
};
