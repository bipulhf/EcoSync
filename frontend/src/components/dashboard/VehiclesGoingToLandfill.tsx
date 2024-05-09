import { baseURL } from "../../../files";
import { getJWT } from "@/utils/actions";
import VehiclesGoingToLandfillForm from "./VehiclesGoingToLandfillForm";

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

export default async function VehiclesGoingToLandfill({ permissions }: any) {
  let landfill_vehicle: any[] = await getData();

  return (
    <div className="border-2 border-landfill rounded-lg p-3 my-5 bg-landfill_bg text-center">
      <h2 className="md:text-xl font-bold">Vechicles Going to Landfill:</h2>
      {landfill_vehicle.length === 0 ? (
        <h2 className="md:text-lg font-medium">No vehicle to show</h2>
      ) : (
        landfill_vehicle.map((vehicle: any) => (
          <VehiclesGoingToLandfillForm
            permissions={permissions}
            vehicle={vehicle}
            key={vehicle.id}
          />
        ))
      )}
    </div>
  );
}
