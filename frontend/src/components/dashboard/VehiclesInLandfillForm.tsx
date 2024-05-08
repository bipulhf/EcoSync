"use client";

import { leftLandfill } from "@/utils/actions";
import { getTimeFromDate } from "@/utils/timeconvert";
import { useFormState, useFormStatus } from "react-dom";

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="px-3 text-white md:text-xl bg-landfill rounded-lg hover:underline transition-all duration-300"
    >
      {pending ? "Updating" : "Left Landfill"}
    </button>
  );
}

export default function VehicleInLandfillForm({ vehicle }: any) {
  const [state, formAction] = useFormState(leftLandfill, null);

  return (
    <form
      action={formAction}
      className="text-landfill md:text-xl font-medium my-3"
      key={vehicle.id}
    >
      <input name="id" value={vehicle.id} type="hidden" />
      <span className="mx-2">
        Arrived at: <b>{getTimeFromDate(new Date(vehicle.arrival_time))}</b>
      </span>{" "}
      | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
      <span className="mx-2">{vehicle.vehicle.driver_name}</span>
      <Button />
    </form>
  );
}
