import Link from "next/link";
import { baseURL } from "../../../../../files";
import UserCard from "./UserCard";
import { cookies } from "next/headers";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();
  return data;
};

export default async function Users() {
  const users = await getData();
  return (
    <div className="w-[80%] mx-auto py-10">
      <h2 className="text-admin text-3xl font-bold mb-10">User List: </h2>
      <div className="grid grid-cols-4 gap-6">
        {users.map((user: any) => (
          <Link href={`/admin/users/${user.id}`} key={user.id}>
            <UserCard user={user} />
          </Link>
        ))}
      </div>
    </div>
  );
}
