import Link from "next/link";
import { baseURL } from "../../../../files";
import { getJWT } from "@/utils/actions";
import extractUserInfo from "@/utils/verify";
import { FileAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import WorkforceTable from "@/components/tables/WorkforceTable";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/workforce`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function Workforces() {
  const workforces = await getData();
  console.log(workforces);
  const { permissions } = await extractUserInfo();
  return (
    <div className="w-[95%] lg:w-[80%] mx-auto py-10">
      <div className="flex justify-between flex-row-reverse">
        {(permissions.includes("READ_WORKFORCE_SELF") ||
          permissions.includes("READ_WORKFORCE_ALL")) && (
          <Link href={"/workforces/create"}>
            <button className="px-5 py-2 bg-admin text-white rounded-lg hover:underline font-semibold">
              <UsergroupAddOutlined /> Add Workforce
            </button>
          </Link>
        )}
        <h2 className="text-admin text-2xl font-bold mb-10">
          <UsergroupAddOutlined /> Workforce List:{" "}
        </h2>
      </div>
      <div className="flex gap-4 flex-wrap max-md:justify-center">
        <WorkforceTable workforce={workforces} />
      </div>
    </div>
  );
}
