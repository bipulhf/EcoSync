"use client";

import { login } from "@/utils/actions";
import Link from "next/link";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-admin hover:bg-admin hover:underline text-white font-medium text-xl px-4 py-2 rounded-lg`}
      type="submit"
      disabled={pending}
    >
      {pending ? `Logging in...` : `Login`}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(login, null);
  const [token, setToken] = useState("");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  useEffect(() => {
    if (state?.message === "Recaptcha verification failed") {
      setRefreshReCaptcha(true);
    }
  }, [state]);

  return (
    <>
      <h1 className="text-3xl lg:text-5xl font text-admin leading-tight mb-10">
        Login to your account
      </h1>
      <form action={formAction}>
        <label
          htmlFor="email"
          className="block mb-2 text-2xl lg:text-3xl text-admin font-bold"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-admin text-admin text-xl lg:text-2xl"
          placeholder="user@mail.com"
        />

        <label
          htmlFor="password"
          className="block mt-4 mb-2 text-2xl lg:text-3xl text-admin font-bold"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-admin text-admin text-xl lg:text-2xl"
          placeholder="********"
        />
        <input type="hidden" name="token" value={token} />
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        >
          <GoogleReCaptcha
            onVerify={setToken}
            refreshReCaptcha={refreshReCaptcha}
          />
        </GoogleReCaptchaProvider>
        <div className="max-sm:flex max-sm:flex-col gap-5">
          <Submit />
          <Link
            href="/reset-password"
            className="text-admin hover:underline text-xl lg:text-2xl font-medium mx-10 text-center"
          >
            Reset Password
          </Link>
        </div>
      </form>
      {state?.message && (
        <p className="text-red text-2xl font-medium mt-4">{state.message}</p>
      )}
    </>
  );
}
