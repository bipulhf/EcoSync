import { getJWT } from "@/utils/actions";
import { baseURL } from "../../../../../files";
import WorkforceMonitorSingleTable from "./WorkforceMonitorSingleTable";

const getData = async (id: string) => {
  const data = await (
    await fetch(`${baseURL}/workforce-monitor/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  return (
    <div className="w-[95%] lg:w-[90%] mx-auto py-10">
      <WorkforceMonitorSingleTable workforce_monitor={data} />
    </div>
  );
}

export const fetchCache = "force-no-store";
