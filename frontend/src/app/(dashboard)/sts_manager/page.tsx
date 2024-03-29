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
    <div className="w-full flex flex-col items-center text-center">
      <div className="mt-10 mb-5">
        <h2 className="text-2xl">Total Capacity:</h2>
        <h2 className="text-4xl text-sts_text font-bold">
          {sts.capacity} Tons
        </h2>
      </div>
      <div className="my-5">
        <Link href={"/sts_manager/entry_vehicle"}>
          <button className="bg-sts_text text-white px-4 py-2 rounded-lg font-bold text-2xl hover:bg-sts_primary transition-all duration-300">
            Entry Vehicle
          </button>
        </Link>
      </div>
      <VechiclesInSTS sts_vehicle={sts_vehicle} leftSTS={leftSTS} />
      <VehicleComingFromLandfill landfill_vehicle={landfill_vehicle} />
    </div>
  );
}

export const fetchCache = "force-no-store";
