"use client";

import { useFormStatus } from "react-dom";

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mx-2 px-3 py-2 text-white text-xl bg-landfill rounded-lg hover:underline transition-all duration-300"
    >
      {pending ? "Updating" : "Left Landfill"}
    </button>
  );
}

export default function VehicleInLandfill({
  landfill_vehicle,
  leftLandfill,
}: any) {
  return (
    <div className="border-2 border-landfill rounded-lg p-3 my-5">
      <h2 className="text-2xl font-bold">Vechicles in Landfill:</h2>
      {landfill_vehicle.map((vehicle: any) => (
        <form
          action={leftLandfill}
          className="text-landfill text-2xl font-medium my-3"
          key={vehicle.id}
        >
          <input name="id" value={vehicle.id} type="hidden" />
          <span className="mx-2">
            Arrived at:{" "}
            <b>{new Date(vehicle.arrival_time).toLocaleTimeString()}</b>
          </span>{" "}
          | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
          <span className="mx-2">{vehicle.vehicle.driver_name}</span>
          <Button />
        </form>
      ))}
    </div>
  );
}
