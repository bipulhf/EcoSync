import { getJWT } from "@/utils/actions";
import VechiclesInSTSForm from "./VehicleInStsForm";
import { baseURL } from "../../../../files";

const getData = async () => {
  const sts_vehicle = await (
    await fetch(`${baseURL}/sts/vehicle`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return sts_vehicle;
};

export default async function VechiclesInSTS() {
  const sts_vehicle = await getData();
  return (
    <div className="border-2 border-sts_text rounded-lg p-3 my-5 text-center">
      <h2 className="md:text-xl font-bold">Vechicles in STS:</h2>
      {!sts_vehicle.length ? (
        <h2 className="md:text-lg font-medium">No vehicle to show</h2>
      ) : (
        sts_vehicle.map((vehicle: any) => (
          <VechiclesInSTSForm sts_vehicle={vehicle} key={vehicle.id} />
        ))
      )}
    </div>
  );
}
