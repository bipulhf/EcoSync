import extractUserInfo from "@/utils/verify";
import { baseURL } from "../../../../files";
import ProfileForm from "./ProfileForm";
import { cookies } from "next/headers";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/profile`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("jwt")?.value}`,
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
    roles: data.roles,
  };
};

export default async function Profile() {
  const { id, first_name, last_name, photo, email, mobile, roles } =
    await getData();
  let color = "black";
  if (roles.includes("admin")) color = "admin";
  else if (roles.includes("landfill_manager")) color = "landfill";
  else if (roles.includes("sts_manager")) color = "sts_text";
  return (
    <>
      <h1 className={`text-2xl text-center text-${color} font-bold mt-10`}>
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
        roles={roles}
      />
    </>
  );
}

export const fetchCache = "force-no-store";
