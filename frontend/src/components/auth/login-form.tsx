"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/utils/actions";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-admin hover:underline text-white font-medium text-2xl px-4 py-2 rounded-lg`}
      type="submit"
      disabled={pending}
    >
      {pending ? `Logging in...` : `Login`}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(login, null);

  return (
    <>
      <h1 className="text-5xl font text-admin leading-tight mb-10">
        Login to your account
      </h1>
      <form action={formAction}>
        <label
          htmlFor="email"
          className="block mb-2 text-3xl text-admin font-bold"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-admin text-admin text-2xl"
          placeholder="user@mail.com"
        />

        <label
          htmlFor="password"
          className="block mt-4 mb-2 text-3xl text-admin font-bold"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-admin text-admin text-2xl"
          placeholder="********"
        />
        <Submit />
      </form>
      {state?.message && (
        <p className="text-red text-2xl font-medium mt-4">{state.message}</p>
      )}
    </>
  );
}
