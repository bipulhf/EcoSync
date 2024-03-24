"use client";

import { FormEvent, useState } from "react";
import { baseURL } from "../../../files";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const data = await fetch(`${baseURL}/auth/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await data.json();
    if (data.status === 200) {
      localStorage.setItem("jwt", response.jwt);
      setLoading(false);
    } else {
      setError(response.message);
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-5xl font text-admin leading-tight mb-10">
        Login to your account
      </h1>
      <form onSubmit={onSubmit}>
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
        <button
          className={`${
            loading ? `bg-gray-300 disabled` : `bg-admin hover:underline`
          } text-white font-medium text-2xl px-4 py-2 rounded-lg`}
          type="submit"
        >
          {loading ? `Logging in...` : `Login`}
        </button>
      </form>
      {error && <p className="text-red text-2xl font-medium mt-4">{error}</p>}
    </>
  );
}
