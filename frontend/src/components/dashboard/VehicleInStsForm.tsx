"use client";

import { leftSTS } from "@/utils/actions";
import { getTimeFromDate } from "@/utils/timeconvert";
import { useFormState, useFormStatus } from "react-dom";

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="px-3 text-white md:text-xl bg-sts_text rounded-lg hover:bg-sts_primary transition-all duration-300"
    >
      {pending ? "Updating" : "Left STS"}
    </button>
  );
}

export default function VechiclesInSTSForm({ sts_vehicle }: any) {
  const [state, formAction] = useFormState(leftSTS, null);
  return (
    <form
      action={formAction}
      className="text-sts_text md:text-xl font-medium my-3"
    >
      <input name="id" value={sts_vehicle.id} type="hidden" />
      <span className="mx-2">
        Arrived at: <b>{getTimeFromDate(new Date(sts_vehicle.arrival_time))}</b>
      </span>{" "}
      | <span className="mx-2">{sts_vehicle.vehicle.vehicle_number}</span> |{" "}
      <span className="mx-2">{sts_vehicle.vehicle.driver_name}</span> |{" "}
      <span className="mx-2">{sts_vehicle.vehicle.driver_mobile}</span>
      <Button />
    </form>
  );
}
