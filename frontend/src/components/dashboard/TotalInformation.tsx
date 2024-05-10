import { getJWT } from "@/utils/actions";
import { baseURL } from "../../../files";
import { Card } from "antd";

const getData = async () => {
  const all_information = await (
    await fetch(`${baseURL}/all-info`, {
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return all_information;
};

export default async function TotalInformation() {
  const data = await getData();
  return (
    <div className="flex flex-wrap justify-evenly gap-5">
      <Card title="System Information" bordered={false} style={{ width: 300 }}>
        <p className="md:text-xl font-semibold">Total Users: {data.users}</p>
        <p className="md:text-lg font-semibold">Total STS: {data.sts.value}</p>
        <p>Total STS Managers: {data.sts.managers}</p>
        <p className="md:text-lg font-semibold">
          Total Landfill: {data.landfill.value}
        </p>
        <p>Total Landfill Managers: {data.landfill.managers}</p>
      </Card>
      <Card
        title="Vehicles Information"
        bordered={false}
        style={{ width: 300 }}
      >
        <p className="md:text-xl font-semibold">
          Total Vehicles: {data.vehicles.value}
        </p>
        {Object.keys(data.vehicles.type).map((type: any) => (
          <p key={type}>
            {type.toUpperCase()}: {data.vehicles.type[type]}
          </p>
        ))}
        <p className="md:text-xl font-semibold">
          Total Capacity: {data.total_capacity} Tons
        </p>
      </Card>
    </div>
  );
}
