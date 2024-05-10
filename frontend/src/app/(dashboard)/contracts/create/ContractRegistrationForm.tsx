"use client";

import { contractRegistration } from "@/utils/actions";
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
        {pending ? "Adding Contract..." : "Add Contract"}
      </button>
    </div>
  );
}

export default function ContractRegistrationForm() {
  const [state, formAction] = useFormState(contractRegistration, null);

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
                htmlFor="duration"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Duration :
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Contract Duration in Days"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="contractor_id"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Contractor ID :
              </label>
              <input
                type="number"
                id="contractor_id"
                name="contractor_id"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Contractor Id"
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
