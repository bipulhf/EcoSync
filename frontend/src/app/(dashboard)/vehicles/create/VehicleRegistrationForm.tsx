"use client";

import { vehicleRegistration } from "@/utils/actions";
import { useState } from "react";
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
        {pending ? "Adding Vehicle..." : "Add Vehicle"}
      </button>
    </div>
  );
}

export default function VechicleRegistrationForm() {
  const [state, formAction] = useFormState(vehicleRegistration, null);
  const [capacity, setCapacity] = useState(3);

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
                htmlFor="sts_id"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                STS ID
              </label>
              <input
                type="text"
                id="sts_id"
                name="sts_id"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter STS ID"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="vehicle_number"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Vechicle Number
              </label>
              <input
                type="text"
                id="vehicle_number"
                name="vehicle_number"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Vehicle Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="vehicle_type"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Vechicle Type
              </label>
              <select
                id="vehicle_type"
                name="vehicle_type"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin bg-white`}
                onChange={(e) => {
                  if (e.target.value === "open_truck") setCapacity(3);
                  if (e.target.value === "dump_truck") setCapacity(5);
                  if (e.target.value === "compactor") setCapacity(7);
                  if (e.target.value === "container") setCapacity(12);
                }}
              >
                <option value="open_truck">Open Truck</option>
                <option value="dump_truck">Dump Truck</option>
                <option value="compactor">Compactor</option>
                <option value="container">Container</option>
              </select>
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
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Capacity in liters"
                value={capacity}
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="driver_name"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Driver Name
              </label>
              <input
                type="text"
                id="driver_name"
                name="driver_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Driver Name"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="driver_mobile"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Driver Mobile
              </label>
              <input
                type="text"
                id="driver_mobile"
                name="driver_mobile"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Driver Mobile Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="loaded"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Cost/km (Loaded)
              </label>
              <input
                type="number"
                step={0.001}
                id="loaded"
                name="loaded"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Cost Per Kilometer (Loaded) in liters"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="unloaded"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Cost/km (Unloaded)
              </label>
              <input
                type="number"
                step={0.001}
                id="unloaded"
                name="unloaded"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Cost Per Kilometer (Unloaded) in liters"
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
