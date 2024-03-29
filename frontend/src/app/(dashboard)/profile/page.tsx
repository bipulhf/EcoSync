import extractUserInfo from "@/utils/verify";
import { baseURL } from "../../../../files";
import ProfileForm from "./profile_form";
import { cookies } from "next/headers";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/profile`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    photo: data.profile_photo,
    email: data.email,
    mobile: data.mobile,
    role: data.role,
  };
};

export default async function Profile() {
  const { id, first_name, last_name, photo, email, mobile, role } =
    await getData();
  let color = "black";
  if (role === "admin") color = "admin";
  else if (role === "sts-manager") color = "sts_text";
  else if (role === "landfill-manager") color = "landfill";
  return (
    <>
      <h1 className={`text-3xl text-center text-${color} font-bold mt-10`}>
        Profile
      </h1>
      <ProfileForm
        id={id}
        color={color}
        fname={first_name}
        lname={last_name}
        photo={photo}
        email={email}
        mobile={mobile}
        role={role}
      />
    </>
  );
}

export const fetchCache = "force-no-store";
