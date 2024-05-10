"use client";

import { contractRegistration, workforceRegistration } from "@/utils/actions";
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
        {pending ? "Adding Workforce..." : "Add Workforce"}
      </button>
    </div>
  );
}

export default function WorkforceRegistrationForm() {
  const [state, formAction] = useFormState(workforceRegistration, null);

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
                htmlFor="full_name"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="dob" className="w-[30%] block mb-2 max-sm:hidden">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter your date of birth"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="job_title"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Job Title
              </label>
              <input
                type="text"
                id="job_title"
                name="job_title"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter your job title"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="rate_per_hour"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Payment Rate Per Hour
              </label>
              <input
                type="number"
                step="0.001"
                id="rate_per_hour"
                name="rate_per_hour"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter payment rate per hour"
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
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="assigned_route_latitude"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Assigned Route Latitude
              </label>
              <input
                type="number"
                step="0.000001"
                id="assigned_route_latitude"
                name="assigned_route_latitude"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter assigned route latitude"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label
                htmlFor="assigned_route_longitude"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                Assigned Route Longitude
              </label>
              <input
                type="number"
                step="0.000001"
                id="assigned_route_longitude"
                name="assigned_route_longitude"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter assigned route longitude"
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
