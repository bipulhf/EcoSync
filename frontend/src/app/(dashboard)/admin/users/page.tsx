import Link from "next/link";
import { baseURL } from "../../../../../files";
import UserCard from "./UserCard";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/user`, { cache: "no-store" })
  ).json();
  return data;
};

export default async function Users() {
  const users = await getData();
  return (
    <div className="w-[80%] mx-auto my-10">
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
