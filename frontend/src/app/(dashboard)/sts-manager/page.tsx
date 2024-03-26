import { baseURL } from "../../../../files";
import extractUserInfo from "@/utils/verify";
import { leftSTS } from "@/utils/actions";
import Link from "next/link";
import VehicleComingFromLandfill from "@/components/dashboard/vehicle_coming_from_landfill";
import VechiclesInSTS from "@/components/dashboard/vehicle_in_sts";

const getData = async () => {
  const { id } = await extractUserInfo();
  const { capacity } = await (
    await fetch(`${baseURL}/sts/${id}`, { cache: "no-cache" })
  ).json();
  const sts_vehicle = await (
    await fetch(`${baseURL}/sts/${id}/vehicle`, { cache: "no-cache" })
  ).json();
  const landfill_vehicle = await (
    await fetch(`${baseURL}/landfill/vehicle`, { cache: "no-cache" })
  ).json();

  return { capacity, sts_vehicle, landfill_vehicle };
};

export default async function StsManager() {
  const { capacity, sts_vehicle, landfill_vehicle } = await getData();

  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="mt-10 mb-5">
        <h2 className="text-2xl">Total Capacity:</h2>
        <h2 className="text-4xl text-sts_text font-bold">{capacity} Tons</h2>
      </div>
      <div className="my-5">
        <Link href={"/sts-manager/entry-vehicle"}>
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
