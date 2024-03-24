import Image from "next/image";
import trashImg from "/public/trash800.png";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ResetPassword() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <main className="flex content-center items-center justify-between mx-[100px]">
        <div>
          <form>
            <label
              htmlFor="email"
              className="block mb-2 text-3xl text-admin font-bold"
            >
              Reset Password:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-admin text-admin text-2xl"
              placeholder="user@mail.com"
            />
            <button
              className="bg-admin text-white font-medium text-2xl px-4 py-2 rounded-lg hover:underline"
              type="submit"
            >
              Send Link
            </button>
          </form>
        </div>
        <Image src={trashImg} alt="Trash" width={800} unoptimized />
      </main>
      <Footer />
    </div>
  );
}
