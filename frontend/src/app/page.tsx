import Image from "next/image";
import trashImg from "/public/trash800.png";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <main className="flex content-center items-center justify-between  mx-[100px]">
        <div>
          <h1 className="text-7xl font text-admin leading-tight">
            Crafting <b>Tomorrow&apos;s Dhaka</b> Through{" "}
            <b>Waste Innovation</b>
          </h1>
          <Link href={"/login"}>
            <button className="bg-admin text-white font-medium text-2xl px-6 py-3 rounded-lg mt-10 hover:underline hover:font-bold transition-all duration-300">
              Log In
            </button>
          </Link>
        </div>
        <Image src={trashImg} alt="Trash" width={800} unoptimized />
      </main>
      <Footer />
    </div>
  );
}
