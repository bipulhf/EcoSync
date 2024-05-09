import Image from "next/image";
import trashImg from "@/../public/static/images/trash800.png";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ConfirmPasswordForm from "@/components/auth/confirm-password";

export default function NewPassword() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <main className="flex max-md:flex-col content-center items-center justify-between px-[30px] md:px-[100px] max-md:py-10">
        <div>
          <ConfirmPasswordForm />
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
