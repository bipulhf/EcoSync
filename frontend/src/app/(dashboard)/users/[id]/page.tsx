import UserProfileForm from "./UserProfileForm";
import { baseURL } from "../../../../../files";
import { getJWT } from "@/utils/actions";

const getData = async (id: string) => {
  const data = await (
    await fetch(`${baseURL}/users/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
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
    roles,
    sts_id,
    landfill_id,
  } = await getData(params.id);

  const rolesArr: any = [];
  roles.map((role: any) => {
    rolesArr.push(role.role);
  });

  const total_roles = [
    "admin",
    "landfill_manager",
    "sts_manager",
    "unassigned",
  ];

  return (
    <>
      <h1 className={`text-xl text-center text-admin font-bold pt-10`}>
        Profile
      </h1>
      <UserProfileForm
        id={id}
        fname={first_name}
        lname={last_name}
        photo={photo}
        email={email}
        mobile={mobile}
        roles={rolesArr}
        sts_id={sts_id}
        landfill_id={landfill_id}
        total_roles={total_roles}
      />
    </>
  );
}

export const fetchCache = "force-no-store";
