import { getJWT } from "@/utils/actions";
import { getTimeFromDate } from "@/utils/timeconvert";
import { baseURL } from "../../../../files";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/landfill/left`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function VehiclesComingFromLandfill() {
  let landfill_vehicle: any[] = await getData();

  return (
    <div className="border-2 border-sts_text rounded-lg p-3 my-5 bg-sts_bg text-center">
      <h2 className="md:text-xl font-bold">Vechicles coming from landfill:</h2>
      {landfill_vehicle.length === 0 ? (
        <h2 className="md:text-lg font-medium">No vehicle to show</h2>
      ) : (
        landfill_vehicle.map((vehicle: any) => (
          <div
            className="text-sts_text md:text-xl font-medium my-3"
            key={vehicle.id}
          >
            <span className="mx-2">
              Left at:{" "}
              <b>{getTimeFromDate(new Date(vehicle.departure_time))}</b>
            </span>{" "}
            | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
            <span className="mx-2">{vehicle.vehicle.driver_name}</span>|{" "}
            <span className="mx-2 font-bold">
              {vehicle.vehicle.driver_mobile}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
