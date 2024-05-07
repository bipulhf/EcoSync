"use client";

import { landfillRegistration, stsRegistration } from "@/utils/actions";
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
        {pending ? "Adding Landfill..." : "Add Landfill"}
      </button>
    </div>
  );
}

export default function LandfillRegistrationForm() {
  const [state, formAction] = useFormState(landfillRegistration, null);

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
                htmlFor="city_corporation"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                City Corporation Name
              </label>
              <input
                type="text"
                id="city_corporation"
                name="city_corporation"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter City Corporation Name (eg. Dhaka North City Corporation)"
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
                step="0.000001"
                id="latitude"
                name="latitude"
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
                htmlFor="start_time"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Landfill Start Time
              </label>
              <input
                type="text"
                id="start_time"
                name="start_time"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Landfill Start Time (eg: 08:00 AM)"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="end_time"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Landfill End Time
              </label>
              <input
                type="text"
                id="end_time"
                name="end_time"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Landfill End time (eg: 08:00 PM)"
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
