"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useFormState, useFormStatus } from "react-dom";
import { workforceUpdate } from "@/utils/actions";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center my-5">
      <button
        type="submit"
        className={`bg-blue-600 hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
        disabled={pending}
      >
        {pending ? "Adding..." : "Add"}
      </button>
    </div>
  );
}

const WorkforceEntryModal = ({ workforce_contractor }: any) => {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(workforceUpdate, null);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Entry Workforce
      </Button>
      <Modal
        title="Entry Workforce"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <form action={formAction}>
          <div className="mb-2 md:max-w-[90%]">
            <label htmlFor="old_password" className="block mb-2">
              Select Workforce:
            </label>
            <select
              id="workforce_id"
              name="workforce_id"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              {workforce_contractor.map((workforce: any) => (
                <option
                  value={workforce.workforce_id}
                  key={workforce.workforce_id}
                >
                  {workforce.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2 md:max-w-[90%]">
            <label htmlFor="confirm_password" className="block mb-2">
              Leave Today:
            </label>
            <select
              id="leave_today"
              name="leave_today"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
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

export default WorkforceEntryModal;
