import Image from "next/image";
import logo from "@/../public/static/images/logo.png";
import Link from "next/link";
import LogoutButton from "./Logout";
import extractUserInfo from "@/utils/verify";

export default async function UserHeader() {
  const { name, roles, photo, sts_id, landfill_id } = await extractUserInfo();
  let headerColor = "#6F6F6F";
  if (roles.includes("admin")) headerColor = "#4A75CB";
  else if (roles.includes("sts_manager")) headerColor = "#82B378";
  else if (roles.includes("landfill_manager")) headerColor = "#B84C42";

  return (
    <header>
      <header
        className={`w-full flex justify-between p-3`}
        style={{ backgroundColor: headerColor }}
      >
        <div className="mx-10">
          <Link href={`/${roles[0]}`}>
            <Image src={logo} alt="Logo" width={200} />
          </Link>
        </div>
        <div className="flex items-center mx-10">
          <Link href={`/profile`} className="flex items-center">
            <div className="flex flex-col text-right text-white mr-7">
              <h2 className="text-2xl">{(name as string).toUpperCase()}</h2>
              <h2 className="font-bold text-md">
                {(roles[0] as string).toUpperCase()}
              </h2>
              {sts_id && (
                <h2 className="font-bold text-md"> STS ID: {sts_id}</h2>
              )}
              {landfill_id && (
                <h2 className="font-bold text-md">
                  {" "}
                  Landfill ID: {landfill_id}
                </h2>
              )}
            </div>
            <div className="mr-10">
              <Image
                src={photo as string}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full size-[50px] overflow-hidden"
              />
            </div>
          </Link>
          <div>
            <LogoutButton />
          </div>
        </div>
      </header>
    </header>
  );
}