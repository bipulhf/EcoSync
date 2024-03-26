import Image from "next/image";
import logo from "/public/logo.png";
import Link from "next/link";
import LogoutButton from "./logout";
import extractUserInfo from "@/utils/verify";

export default async function UserHeader() {
  const { name, role, photo } = await extractUserInfo();
  let headerColor = "#6F6F6F";
  if (role === "admin") headerColor = "#4A75CB";
  else if (role === "sts-manager") headerColor = "#82B378";
  else if (role === "landfill-manager") headerColor = "#B84C42";

  return (
    role && (
      <header>
        <header
          className={`w-full flex justify-between p-3`}
          style={{ backgroundColor: headerColor }}
        >
          <div className="mx-10">
            <Link href={`/${role}`}>
              <Image src={logo} alt="Logo" width={200} />
            </Link>
          </div>
          <div className="flex items-center mx-10">
            <Link href={`/profile`} className="flex">
              <div className="flex flex-col text-right text-white mr-7">
                <h2 className="text-2xl">{(name as string).toUpperCase()}</h2>
                <h2 className="font-bold text-md">
                  {(role as string).toUpperCase()}
                </h2>
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
    )
  );
}
