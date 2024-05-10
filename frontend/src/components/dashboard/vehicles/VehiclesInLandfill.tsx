import { getJWT } from "@/utils/actions";
import VehicleInLandfillForm from "./VehiclesInLandfillForm";
import { baseURL } from "../../../../files";

const getData = async () => {
  const landfill_vehicle = await (
    await fetch(`${baseURL}/landfill/vehicle`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return landfill_vehicle;
};

export default async function VehicleInLandfill() {
  const landfill_vehicle = await getData();
  return (
    <div className="border-2 border-landfill rounded-lg p-3 my-5 text-center">
      <h2 className="md:text-xl font-bold">Vechicles in Landfill:</h2>
      {!landfill_vehicle.length ? (
        <h2 className="md:text-lg font-medium">No vehicle to show</h2>
      ) : (
        landfill_vehicle.map((vehicle: any) => (
          <VehicleInLandfillForm vehicle={vehicle} key={vehicle.id} />
        ))
      )}
    </div>
  );
}
