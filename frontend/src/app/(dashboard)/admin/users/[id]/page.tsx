import { cookies } from "next/headers";
import { baseURL } from "../../../../../../files";
import UserProfileForm from "./user_profile_form";

const getData = async (id: string) => {
  const data = await (
    await fetch(`${baseURL}/users/${id}`, {
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
    sts_id: data.sts_id,
    landfill_id: data.landfill_id,
  };
};

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const {
    id,
    first_name,
    last_name,
    photo,
    email,
    mobile,
    role,
    sts_id,
    landfill_id,
  } = await getData(params.id);

  return (
    <>
      <h1 className={`text-3xl text-center text-admin font-bold pt-10`}>
        Profile
      </h1>
      <UserProfileForm
        id={id}
        fname={first_name}
        lname={last_name}
        photo={photo}
        email={email}
        mobile={mobile}
        role={role}
        sts_id={sts_id}
        landfill_id={landfill_id}
      />
    </>
  );
}

export const fetchCache = "force-no-store";
