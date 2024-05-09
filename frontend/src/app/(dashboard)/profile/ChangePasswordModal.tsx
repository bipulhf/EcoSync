"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import VehicleTable from "@/app/(dashboard)/vehicles/VehicleTable";
import { useFormState, useFormStatus } from "react-dom";
import { changePassword } from "@/utils/actions";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center my-5">
      <button
        type="submit"
        className={`bg-blue-600 hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
        disabled={pending}
      >
        {pending ? "Updating..." : "Update"}
      </button>
    </div>
  );
}

const ChangePasswordModal = () => {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(changePassword, null);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Change Password
      </Button>
      <Modal
        title="Change Password"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <form action={formAction}>
          <div className="mb-2 md:max-w-[90%]">
            <label htmlFor="old_password" className="block mb-2">
              Old Password:
            </label>
            <input
              type="password"
              id="old_password"
              name="old_password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your old password"
            />
          </div>

          <div className="mb-2 md:max-w-[90%]">
            <label htmlFor="new_password" className="block mb-2">
              New Password:
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your new password"
            />
          </div>

          <div className="mb-2 md:max-w-[90%]">
            <label htmlFor="confirm_password" className="block mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirm your new password"
            />
          </div>
          <Submit />
        </form>
        {state?.message && (
          <p className="text-red text-lg font-medium mt-4 text-center">
            {state.message}
          </p>
        )}
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
