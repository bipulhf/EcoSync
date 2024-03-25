import { baseURL } from "../../../../files";
import extractUserInfo from "@/utils/verify";
import { leftSTS } from "@/utils/actions";
import Link from "next/link";

const getData = async () => {
  const { id } = await extractUserInfo();
  const { capacity } = await (
    await fetch(`${baseURL}/sts/${id}`, { cache: "no-cache" })
  ).json();
  const sts_vehicle = await (
    await fetch(`${baseURL}/sts/${id}/vehicle`, { cache: "no-cache" })
  ).json();
  const landfill_vehicle = await (
    await fetch(`${baseURL}/landfill/vehicle`, { cache: "no-cache" })
  ).json();

  return { capacity, sts_vehicle, landfill_vehicle };
};

export default async function StsManager() {
  const { capacity, sts_vehicle, landfill_vehicle } = await getData();

  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="mt-10 mb-5">
        <h2 className="text-2xl">Total Capacity:</h2>
        <h2 className="text-4xl text-sts_text font-bold">{capacity} Tons</h2>
      </div>
      <div className="my-5">
        <Link href={"/sts-manager/entry-vehicle"}>
          <button className="bg-sts_text text-white px-4 py-2 rounded-lg font-bold text-2xl hover:bg-sts_primary transition-all duration-300">
            Entry Vehicle
          </button>
        </Link>
      </div>
      <div className="border-2 border-sts_text rounded-lg p-3 my-5">
        <h2 className="text-2xl">Vechicles in STS:</h2>
        {sts_vehicle.map((vehicle: any) => (
          <form
            action={leftSTS}
            className="text-sts_text text-2xl font-medium my-3"
            key={vehicle.id}
          >
            <input name="id" value={vehicle.id} type="hidden" />
            <span className="mx-2">
              Arrived at: <b>{vehicle.arrival_time}</b>
            </span>{" "}
            | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
            <span className="mx-2">{vehicle.vehicle.driver_name}</span>
            <button
              type="submit"
              className="mx-2 px-3 py-2 text-white text-xl bg-sts_text rounded-lg hover:bg-sts_primary transition-all duration-300"
            >
              Left STS
            </button>
          </form>
        ))}
      </div>
      <div className="border-2 border-sts_text rounded-lg p-3 my-5">
        <h2 className="text-2xl">Vechicles coming from landfill:</h2>
        {landfill_vehicle.map((vehicle: any) => (
          <div
            className="text-sts_text text-2xl font-medium my-3"
            key={vehicle.id}
          >
            <span className="mx-2">
              Left at: <b>{vehicle.departure_time}</b>
            </span>{" "}
            | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
            <span className="mx-2">{vehicle.vehicle.driver_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
