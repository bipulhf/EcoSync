"use client";

import { createContractorReport } from "@/utils/actions";
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
        {pending ? "Adding Contractor..." : "Add Contractor"}
      </button>
    </div>
  );
}

export default function CreateContractorForm() {
  const [state, formAction] = useFormState(createContractorReport, null);

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
                htmlFor="waste_amount"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Waste Amount
              </label>
              <input
                type="number"
                id="waste_amount"
                name="waste_amount"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter the amount of waste (in kg)"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="type_of_waste"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Type of Waste
              </label>
              <select
                id="type_of_waste"
                name="type_of_waste"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin bg-white`}
              >
                <option value="municipal_solid_waste">
                  Municipal Solid Waste (MSW)
                </option>
                <option value="electronic_waste">Electronic Waste</option>
                <option value="hazardous_waste">Hazardous Waste</option>
                <option value="food_waste">Food Waste</option>
                <option value="construction_waste">Construction Waste</option>
              </select>
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="vehicle_type"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Vehicle Type
              </label>
              <select
                id="vehicle_type"
                name="vehicle_type"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin bg-white`}
              >
                <option value="van">Rickshaw Van</option>
                <option value="pick_up">Pick Up</option>
                <option value="truck">Truck</option>
              </select>
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="sts_id"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                STS ID
              </label>
              <input
                type="number"
                id="sts_id"
                name="sts_id"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter STS ID"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="contractor_id"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Contractor ID
              </label>
              <input
                type="number"
                id="contractor_id"
                name="contractor_id"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter contractor ID"
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
