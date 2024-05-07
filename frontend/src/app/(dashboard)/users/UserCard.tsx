import Image from "next/image";

export default function UserCard({ user }: any) {
  const roles: any = [];
  user.roles.map((role: any) => {
    roles.push(role.role);
  });

  return (
    <div className="text-admin text-lg border-2 border-admin p-3 rounded-lg flex flex-col items-center text-center hover:text-white hover:bg-admin transition-all duration-150 hover:cursor-pointer max-sm:text-sm">
      <div className="mb-5">
        <Image
          src={user.profile_photo}
          alt="user"
          width={100}
          height={100}
          className="rounded-full size-[100px] overflow-hidden"
        />
      </div>
      <div>
        <h2>Name : {user.first_name + " " + user.last_name}</h2>
        <h2>
          Role : <b>{roles.join(", ").toUpperCase()}</b>
        </h2>
        <h2>Mobile : {user.mobile}</h2>
        {user.sts_id != null && <h2>STS Id : {user.sts_id}</h2>}
        {user.landfill_id != null && <h2>Landfill Id : {user.landfill_id}</h2>}
      </div>
    </div>
  );
}
