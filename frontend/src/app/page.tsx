import Image from "next/image";
import trashImg from "@/../public/static/images/trash800.png";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <main className="flex max-md:flex-col content-center items-center justify-between px-[30px] md:px-[100px] max-md:py-10">
        <div className="max-md:flex flex-col items-center">
          <h1 className="text-[5vw] md:text-[3.5vw] font text-admin leading-relaxed max-md:text-center">
            Crafting <b>Tomorrow&apos;s Dhaka</b> Through{" "}
            <b>Waste Innovation</b>
          </h1>
          <Link href={"/login"}>
            <Button className="bg-admin mt-5 hover:bg-admin hover:underline md:text-[1.5rem]">
              Login
            </Button>
          </Link>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src={trashImg}
            alt="Trash"
            width={800}
            unoptimized
            className="w-full"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
