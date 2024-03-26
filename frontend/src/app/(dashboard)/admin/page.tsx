import extractUserInfo from "@/utils/verify";
import Buttons from "./_components/buttons";
import { baseURL } from "../../../../files";
import VehicleGoingToLandfill from "@/components/dashboard/vehicle_going_to_landfill";
import VehicleComingFromLandfill from "@/components/dashboard/vehicle_coming_from_landfill";
import TotalWasteStoredThisWeek from "@/components/dashboard/total_waste_stored_landfill";
import STSList from "./_components/sts_list";

const getData = async () => {
  const { id } = await extractUserInfo();
  const sts_vehicle = await (
    await fetch(`${baseURL}/landfill/${id}/vehicle`, { cache: "no-store" })
  ).json();
  const landfill_vehicle = await (
    await fetch(`${baseURL}/sts/vehicle`, { cache: "no-store" })
  ).json();
  const sts = await (await fetch(`${baseURL}/sts`)).json();

  return { sts_vehicle, landfill_vehicle, sts };
};

export default async function Admin() {
  const { sts_vehicle, landfill_vehicle, sts } = await getData();

  return (
    <div className="pb-10 mt-5 mx-10">
      <Buttons />
      <div className="flex">
        <div className="w-[50%] mr-5 text-center">
          <TotalWasteStoredThisWeek capacity={0} />
          <VehicleGoingToLandfill landfill_vehicle={sts_vehicle} />
          <VehicleComingFromLandfill landfill_vehicle={landfill_vehicle} />
        </div>
        <div className="w-[50%] mr-5 border-2 border-admin rounded-lg mt-10 text-admin">
          <STSList sts={sts} />
        </div>
      </div>
    </div>
  );
}

export const fetchCache = "force-no-store";
