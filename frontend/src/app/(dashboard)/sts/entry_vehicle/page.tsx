"use client";

import { addVehicleSTS } from "@/utils/actions";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center my-5">
      <button
        type="submit"
        className={`bg-sts_text hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
        disabled={pending}
      >
        {pending ? "Adding Entry..." : "Add Entry"}
      </button>
    </div>
  );
}

export default function EntryVehicle() {
  const [state, formAction] = useFormState(addVehicleSTS, null);
  const vehicle_number = useSearchParams().get("vehicle_number") || "";

  return (
    <>
      <form
        className="text-sts_text font-medium w-[90%] sm:w-[80%] lg:w-[75%] mx-auto text-md sm:text-lg md:text-xl my-10"
        action={formAction}
      >
        <h1 className="text-xl lg:text-2xl text-sts_text font-bold text-center my-10">
          Entry of vehicle leaving from STS
        </h1>
        <div className="mb-4 flex w-full items-center">
          <label
            htmlFor="vehicle_number"
            className="w-[30%] block mb-2 max-sm:hidden"
          >
            Vehicle Number:
          </label>
          {vehicle_number ? (
            <input
              type="text"
              id="vehicle_number"
              name="vehicle_number"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sts_text"
              placeholder="Enter Vehicle Number"
              value={vehicle_number}
            />
          ) : (
            <input
              type="text"
              id="vehicle_number"
              name="vehicle_number"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sts_text"
              placeholder="Enter Vehicle Number"
            />
          )}
        </div>

        <div className="mb-4 flex w-full items-center">
          <label
            htmlFor="waste_volume"
            className="w-[30%] block mb-2 max-sm:hidden"
          >
            Waste Volume:
          </label>
          <input
            type="text"
            id="waste_volume"
            name="waste_volume"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-sts_text"
            placeholder="Enter Waste Volume"
          />
        </div>
        <div className="flex justify-center">
          <Submit />
        </div>
      </form>
      {state?.message && (
        <p className="text-red text-2xl font-medium mt-4 text-center">
          {state.message}
        </p>
      )}
    </>
  );
}
