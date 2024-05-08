import extractUserInfo from "@/utils/verify";
import { baseURL } from "../../../../../files";
import Link from "next/link";
import { getJWT } from "@/utils/actions";

const getData = async () => {
  const sts = await (
    await fetch(`${baseURL}/fleet`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return sts;
};

export default async function Fleet() {
  const sts = await getData();
  return (
    <div className="py-10 w-[95%] mx-auto">
      <h1 className="text-4xl text-sts_text text-center mb-5 font-bold">
        List for Fleet Optimization
      </h1>
      <table className="text-2xl text-center border-2 border-sts_text border-solid w-full mx-auto">
        <thead>
          <tr>
            <th className="px-5 pb-2 border-2 border-sts_text">
              Vehicle Number
            </th>
            <th className="px-5 pb-2 border-2 border-sts_text">Type</th>
            <th className="px-5 pb-2 border-2 border-sts_text">Capacity</th>
            <th className="px-5 pb-2 border-2 border-sts_text">Driver Name</th>
            <th className="px-5 pb-2 border-2 border-sts_text">
              Driver Mobile
            </th>
            <th className="px-5 pb-2 border-2 border-sts_text">
              Trip Remaining
            </th>
            <th className="px-5 pb-2 border-2 border-sts_text">
              Waste Transport
            </th>
            <th className="px-5 pb-2 border-2 border-sts_text">Cost Per KM</th>
            <th className="px-5 pb-2 border-2 border-sts_text">Free?</th>
          </tr>
        </thead>
        <tbody>
          {sts.map((vehicle: any) => (
            <tr key={vehicle.vehicle_number}>
              <td className="px-5 pb-2 border-2 border-sts_text">
                <Link
                  href={`/sts/entry_vehicle?vehicle_number=${vehicle.vehicle_number}`}
                >
                  {vehicle.vehicle_number}
                </Link>
              </td>
              <td className="px-5 pb-2 border-2 border-sts_text">
                {vehicle.type.toUpperCase()}
              </td>
              <td className="px-5 pb-2 border-2 border-sts_text">
                {vehicle.capacity} Tons
              </td>
              <td className="px-5 pb-2 border-2 border-sts_text">
                {vehicle.driver_name}
              </td>
              <td className="px-5 pb-2 border-2 border-sts_text">
                {vehicle.driver_mobile}
              </td>
              <td className="px-5 pb-2 border-2 border-sts_text">
                {vehicle.trip}
              </td>
              <td className="px-5 pb-2 border-2 border-sts_text">
                {`${vehicle.capacity} x ${vehicle.trip} = `}
                <span className="font-bold">
                  {vehicle.capacity * vehicle.trip} tons
                </span>
              </td>
              <td className="px-5 pb-2 border-2 border-sts_text font-semibold">
                {vehicle.cost_loaded} ltr
              </td>
              <td className="px-5 pb-2 border-2 border-sts_text">
                {vehicle.travelling ? "No" : "Yes"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
