"use client";

import { addVehicleLandfill } from "@/utils/actions";
import { useFormState, useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center my-5">
      <button
        type="submit"
        className={`bg-landfill hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
        disabled={pending}
      >
        {pending ? "Adding Entry..." : "Add Entry"}
      </button>
    </div>
  );
}

export default function EntryVehicle() {
  const [state, formAction] = useFormState(addVehicleLandfill, null);

  return (
    <>
      <form
        className="text-landfill font-medium text-2xl w-[50%] mx-auto my-10"
        action={formAction}
      >
        <h1 className="text-4xl text-landfill font-bold text-center my-10">
          Entry of vehicle leaving from Landfill
        </h1>

        <div className="mb-4 flex w-full items-center">
          <label htmlFor="vehicle_number" className="w-[30%] block mb-2">
            Vehicle Number:
          </label>
          <input
            type="text"
            id="vehicle_number"
            name="vehicle_number"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-landfill"
            placeholder="Enter Vehicle Number"
          />
        </div>

        <div className="mb-4 flex w-full items-center">
          <label htmlFor="waste_volume" className="w-[30%] block mb-2">
            Waste Volume:
          </label>
          <input
            type="text"
            id="waste_volume"
            name="waste_volume"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-landfill"
            placeholder="Enter Waste Volume"
          />
        </div>
        <div className="flex justify-center">
          <Submit />
        </div>
      </form>
      {state?.message && (
        <p className="text-red text-2xl font-medium mt-4">{state.message}</p>
      )}
    </>
  );
}