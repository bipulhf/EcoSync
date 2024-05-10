"use client";

import { contractorRegistration } from "@/utils/actions";
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

export default function ContractorRegistrationForm() {
  const [state, formAction] = useFormState(contractorRegistration, null);

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
                htmlFor="company_name"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Company Name (e.g., XYZ Corporation)"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="tin" className="w-[30%] block mb-2 max-sm:hidden">
                TIN
              </label>
              <input
                type="text"
                id="tin"
                name="tin"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Tax Identification Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="mobile"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Mobile Number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="payment_per_ton_waste"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Payment Per Ton Waste
              </label>
              <input
                type="number"
                step="0.001"
                id="payment_per_ton_waste"
                name="payment_per_ton_waste"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Payment Per Ton of Waste"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="required_amount_waste"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Required Amount Waste
              </label>
              <input
                type="number"
                step="0.001"
                id="required_amount_waste"
                name="required_amount_waste"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Required Amount of Waste"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="area_collection"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Area Collection
              </label>
              <input
                type="text"
                id="area_collection"
                name="area_collection"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Area Collection"
              />
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
