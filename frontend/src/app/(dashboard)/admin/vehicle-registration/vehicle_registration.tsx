"use client";
import { vehicleRegistration } from "@/utils/actions";
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

  return (
    <>
      <form
        className={`text-admin font-medium w-[60%] mx-auto text-2xl my-10`}
        action={formAction}
      >
        <div className="flex justify-around items-center">
          <div className="w-full mr-10">
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="vehicle_number" className="w-[30%] block mb-2">
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
              <label htmlFor="vehicle_type" className="w-[30%] block mb-2">
                Vechicle Type
              </label>
              <select
                id="vehicle_type"
                name="vehicle_type"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin bg-white`}
              >
                <option value="open_truck">Open Truck</option>
                <option value="dump_truck">Dump Truck</option>
                <option value="compactor">Compactor</option>
                <option value="container">Container</option>
              </select>
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="capacity" className="w-[30%] block mb-2">
                Capacity
              </label>
              <select
                id="capacity"
                name="capacity"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin bg-white`}
              >
                <option value={3}>3 Ton</option>
                <option value={5}>5 Ton</option>
                <option value={7}>7 Ton</option>
              </select>
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="driver_name" className="w-[30%] block mb-2">
                Driver Name
              </label>
              <input
                type="text"
                id="driver_name"
                name="driver_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Vehicle Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="driver_mobile" className="w-[30%] block mb-2">
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
              <label htmlFor="loaded" className="w-[30%] block mb-2">
                Cost/km (Loaded)
              </label>
              <input
                type="text"
                id="loaded"
                name="loaded"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Cost Per Kilometer (Loaded) in liters"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="unloaded" className="w-[30%] block mb-2">
                Cost/km (Unloaded)
              </label>
              <input
                type="text"
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
        <p className="text-red text-2xl font-medium mt-4">{state.message}</p>
      )}
    </>
  );
}
