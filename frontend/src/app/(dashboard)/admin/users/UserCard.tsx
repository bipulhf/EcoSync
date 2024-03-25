import Image from "next/image";

export default function UserCard({ user }: any) {
  return (
    <div className="text-admin text-xl border-2 border-admin p-3 rounded-lg flex flex-col items-center text-center hover:text-white hover:bg-admin transition-all duration-150 hover:cursor-pointer">
      <div className="mb-5">
        <Image
          src={user.photo}
          alt="user"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div>
        <h2 className="text-2xl">Name : {user.name}</h2>
        <h2>
          Role : <b>{user.role.toUpperCase()}</b>
        </h2>
        <h2>Mobile : {user.mobile}</h2>
      </div>
    </div>
  );
}
