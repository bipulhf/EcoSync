"use client";
import { confirmPassword } from "@/utils/actions";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-admin hover:underline text-white font-medium text-2xl px-4 py-2 rounded-lg`}
      type="submit"
      disabled={pending}
    >
      {pending ? `Changing...` : `Change Password`}
    </button>
  );
}

export default function ConfirmPasswordForm() {
  const [state, formAction] = useFormState(confirmPassword, null);
  const [show, setShow] = useState(false);

  return (
    <>
      <form action={formAction}>
        <span className={`${show && `invisible`}`}>
          <label
            htmlFor="code"
            className="block mb-2 text-3xl text-admin font-bold"
          >
            Enter Code:
          </label>
          <input
            type="text"
            id="code"
            name="code"
            required
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-admin text-admin text-2xl"
            placeholder="Enter Secret Code"
          />
        </span>
        <button
          className={`bg-admin text-white font-medium text-2xl px-4 py-2 rounded-lg hover:underline ${
            show && `invisible`
          }`}
          onClick={() => setShow(true)}
        >
          Next
        </button>
        <span className={`${!show && `invisible`}`}>
          <label
            htmlFor="password"
            className="block mb-2 text-3xl text-admin font-bold"
          >
            New Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-admin text-admin text-2xl"
            placeholder="********"
          />
        </span>

        <span className={`${!show && `invisible`}`}>
          <Submit />
        </span>
      </form>
      {state?.message && (
        <p className="text-red text-2xl font-medium mt-4">{state.message}</p>
      )}
    </>
  );
}
