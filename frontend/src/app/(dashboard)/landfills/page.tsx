import Link from "next/link";
import { baseURL } from "../../../../files";
import { getJWT } from "@/utils/actions";
import extractUserInfo from "@/utils/verify";
import { HeatMapOutlined } from "@ant-design/icons";
import LandfillCard from "./LandfillCard";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/landfill`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function Sts() {
  const landfill = await getData();
  const { permissions } = await extractUserInfo();

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto py-10">
      <div className="flex justify-between flex-row-reverse">
        {permissions.includes("CREATE_LANDFILL") && (
          <Link href={"/landfills/create"}>
            <button className="px-5 py-2 bg-admin text-white rounded-lg hover:underline font-semibold">
              <HeatMapOutlined /> Add Landfill
            </button>
          </Link>
        )}
        <h2 className="text-admin text-2xl font-bold mb-10">
          <HeatMapOutlined /> Landfill List:{" "}
        </h2>
      </div>
      <div className="flex gap-4 flex-wrap max-md:justify-center">
        {landfill.length ? (
          landfill.map((user: any) => (
            <Link
              href={`/landfills/${user.id}`}
              key={user.id}
              className="w-[20%]"
            >
              <LandfillCard landfill={user} />
            </Link>
          ))
        ) : (
          <h2>No Landfill Found</h2>
        )}
      </div>
    </div>
  );
}
