import extractUserInfo from "@/utils/verify";
import { baseURL } from "../../../../files";
import Image from "next/image";
import ProfileForm from "./profile_form";

const getData = async () => {
  const { id, role } = await extractUserInfo();
  const data = await (
    await fetch(`${baseURL}/user/${id}`, { cache: "no-store" })
  ).json();
  return {
    name: data.name,
    photo: data.photo,
    email: data.email,
    mobile: data.mobile,
    role,
  };
};

export default async function Profile() {
  const { name, photo, email, mobile, role } = await getData();
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
        color={color}
        fname={name}
        lname={name}
        photo={photo}
        email={email}
        mobile={mobile}
      />
    </>
  );
}

export const fetchCache = "force-no-store";
