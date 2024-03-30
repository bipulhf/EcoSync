import { baseURL } from "../../../../files";
import extractUserInfo from "@/utils/verify";
import { leftSTS } from "@/utils/actions";
import Link from "next/link";
import VehicleComingFromLandfill from "@/components/dashboard/vehicle_coming_from_landfill";
import VechiclesInSTS from "@/components/dashboard/vehicle_in_sts";
import { cookies } from "next/headers";

const getData = async () => {
  const { id } = await extractUserInfo();

  const sts = await (
    await fetch(`${baseURL}/sts?managerId=${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();

  const sts_vehicle = await (
    await fetch(`${baseURL}/sts/vehicle`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();

  const landfill_vehicle = await (
    await fetch(`${baseURL}/landfill/left`, {
      cache: "no-store",
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();

  return { sts, sts_vehicle, landfill_vehicle };
};

export default async function StsManager() {
  const { sts, sts_vehicle, landfill_vehicle } = await getData();

  return (
    <div className="w-full flex flex-col items-center text-center text-sts_text">
      <div className="mt-10 mb-5">
        <h2 className="text-2xl">Total Capacity:</h2>
        <h2 className="text-4xl text-sts_text font-bold">
          {sts.capacity} Tons
        </h2>
      </div>
      <div className="my-5">
        <Link href={"/sts_manager/entry_vehicle"}>
          <button className="mr-10 bg-sts_text text-white px-4 py-2 rounded-lg font-bold text-2xl hover:bg-sts_primary transition-all duration-300">
            Entry Vehicle
          </button>
        </Link>
        <Link href={"/sts_manager/fleet"}>
          <button className="bg-unassigned text-white px-4 py-2 rounded-lg font-bold text-2xl hover:bg-sts_primary transition-all duration-300">
            Fleet Vehicle List
          </button>
        </Link>
      </div>
      <div className="flex justify-between w-[85%] mt-5">
        <div>
          <VechiclesInSTS sts_vehicle={sts_vehicle} leftSTS={leftSTS} />
          <VehicleComingFromLandfill landfill_vehicle={landfill_vehicle} />
        </div>
        <div className="ml-10">
          {sts.vehicle.length === 0 ? (
            <h2 className="text-xl font-medium">No vehicle to show</h2>
          ) : (
            <table className="text-2xl text-center border border-sts_text border-solid">
              <thead>
                <tr>
                  <th className="px-5 pb-2 border border-sts_text">
                    Vehicle Number
                  </th>
                  <th className="px-5 pb-2 border border-sts_text">Type</th>
                  <th className="px-5 pb-2 border border-sts_text">Capacity</th>
                  <th className="px-5 pb-2 border border-sts_text">
                    Driver Name
                  </th>
                  <th className="px-5 pb-2 border border-sts_text">
                    Driver Mobile
                  </th>
                </tr>
              </thead>
              <tbody>
                {sts.vehicle.map((vehicle: any) => (
                  <tr key={vehicle.vehicle_number}>
                    <td className="px-5 pb-2 border border-sts_text">
                      {vehicle.vehicle_number}
                    </td>
                    <td className="px-5 pb-2 border border-sts_text">
                      {vehicle.type.toUpperCase()}
                    </td>
                    <td className="px-5 pb-2 border border-sts_text">
                      {vehicle.capacity} Tons
                    </td>
                    <td className="px-5 pb-2 border border-sts_text">
                      {vehicle.driver_name}
                    </td>
                    <td className="px-5 pb-2 border border-sts_text">
                      {vehicle.driver_mobile}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export const fetchCache = "force-no-store";
