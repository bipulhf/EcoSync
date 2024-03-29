"use client";
import { resetPassword } from "@/utils/actions";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-admin hover:underline text-white font-medium text-2xl px-4 py-2 rounded-lg`}
      type="submit"
      disabled={pending}
    >
      {pending ? `Sending ...` : `Send Code`}
    </button>
  );
}

export default function ResetPasswordForm() {
  const [state, formAction] = useFormState(resetPassword, null);
  const [token, setToken] = useState("");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  useEffect(() => {
    if (state?.message === "Recaptcha verification failed") {
      setRefreshReCaptcha(true);
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <label
          htmlFor="email"
          className="block mb-2 text-3xl text-admin font-bold"
        >
          Reset Password:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-admin text-admin text-2xl"
          placeholder="user@mail.com"
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
        <Submit />
      </form>
      {state?.message && (
        <p className="text-red text-2xl font-medium mt-4">{state.message}</p>
      )}
    </>
  );
}
