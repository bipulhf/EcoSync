import { baseURL } from "../../../../files";
import VehicleGoingToLandfill from "@/components/dashboard/vehicle_going_to_landfill";
import VehiclesComingFromLandfill from "@/components/dashboard/VehiclesComingFromLandfill";
import TotalWasteStoredThisWeek from "@/components/dashboard/total_waste_stored_landfill";
import STSList from "./_components/sts_list";
import { cookies } from "next/headers";
import MultipleLocation from "./_components/multiple_location";
import extractUserInfo from "@/utils/verify";
import UserHeader from "@/components/dashboard/UserHeader";
import UserFooter from "@/components/dashboard/UserFooter";
import UserContent from "@/components/dashboard/UserContent";
const getData = async () => {
  const vehicle_going_to_landfill = await (
    await fetch(`${baseURL}/sts/left`, {
      cache: "no-store",
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();
  const vehicle_coming_from_landfill = await (
    await fetch(`${baseURL}/landfill/left`, {
      cache: "no-store",
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();
  const sts = await (
    await fetch(`${baseURL}/sts`, {
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();
  const { weekly_waste_amount } = await (
    await fetch(`${baseURL}/landfill/weekly-waste`, {
      cache: "no-store",
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();

  return {
    vehicle_going_to_landfill,
    vehicle_coming_from_landfill,
    sts,
    weekly_waste_amount,
  };
};

export default async function Admin() {
  // const {
  //   vehicle_going_to_landfill,
  //   vehicle_coming_from_landfill,
  //   sts,
  //   weekly_waste_amount,
  // } = await getData();
  return (
    <>
      <UserContent />
    </>
  );
}

/*
<div className="pb-10 mt-5 mx-10">
      <Buttons />
      <MultipleLocation sts={sts} />
      <div className="flex">
        <div className="w-[50%] mr-5 text-center">
          <TotalWasteStoredThisWeek capacity={weekly_waste_amount} />
          <VehicleGoingToLandfill
            landfill_vehicle={vehicle_going_to_landfill}
          />
          <VehicleComingFromLandfill
            landfill_vehicle={vehicle_coming_from_landfill}
          />
        </div>
        <div className="w-[50%] mr-5 border-2 border-admin rounded-lg mt-10 text-admin">
          <STSList sts={sts} />
        </div>
      </div>
    </div>
  */
