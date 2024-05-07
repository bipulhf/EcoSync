import { getTimeFromDate } from "@/utils/timeconvert";
import { baseURL } from "../../../files";
import { getJWT } from "@/utils/actions";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/sts/left`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function VehiclesGoingToLandfill() {
  let landfill_vehicle: any[] = await getData();
  return (
    <div className="border-2 border-landfill rounded-lg p-3 my-5 bg-landfill_bg text-center">
      <h2 className="md:text-xl font-bold">Vechicles Going to Landfill:</h2>
      {landfill_vehicle.length === 0 ? (
        <h2 className="md:text-lg font-medium">No vehicle to show</h2>
      ) : (
        landfill_vehicle.map((vehicle: any) => (
          <div
            className="text-landfill md:text-xl font-medium my-3"
            key={vehicle.id}
          >
            <span className="mx-2">
              Left at:{" "}
              <b>{getTimeFromDate(new Date(vehicle.departure_time))}</b>
            </span>{" "}
            | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
            <span className="mx-2">{vehicle.vehicle.driver_name}</span> |{" "}
            <span className="mx-2 font-bold">
              {vehicle.vehicle.driver_mobile}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
