"use client";

import { addVehicleLandfill } from "@/utils/actions";
import { getTimeFromDate } from "@/utils/timeconvert";
import { useFormState, useFormStatus } from "react-dom";

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="px-3 text-white md:text-xl bg-landfill rounded-lg hover:underline transition-all duration-300"
    >
      {pending ? "Updating" : "Entry Landfill"}
    </button>
  );
}

export default function VehiclesGoingToLandfillForm({
  permissions,
  vehicle,
}: any) {
  const [state, formAction] = useFormState(addVehicleLandfill, null);
  return (
    <form
      action={formAction}
      className="text-landfill md:text-xl font-medium my-3"
      key={vehicle.id}
    >
      <span className="mx-2">
        Left at:{" "}
        <b>{getTimeFromDate(new Date(vehicle.sts_vehicle.departure_time))}</b>
      </span>{" "}
      | <span className="mx-2">{vehicle.vehicle_number}</span> |{" "}
      <span className="mx-2">{vehicle.vehicle.driver_name}</span> |{" "}
      <span className="mx-2 font-bold">{vehicle.vehicle.driver_mobile}</span>
      <input
        name="vehicle_number"
        value={vehicle.vehicle_number}
        type="hidden"
      />
      <input type="hidden" name="waste_volume" value={vehicle.waste_volume} />
      {permissions.includes("LANDFILL_VEHICLE_UPDATE") && <Button />}
    </form>
  );
}
