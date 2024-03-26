import { baseURL } from "../../../../files";
import extractUserInfo from "@/utils/verify";
import { leftLandfill } from "@/utils/actions";
import Link from "next/link";
import VehicleInLandfill from "@/components/dashboard/vehicle_in_landfill";
import VehicleGoingToLandfill from "@/components/dashboard/vehicle_going_to_landfill";
import TotalWasteStoredThisWeek from "@/components/dashboard/total_waste_stored_landfill";

const getData = async () => {
  const { id } = await extractUserInfo();
  const { capacity } = await (
    await fetch(`${baseURL}/landfill/${id}/week-waste`, { cache: "no-cache" })
  ).json();
  const sts_vehicle = await (
    await fetch(`${baseURL}/landfill/${id}/vehicle`, { cache: "no-cache" })
  ).json();
  const landfill_vehicle = await (
    await fetch(`${baseURL}/sts/vehicle`, { cache: "no-cache" })
  ).json();

  return { capacity, sts_vehicle, landfill_vehicle };
};

export default async function StsManager() {
  const { capacity, sts_vehicle, landfill_vehicle } = await getData();

  return (
    <div className="w-full flex flex-col items-center text-center">
      <TotalWasteStoredThisWeek capacity={capacity} />
      <div className="my-5">
        <Link href={"/landfill-manager/entry-vehicle"}>
          <button className="bg-landfill text-white px-4 py-2 rounded-lg font-bold text-2xl hover:underline transition-all duration-300">
            Entry Vehicle
          </button>
        </Link>
      </div>
      <VehicleInLandfill
        landfill_vehicle={landfill_vehicle}
        leftLandfill={leftLandfill}
      />
      <VehicleGoingToLandfill landfill_vehicle={sts_vehicle} />
    </div>
  );
}

export const fetchCache = "force-no-store";
