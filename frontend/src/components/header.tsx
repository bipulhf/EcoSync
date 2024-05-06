import Link from "next/link";
import logo from "@/../public/static/images/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-admin flex justify-center p-3">
      <Link href={"/"}>
        <Image src={logo} alt="Logo" width={275} />
      </Link>
    </header>
  );
}
