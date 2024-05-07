import extractUserInfo from "@/utils/verify";
import VehicleTable from "./VehicleTable";
import { Link } from "lucide-react";
import { CarOutlined } from "@ant-design/icons";

export default async function VehiclesPage() {
  const { permissions } = await extractUserInfo();

  return (
    <div className="w-[95%] lg:w-[90%] mx-auto py-10">
      <div className="flex justify-between flex-row-reverse">
        {permissions.includes("CREATE_VEHICLE") && (
          <Link href={"/vehicle/create"}>
            <button className="px-5 py-2 bg-admin text-white rounded-lg hover:underline font-semibold">
              <CarOutlined /> Add Vehicle
            </button>
          </Link>
        )}
        <h2 className="text-admin text-2xl font-bold mb-10">
          <CarOutlined /> Vehicle List:{" "}
        </h2>
      </div>
      <div>{/* <VehicleTable /> */}</div>
    </div>
  );
}
