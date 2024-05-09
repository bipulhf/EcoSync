import extractUserInfo from "@/utils/verify";
import VehicleTable from "./VehicleTable";
import { CarOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getJWT } from "@/utils/actions";
import { baseURL } from "../../../../files";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/vehicle`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function VehiclesPage() {
  const data = await getData();
  const { permissions } = await extractUserInfo();
  console.log(data);
  return (
    <div className="w-[95%] lg:w-[90%] mx-auto py-10">
      <div className="flex justify-between flex-row-reverse">
        {permissions.includes("CREATE_VEHICLE") && (
          <Link href={"/vehicles/create"}>
            <button className="px-5 py-2 bg-admin text-white rounded-lg hover:underline font-semibold">
              <CarOutlined /> Add Vehicle
            </button>
          </Link>
        )}
        <h2 className="text-admin text-lg md:text-2xl font-bold mb-10">
          <CarOutlined /> Vehicle List:{" "}
        </h2>
      </div>
      <div>
        <VehicleTable vehicles={data} />
      </div>
    </div>
  );
}
