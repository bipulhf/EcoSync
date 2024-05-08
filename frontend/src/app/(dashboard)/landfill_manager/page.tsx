import { baseURL } from "../../../../files";
import extractUserInfo from "@/utils/verify";
import { leftLandfill } from "@/utils/actions";
import Link from "next/link";
import VehicleInLandfill from "@/components/dashboard/VehiclesInLandfill";
import VehicleGoingToLandfill from "@/components/dashboard/vehicle_going_to_landfill";
import TotalWasteStoredThisWeek from "@/components/dashboard/total_waste_stored_landfill";
import { cookies } from "next/headers";
import UserContent from "@/components/dashboard/UserContent";
import UserFooter from "@/components/dashboard/UserFooter";
import UserHeader from "@/components/dashboard/UserHeader";

const getData = async () => {
  const { weekly_waste_amount } = await (
    await fetch(`${baseURL}/landfill/weekly-waste`, {
      cache: "no-store",
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();

  const sts_vehicle = await (
    await fetch(`${baseURL}/sts/left`, {
      cache: "no-store",
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();

  const landfill_vehicle = await (
    await fetch(`${baseURL}/landfill/vehicle`, {
      cache: "no-store",
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();

  return { capacity: weekly_waste_amount, sts_vehicle, landfill_vehicle };
};

export default async function StsManager() {
  // const { capacity, sts_vehicle, landfill_vehicle } = await getData();

  return (
    <>
      <UserContent />
    </>
  );
}

export const fetchCache = "force-no-store";

// <div className="w-full flex flex-col items-center text-center">
//   <TotalWasteStoredThisWeek capacity={capacity} />
//   <div className="my-5">
//     <Link href={"/landfill_manager/entry_vehicle"}>
//       <button className="bg-landfill text-white px-4 py-2 rounded-lg font-bold text-2xl hover:underline transition-all duration-300">
//         Entry Vehicle
//       </button>
//     </Link>
//   </div>
//   <VehicleInLandfill
//     landfill_vehicle={landfill_vehicle}
//     leftLandfill={leftLandfill}
//   />
//   <VehicleGoingToLandfill landfill_vehicle={sts_vehicle} />
// </div>
