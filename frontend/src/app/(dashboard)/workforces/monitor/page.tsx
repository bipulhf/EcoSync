import { getJWT } from "@/utils/actions";
import { baseURL } from "../../../../../files";
import extractUserInfo from "@/utils/verify";
import Link from "next/link";
import { MonitorOutlined } from "@ant-design/icons";
import ContractorMonitorTable from "./WorkforceMonitorTable";
import WorkforceEntryModal from "@/components/dashboard/modals/WorkforceEntryModal";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/workforce-monitor`, {
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();

  const workforce = await (
    await fetch(`${baseURL}/workforce`, {
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return { data, workforce };
};

export default async function WorkforceMonitorPage() {
  const { data, workforce } = await getData();
  let workforce_contractor = workforce.map((single_workforce: any) => ({
    workforce_id: single_workforce.workforce_id,
    contractor_id: single_workforce.contractor_id,
    name: single_workforce.workforce.full_name,
  }));
  const { permissions } = await extractUserInfo();
  return (
    <>
      <div className="w-[95%] lg:w-[90%] mx-auto py-10">
        <div className="flex justify-between">
          <h2 className="text-admin text-lg md:text-2xl font-bold mb-10">
            <MonitorOutlined /> Waste Transported by Workforces :{" "}
          </h2>
          {permissions.includes("READ_WORKFORCE_MONITOR") && (
            <WorkforceEntryModal workforce_contractor={workforce_contractor} />
          )}
        </div>
        <div>
          <ContractorMonitorTable contractor_monitor={data} />
        </div>
      </div>
    </>
  );
}
