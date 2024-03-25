"use server";

import { cookies } from "next/headers";
import { baseURL } from "../../files";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registration(prevState: any, formData: FormData) {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  const mobile = formData.get("mobile");

  const data = await fetch(`${baseURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({ first_name, last_name, email, mobile }),
  });

  if (data.status === 200) {
    redirect(`/admin/users`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

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
    const { role, token } = response;
    cookies().set("jwt", token);
    redirect(`/${role}`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function leftSTS(formData: FormData) {
  const id = formData.get("id");
  const data = await fetch(`${baseURL}/sts/vehicle/${id}`, { method: "PUT" });
  if (data.status === 200) {
    revalidatePath("/sts-manager");
  }
}

export async function leftLandfill(formData: FormData) {
  const id = formData.get("id");
  const data = await fetch(`${baseURL}/landfill/vehicle/${id}`, {
    method: "PUT",
  });
  if (data.status === 200) {
    revalidatePath("/landfill-manager");
  }
}

export async function Logout() {
  console.log("Working");
  cookies().delete("jwt");
  redirect("/login");
}
