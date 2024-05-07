import Link from "next/link";
import UserCard from "./UserCard";
import { baseURL } from "../../../../files";
import { getJWT } from "@/utils/actions";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function Users() {
  const users = await getData();
  return (
    <div className="w-[95%] lg:w-[80%] mx-auto py-10">
      <div className="flex justify-between flex-row-reverse">
        <Link href={"/users/create"}>
          <button className="px-5 py-2 bg-admin text-white rounded-lg hover:underline font-semibold">
            <UserAddOutlined /> Add User
          </button>
        </Link>
        <h2 className="text-admin text-2xl font-bold mb-10">
          <UsergroupAddOutlined /> User List:{" "}
        </h2>
      </div>
      <div className="flex gap-4 flex-wrap max-md:justify-center">
        {users.map((user: any) => (
          <Link href={`/users/${user.id}`} key={user.id} className="w-[20%]">
            <UserCard user={user} />
          </Link>
        ))}
      </div>
    </div>
  );
}
