import { getJWT } from "@/utils/actions";
import { baseURL } from "../../../../../files";
import UserRegistrationForm from "./UserRegistrationForm";

const getData = async () => {
  return await (
    await fetch(`${baseURL}/roles`, {
      headers: { Authorization: `Bearer ${await getJWT()}` },
    })
  ).json();
};

export default async function UserRegistration() {
  let total_roles = await getData();

  total_roles = total_roles.map((role: any) => role.role);

  return (
    <>
      <h1
        className={`text:xl md:text-2xl text-center text-admin font-bold mt-10`}
      >
        User Registration
      </h1>
      <UserRegistrationForm total_roles={total_roles} />
    </>
  );
}
