import extractUserInfo from "@/utils/verify";
import { baseURL } from "../../../../files";
import Image from "next/image";

const getData = async () => {
  const { id, role } = await extractUserInfo();
  const data = await (
    await fetch(`${baseURL}/user/${id}`, { cache: "no-store" })
  ).json();
  return {
    name: data.name,
    photo: data.photo,
    email: data.email,
    mobile: data.mobile,
    role,
  };
};

export default async function Profile() {
  const { name, photo, email, mobile, role } = await getData();
  let color = "black";
  if (role === "admin") color = "admin";
  else if (role === "sts-manager") color = "sts_text";
  else if (role === "landfill-manager") color = "landfill";
  return (
    <>
      <h1 className={`text-3xl text-center text-${color} font-bold mt-10`}>
        Profile
      </h1>
      <form
        className={`text-${color} font-medium w-[80%] mx-auto text-2xl my-10`}
      >
        <div className="flex justify-around items-center">
          <div className="w-full mr-10">
            <div className="mb-4">
              <label htmlFor="first_name" className="block mb-2">
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                placeholder="(unchanged)"
                value={name}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="last_name" className="block mb-2">
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                value={name}
                placeholder="(unchanged)"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                value={email}
                placeholder="(unchanged)"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                placeholder="(unchanged)"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mobile" className="block mb-2">
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                placeholder="(unchanged)"
                value={mobile}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="image" className="block mb-2">
                Upload Image:
              </label>
              <div className="my-10">
                <Image
                  src={photo}
                  width={200}
                  height={200}
                  alt={`${name + " " + name}'s photo`}
                  unoptimized
                  className="rounded-full"
                />
              </div>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-${color} hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export const fetchCache = "force-no-store";
