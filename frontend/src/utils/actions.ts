"use server";

import { cookies, headers } from "next/headers";
import { baseURL } from "../../files";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { convertTo24HourFormat } from "./timeconvert";

export async function registration(prevState: any, formData: FormData) {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  const mobile = formData.get("mobile");
  const getRoles = formData.get("roles")?.toString();
  const sts_id = formData.get("sts_id");
  const landfill_id = formData.get("landfill_id");
  const contractor_id = formData.get("conractor_id");
  const roles = getRoles?.split(",");

  const data = await fetch(`${baseURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      mobile,
      roles,
      sts_id,
      landfill_id,
      contractor_id,
    }),
  });

  if (data.status === 201) {
    redirect(`/users`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const token = formData.get("token");

  const recaptcha = await (
    await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    )
  ).json();
  console.log(recaptcha);

  if (recaptcha.success === false) {
    return { message: "Recaptcha verification failed" };
  }

  const data = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (data.status === 200) {
    const response = await data.json();
    const { roles, token } = response;
    cookies().set("jwt", token, {
      httpOnly: true,
    });
    redirect(`/dashboard`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function resetPassword(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const token = formData.get("token");

  const recaptcha = await (
    await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    )
  ).json();

  if (recaptcha.success === false) {
    return { message: "Recaptcha verification failed" };
  }

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
  const profile_photo = formData.get("photo");

  console.log(first_name, last_name, email, mobile, password, profile_photo);

  const data = await fetch(`${baseURL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      mobile,
      password,
      profile_photo,
    }),
  });

  if (data.status === 200) {
    revalidatePath("/profile");
    redirect(`/profile`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function changePassword(prevState: any, formData: FormData) {
  const old_password = formData.get("old_password");
  const new_password = formData.get("new_password");
  const confirm_password = formData.get("confirm_password");

  const data = await fetch(`${baseURL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getJWT()}`,
    },
    body: JSON.stringify({
      old_password,
      new_password,
      confirm_password,
    }),
  });

  if (data.status === 200) {
    redirect(`/profile`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function updateUserAdmin(prevState: any, formData: FormData) {
  const id = formData.get("id");
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  const mobile = formData.get("mobile");
  const profile_photo = formData.get("photo");
  const getRoles = formData.get("roles")?.toString();
  const sts_id = formData.get("sts_id");
  const landfill_id = formData.get("landfill_id");
  const roles = getRoles?.split(",");

  const data = await fetch(`${baseURL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getJWT()}`,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      mobile,
      profile_photo,
      roles,
      sts_id,
      landfill_id,
    }),
  });

  if (data.status === 201) {
    redirect(`/users`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function getJWT() {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwt")?.value;
  return jwt;
}

export async function deleteUser() {
  revalidatePath(`/admin/users`);
}

export async function stsRegistration(prevState: any, formData: FormData) {
  const ward = formData.get("ward_no");
  const capacity = formData.get("capacity");
  const latitude = formData.get("latitude");
  const longitude = formData.get("longitude");
  const landfill_id = formData.get("landfill_id");

  const data = await fetch(`${baseURL}/sts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getJWT()}`,
    },
    body: JSON.stringify({
      ward,
      capacity,
      latitude,
      longitude,
      landfill_id,
    }),
  });

  if (data.status === 201) {
    redirect(`/sts`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function landfillRegistration(prevState: any, formData: FormData) {
  const city_corporation = formData.get("city_corporation");
  let start_time = formData.get("start_time");
  const latitude = formData.get("latitude");
  const longitude = formData.get("longitude");
  let end_time = formData.get("end_time");

  if (
    !city_corporation ||
    !start_time ||
    !latitude ||
    !longitude ||
    !end_time
  ) {
    return { message: "All fields are required" };
  }
  start_time = convertTo24HourFormat(start_time as string);
  end_time = convertTo24HourFormat(end_time as string);

  const data = await fetch(`${baseURL}/landfill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      city_corporation,
      start_time,
      latitude,
      longitude,
      end_time,
    }),
  });

  if (data.status === 201) {
    redirect(`/dashboard`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function vehicleRegistration(prevState: any, formData: FormData) {
  const sts_id = formData.get("sts_id");
  const vehicle_number = formData.get("vehicle_number");
  const type = formData.get("vehicle_type");
  const capacity = formData.get("capacity");
  const driver_name = formData.get("driver_name");
  const driver_mobile = formData.get("driver_mobile");
  const cost_per_km_loaded = formData.get("loaded");
  const cost_per_km_unloaded = formData.get("unloaded");

  console.log(capacity);

  const data = await fetch(`${baseURL}/vehicle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      sts_id,
      vehicle_number,
      type,
      capacity,
      driver_name,
      driver_mobile,
      cost_per_km_loaded,
      cost_per_km_unloaded,
    }),
  });

  if (data.status === 201) {
    redirect(`/vehicles`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function addVehicleSTS(prevState: any, formData: FormData) {
  const vehicle_number = formData.get("vehicle_number");
  const waste_volume = formData.get("waste_volume");

  const data = await fetch(`${baseURL}/sts/vehicle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getJWT()}`,
    },
    body: JSON.stringify({
      vehicle_number,
      waste_volume,
    }),
  });

  if (data.status === 201) {
    redirect(`/dashboard`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function addVehicleLandfill(prevState: any, formData: FormData) {
  const vehicle_number = formData.get("vehicle_number");
  const waste_volume = formData.get("waste_volume");

  const data = await fetch(`${baseURL}/landfill/vehicle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getJWT()}`,
    },
    body: JSON.stringify({
      vehicle_number,
      waste_volume,
    }),
  });

  if (data.status === 201) {
    revalidatePath("/dashboard");
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function leftSTS(prevState: any, formData: FormData) {
  const id = formData.get("id");
  const url = `${baseURL}/sts/vehicle/${id}`;

  const data = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await getJWT()}`,
    },
  });

  if (data.status === 200) {
    revalidatePath("/dashboard");
  }
}

export async function leftLandfill(prevState: any, formData: FormData) {
  const id = formData.get("id");
  const data = await fetch(`${baseURL}/landfill/vehicle/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await getJWT()}`,
    },
  });
  if (data.status === 200) {
    revalidatePath("/dashboard");
  }
}

export async function getReport(pageNo: number, pageSize: number) {
  return await (
    await fetch(`${baseURL}/report?pageNo=${pageNo}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
}

export const downloadReport = async (sts_vehicle_id: string) => {
  const { file_path } = await (
    await fetch(`${baseURL}/report/${sts_vehicle_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();

  redirect(`${baseURL}/report/download/${file_path}`);
};

export async function Logout() {
  cookies().delete("jwt");
  redirect("/login");
}

export async function contractorRegistration(
  prevState: any,
  formData: FormData
) {
  const company_name = formData.get("company_name");
  let tin = formData.get("tin");
  const mobile = formData.get("mobile");
  const payment_per_ton_waste = formData.get("payment_per_ton_waste");
  let required_amount_waste = parseInt(
    formData.get("required_amount_waste")?.toString() || "0"
  );
  const area_collection = formData.get("area_collection");
  const sts_id = formData.get("sts_id");

  const data = await fetch(`${baseURL}/contractor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getJWT()}`,
    },
    body: JSON.stringify({
      company_name,
      tin,
      mobile,
      payment_per_ton_waste,
      required_amount_waste: required_amount_waste / 1000,
      area_collection,
      sts_id,
    }),
  });

  if (data.status === 201) {
    redirect(`/contractors`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function contractRegistration(prevState: any, formData: FormData) {
  const duration = formData.get("duration");
  let contractor_id = formData.get("contractor_id");

  const data = await fetch(`${baseURL}/contract`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getJWT()}`,
    },
    body: JSON.stringify({
      duration,
      contractor_id,
    }),
  });

  if (data.status === 201) {
    redirect(`/contracts`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}
