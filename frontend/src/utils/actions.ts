"use server";

import { cookies } from "next/headers";
import { baseURL } from "../../files";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { convertTo24HourFormat } from "./timeconvert";

export async function registration(prevState: any, formData: FormData) {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  const mobile = formData.get("mobile");
  const role = formData.get("role");
  const sts_id = formData.get("sts_id");
  const landfill_id = formData.get("landfill_id");

  const data = await fetch(`${baseURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      mobile,
      role,
      sts_id,
      landfill_id,
    }),
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
    redirect(`/${roles[0]}`);
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

  const data = await fetch(`${baseURL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
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
    redirect(`/admin/users`);
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
  const password = formData.get("password");
  const profile_photo = formData.get("photo");
  const role = formData.get("role");
  const sts_id = formData.get("sts_id");
  const landfill_id = formData.get("landfill_id");

  const data = await fetch(`${baseURL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      mobile,
      password,
      profile_photo,
      role,
      sts_id,
      landfill_id,
    }),
  });

  if (data.status === 200) {
    redirect(`/admin/users`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
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
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      ward,
      capacity,
      latitude,
      longitude,
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
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      city_corporation,
      start_time,
      latitude,
      longitude,
      end_time,
    }),
  });

  if (data.status === 200) {
    redirect(`/admin`);
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
  const cost_per_km_load = formData.get("loaded");
  const cost_per_km_unload = formData.get("unloaded");

  const data = await fetch(`${baseURL}/vehicle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("jwt")?.value}`,
    },
    body: JSON.stringify({
      sts_id,
      vehicle_number,
      type,
      capacity,
      driver_name,
      driver_mobile,
      cost_per_km_load,
      cost_per_km_unload,
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

  const data = await fetch(`${baseURL}/sts/vehicle`, {
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

  const data = await fetch(`${baseURL}/landfill/vehicle`, {
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
    revalidatePath("/landfill_manager");
    redirect(`/landfill_manager`);
  } else {
    const response = await data.json();
    return { message: response.message };
  }
}

export async function leftSTS(formData: FormData) {
  const id = formData.get("id");
  const data = await fetch(`${baseURL}/sts/vehicle/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `${cookies().get("jwt")?.value}`,
    },
  });
  if (data.status === 200) {
    revalidatePath("/sts_manager");
  }
}

export async function leftLandfill(formData: FormData) {
  const id = formData.get("id");
  const data = await fetch(`${baseURL}/landfill/vehicle/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `${cookies().get("jwt")?.value}`,
    },
  });
  if (data.status === 200) {
    revalidatePath("/landfill_manager");
  }
}

export async function searchReport(prevState: any, formData: FormData) {
  const search = formData.get("search");
  const type = formData.get("type");
  const date = formData.get("date");

  const query = search || date;

  const data = await (
    await fetch(`${baseURL}/report?pageNo=1&type=${type}&query=${query}`, {
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();
  if (data.status == 200) {
    revalidatePath("/admin/report");
    redirect(`/admin/report?pageNo=1&type=${type}&query=${query}`);
  }
}

export const downloadReport = async (sts_vehicle_id: string) => {
  await fetch(`${baseURL}/report/download/${sts_vehicle_id}`, {
    headers: {
      Authorization: `${cookies().get("jwt")?.value}`,
    },
  });
  redirect(`http://localhost:8000/report/${sts_vehicle_id}`);
};

export async function Logout() {
  cookies().delete("jwt");
  redirect("/login");
}
