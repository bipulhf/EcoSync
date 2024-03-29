import { getTimeFromDate } from "@/utils/timeconvert";

export default function VehicleComingFromLandfill({ landfill_vehicle }: any) {
  return (
    <div className="border-2 border-sts_text rounded-lg p-3 my-5 bg-sts_bg">
      <h2 className="text-2xl font-bold">Vechicles coming from landfill:</h2>
      {landfill_vehicle.map((vehicle: any) => (
        <div
          className="text-sts_text text-2xl font-medium my-3"
          key={vehicle.id}
        >
          <span className="mx-2">
            Left at: <b>{getTimeFromDate(new Date(vehicle.departure_time))}</b>
          </span>{" "}
          | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
          <span className="mx-2">{vehicle.vehicle.driver_name}</span>|{" "}
          <span className="mx-2 font-bold">
            {vehicle.vehicle.driver_mobile}
          </span>
        </div>
      ))}
      {landfill_vehicle.length === 0 && (
        <h2 className="text-xl font-medium">No vehicle to show</h2>
      )}
    </div>
  );
}
