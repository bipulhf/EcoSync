"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registration } from "@/utils/actions";
import { useState } from "react";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center my-5">
      <button
        type="submit"
        className={`bg-admin hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
        disabled={pending}
      >
        {pending ? "Adding User..." : "Add User"}
      </button>
    </div>
  );
}

export default function UserRegistaionsForm() {
  const [state, formAction] = useFormState(registration, null);
  const [role, setRole] = useState("unassigned");

  return (
    <>
      <form
        className={`text-admin font-medium w-[60%] mx-auto text-2xl my-10`}
        action={formAction}
      >
        <div className="flex justify-around items-center">
          <div className="w-full mr-10">
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="first_name" className="w-[30%] block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter First Name"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="last_name" className="w-[30%] block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Last Name"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="email" className="w-[30%] block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-4 flex w-full items-center">
              <label htmlFor="mobile" className="w-[30%] block mb-2">
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
              <label htmlFor="role" className="w-[30%] block mb-2">
                User Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="role"
                name="role"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin bg-white`}
              >
                <option value="unassigned">Unassigned</option>
                <option value="sts_manager">STS Manager</option>
                <option value="landfill_manager">Landfill Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {role === "sts_manager" && (
              <div className="mb-4 flex w-full items-center">
                <label htmlFor="sts_id" className="w-[30%] block mb-2">
                  Enter STS ID
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
            )}
            {role === "landfill_manager" && (
              <div className="mb-4 flex w-full items-center">
                <label htmlFor="landfill_id" className="w-[30%] block mb-2">
                  Enter Landfill ID
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
            )}
          </div>
        </div>
        <Submit />
      </form>
      {state?.message && (
        <p className="text-red text-2xl font-medium mt-4">{state.message}</p>
      )}
    </>
  );
}
