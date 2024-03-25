"use server";

import { cookies } from "next/headers";
import { baseURL } from "../../files";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const data = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (data.status === 200) {
    const response = await data.json();
    const { role, jwt } = response;
    cookies().set("jwt", jwt);
    redirect(`/${role}`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}
