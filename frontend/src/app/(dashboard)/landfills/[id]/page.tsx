import { baseURL } from "../../../../../files";
import { getJWT } from "@/utils/actions";
import MultipleLocation from "@/components/dashboard/maps/MultipleLocation";
import StsModal from "@/components/tables/StsModal";
import ManagerModal from "@/components/dashboard/modals/ManagerModal";

const getData = async (id: string) => {
  const data = await (
    await fetch(`${baseURL}/landfill/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();

  return data;
};

export default async function LandfillProfile({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  return (
    <>
      <div className="px-10 pt-10 text-xl text-admin flex items-center justify-between flex-col max-xl:text-center xl:flex-row">
        <div className="text-xl flex flex-col gap-2 text-admin mb-5">
          <h1 className={`font-bold italic mb-6`}>Landfill Information</h1>
          <h2 className="font-semibold">Landfill ID : {data.id}</h2>
          <h2>City Corporation : {data.city_corporation}</h2>
          <h2>
            Starting Time : {new Date(data.start_time).toLocaleTimeString()}
          </h2>
          <h2>Closing Time : {new Date(data.end_time).toLocaleTimeString()}</h2>
          <div className="flex flex-col md:flex-row gap-5 md:justify-between mt-5">
            <StsModal sts={data.sts} />
            <ManagerModal managers={data.manager} />
          </div>
        </div>
        <MultipleLocation sts={data.sts} />
      </div>
    </>
  );
}

export const fetchCache = "force-no-store";
