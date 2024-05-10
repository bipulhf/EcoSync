"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registration } from "@/utils/actions";
import { useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { Checkbox } from "antd";

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

export default function UserRegistaionsForm({ total_roles }: any) {
  const [state, formAction] = useFormState(registration, null);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([
    "unassigned",
  ]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };
  return (
    <>
      <form
        className={`text-admin font-medium w-[90%] md:w-[80%] mx-auto text:md md:text-xl py-5`}
        action={formAction}
      >
        <div className="flex justify-around items-center">
          <div className="w-full md:mr-10">
            <div className="mb-4 flex w-ful items-center">
              <label
                htmlFor="first_name"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
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
              <label
                htmlFor="last_name"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
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
              <label
                htmlFor="email"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
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
                htmlFor="role"
                className="w-[30%] block mb-2 max-sm:hidden"
              >
                User Role
              </label>
              <div className="flex flex-col gap-2 roles_checkbox">
                <Checkbox.Group
                  options={total_roles}
                  value={checkedList}
                  onChange={onChange}
                />
              </div>
              <input type="hidden" name="roles" value={checkedList.join(",")} />
            </div>
            {checkedList.includes("sts_manager") && (
              <div className="mb-4 flex w-full items-center">
                <label
                  htmlFor="sts_id"
                  className="w-[30%] block mb-2 max-sm:hidden"
                >
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
            {checkedList.includes("landfill_manager") && (
              <div className="mb-4 flex w-full items-center">
                <label
                  htmlFor="landfill_id"
                  className="w-[30%] block mb-2 max-sm:hidden"
                >
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
            {checkedList.includes("contractor_manager") && (
              <div className="mb-4 flex w-full items-center">
                <label
                  htmlFor="contractor_id"
                  className="w-[30%] block mb-2 max-sm:hidden"
                >
                  Enter Contractor ID
                </label>
                <input
                  type="text"
                  id="contractor_id"
                  name="contractor_id"
                  required
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                  placeholder="Enter Contractor ID"
                />
              </div>
            )}
          </div>
        </div>
        <Submit />
      </form>
      {state?.message && (
        <p className="text-red text-2xl font-medium mt-4 text-center">
          {state.message}
        </p>
      )}
    </>
  );
}
