import Image from "next/image";
import trashImg from "/public/trash800.png";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function NewPassword() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <main className="flex content-center items-center justify-between mx-[100px]">
        <div>
          <form>
            <label
              htmlFor="password"
              className="block mb-2 text-3xl text-admin font-bold"
            >
              New Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-admin text-admin text-2xl"
              placeholder="********"
            />
            <button
              className="bg-admin text-white font-medium text-2xl px-4 py-2 rounded-lg hover:underline"
              type="submit"
            >
              Change Password
            </button>
          </form>
        </div>
        <Image src={trashImg} alt="Trash" width={800} unoptimized />
      </main>
      <Footer />
    </div>
  );
}
