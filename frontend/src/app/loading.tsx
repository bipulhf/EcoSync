import logo from "@/../public/static/images/loading.png";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen min-w-full bg-white bg-opacity-20 flex justify-center items-center content-center">
      <Image src={logo} alt="logo" className="animate-pulse w-[150px]" />
    </div>
  );
}
