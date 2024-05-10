"use client";

import { stsRegistration } from "@/utils/actions";
import { useFormState, useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center my-5">
      <button
        type="submit"
        className={`bg-admin hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
        disabled={pending}
      >
        {pending ? "Adding STS..." : "Add STS"}
      </button>
    </div>
  );
}

export default function STSRegistrationForm() {
  const [state, formAction] = useFormState(stsRegistration, null);

  return (
    <>
      <form
        className={`text-admin font-medium w-[90%] sm:w-[80%] lg:w-[75%] mx-auto text-md sm:text-lg md:text-xl my-10`}
        action={formAction}
      >
        <div className="flex justify-around items-center">
          <div className="w-full md:mr-10">
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="ward_no"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Ward No
              </label>
              <input
                type="number"
                id="ward_no"
                name="ward_no"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Ward No"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="capacity"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                step="0.01"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter STS Capacity in Tons"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="fine_per_ton"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Fine Per Ton
              </label>
              <input
                type="number"
                id="fine_per_ton"
                name="fine_per_ton"
                step="0.01"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Fine Per Ton in Taka"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="latitude"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Latitude
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                step="0.000001"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Latitude"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="longitude"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Longitude
              </label>
              <input
                type="number"
                step="0.000001"
                id="longitude"
                name="longitude"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Longitude"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="landfill_id"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Landfill ID
              </label>
              <input
                type="number"
                id="landfill_id"
                name="landfill_id"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Landfill ID"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center my-5">
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
