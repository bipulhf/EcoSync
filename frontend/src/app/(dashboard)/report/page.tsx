import ReportTable from "@/components/tables/ReportTable";
import { baseURL } from "../../../../files";
import { getJWT } from "@/utils/actions";

const getData = async () => {
  const sts = await (
    await fetch(`${baseURL}/sts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();

  const vehicle = await (
    await fetch(`${baseURL}/vehicle`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();

  const sts_id_list = sts.map((sts: any) => ({ text: sts.id, value: sts.id }));
  const vehicle_number_list = vehicle.map((vehicle: any) => ({
    text: vehicle.vehicle_number,
    value: vehicle.vehicle_number,
  }));

  return { sts_id_list, vehicle_number_list };
};

export default async function Report() {
  const { sts_id_list, vehicle_number_list } = await getData();
  return (
    <div className="py-10 w-[95%] mx-auto text-center">
      <ReportTable
        sts_id_list={sts_id_list}
        vehicle_number_list={vehicle_number_list}
      />
    </div>
  );
}
