import Image from "next/image";
import trashImg from "/public/trash800.png";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginForm from "@/components/auth/login-form";

export default function Login() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <main className="flex content-center items-center justify-between mx-[100px]">
        <div>
          <LoginForm />
        </div>
        <Image src={trashImg} alt="Trash" width={800} unoptimized />
      </main>
      <Footer />
    </div>
  );
}
