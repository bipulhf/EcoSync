import { getJWT } from "@/utils/actions";
import { baseURL } from "../../../../../files";
import extractUserInfo from "@/utils/verify";
import Link from "next/link";
import { MonitorOutlined } from "@ant-design/icons";
import ContractorMonitorTable from "./ContractorMonitorTable";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/contractor-monitor`, {
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function ContractorMonitorPage() {
  const data = await getData();
  const { permissions } = await extractUserInfo();
  return (
    <>
      <div className="w-[95%] lg:w-[90%] mx-auto py-10">
        <div className="flex justify-between">
          <h2 className="text-admin text-lg md:text-2xl font-bold mb-10">
            <MonitorOutlined /> Waste Transported by Contractors :{" "}
          </h2>
          {permissions.includes("READ_CONTRACTOR_MONITOR") && (
            <Link href={"/contractors/monitor/create"}>
              <button className="px-5 py-2 bg-admin text-white rounded-lg hover:underline font-semibold">
                <MonitorOutlined /> Add Report
              </button>
            </Link>
          )}
        </div>
        <div>
          <ContractorMonitorTable contractor_monitor={data} />
        </div>
      </div>
    </>
  );
}
