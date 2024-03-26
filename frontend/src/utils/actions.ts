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
  const role = formData.get("role");

  const data = await fetch(`${baseURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({ first_name, last_name, email, mobile, role }),
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

export async function resetPassword(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const data = await fetch(`${baseURL}/auth/reset-password/initiate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (data.status === 200) {
    cookies().set("email", email as string);
    redirect("/new-password");
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function confirmPassword(prevState: any, formData: FormData) {
  const email = cookies().get("email")?.value;
  const code = formData.get("code");
  const password = formData.get("password");

  const data = await fetch(`${baseURL}/auth/reset-password/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, token: code, newPassword: password }),
  });

  if (data.status === 200) {
    cookies().delete("email");
    redirect("/login");
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function updateUser(prevState: any, formData: FormData) {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  const mobile = formData.get("mobile");
  const password = formData.get("password");

  const data = await fetch(`${baseURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({ first_name, last_name, email, mobile, password }),
  });

  if (data.status === 200) {
    redirect(`/admin/users`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function vehicleRegistration(prevState: any, formData: FormData) {
  const ward_no = formData.get("ward_no");
  const capacity = formData.get("capacity");
  const latitude = formData.get("latitude");
  const longitude = formData.get("longitude");
  const manager_id = formData.get("manager_id");
  const landfill_id = formData.get("landfill_id");

  const data = await fetch(`${baseURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      ward_no,
      capacity,
      latitude,
      longitude,
      manager_id,
      landfill_id,
    }),
  });

  if (data.status === 200) {
    redirect(`/admin`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function stsRegistration(prevState: any, formData: FormData) {
  const vehicle_number = formData.get("vehicle_number");
  const vehicle_type = formData.get("vehicle_type");
  const capacity = formData.get("capacity");
  const driver_name = formData.get("driver_name");
  const driver_mobile = formData.get("driver_mobile");
  const loaded = formData.get("loaded");
  const unloaded = formData.get("unloaded");

  const data = await fetch(`${baseURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      vehicle_number,
      vehicle_type,
      capacity,
      driver_name,
      driver_mobile,
      loaded,
      unloaded,
    }),
  });

  if (data.status === 200) {
    redirect(`/admin`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function addVehicleSTS(prevState: any, formData: FormData) {
  const sts_id = formData.get("sts_id");
  const vehicle_number = formData.get("vehicle_number");
  const waste_volume = formData.get("waste_volume");

  const data = await fetch(`${baseURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      sts_id,
      vehicle_number,
      waste_volume,
    }),
  });

  if (data.status === 200) {
    redirect(`/admin`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function addVehicleLandfill(prevState: any, formData: FormData) {
  const vehicle_number = formData.get("vehicle_number");
  const waste_volume = formData.get("waste_volume");

  const data = await fetch(`${baseURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      vehicle_number,
      waste_volume,
    }),
  });

  if (data.status === 200) {
    redirect(`/admin`);
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
  cookies().delete("jwt");
  redirect("/login");
}
