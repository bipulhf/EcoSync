import Link from "next/link";
import { baseURL } from "../../../../../files";
import { getJWT } from "@/utils/actions";
import GetDirection from "@/components/dashboard/GetDirection";
import ManagerModal from "@/components/dashboard/ManagerModal";
import VehicleModal from "@/components/dashboard/VehicleModal";

const getData = async (id: string) => {
  const data = await (
    await fetch(`${baseURL}/sts/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();

  return data;
};

export default async function StsProfile({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  return (
    <>
      <div className="px-10 pt-10 text-xl text-admin flex items-center justify-between flex-col max-xl:text-center xl:flex-row">
        <div className="text-xl flex flex-col gap-2 text-admin mb-5">
          <h1 className={`font-bold italic mb-6`}>STS Information</h1>
          <h2 className="font-semibold">STS ID : {data.id}</h2>
          <h2>Ward No : {data.ward}</h2>
          <h2 className="font-semibold">STS Capacity : {data.capacity} Tons</h2>
          <h2>Landfill ID : {data.landfill_id}</h2>
          <h2>City Corporation : {data.landfill.city_corporation}</h2>
          <div className="flex flex-col md:flex-row gap-5 md:justify-between mt-5">
            <VehicleModal vehicles={data.vehicle} />
            <ManagerModal managers={data.manager} />
          </div>
        </div>
        <GetDirection sts={data} />
      </div>
    </>
  );
}

export const fetchCache = "force-no-store";
