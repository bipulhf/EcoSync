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
        className={`text-admin font-medium w-[60%] mx-auto text-2xl my-10`}
        action={formAction}
      >
        <div className="flex justify-around items-center">
          <div className="w-full mr-10">
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="ward_no" className="w-[30%] block mb-2">
                Ward No
              </label>
              <input
                type="text"
                id="ward_no"
                name="ward_no"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Ward No"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="capacity" className="w-[30%] block mb-2">
                Capacity
              </label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter STS Capacity in Tons"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="latitude" className="w-[30%] block mb-2">
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Latitude"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="longitude" className="w-[30%] block mb-2">
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Longitude"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="landfill_id" className="w-[30%] block mb-2">
                Landfill ID
              </label>
              <input
                type="text"
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
