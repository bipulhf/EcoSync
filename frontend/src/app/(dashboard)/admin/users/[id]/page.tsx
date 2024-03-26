import Image from "next/image";
import { baseURL } from "../../../../../../files";
import { useState } from "react";

const getData = async (id: string) => {
  const data = await (
    await fetch(`${baseURL}/user/${id}`, { cache: "no-store" })
  ).json();
  return {
    dname: data.name,
    dphoto: data.photo,
    demail: data.email,
    dmobile: data.mobile,
  };
};

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const { dname, dphoto, demail, dmobile } = await getData(params.id);
  //   const [name, setName] = useState(dname);
  //   const [email, setEmail] = useState(demail);
  //   const [password, setPassword] = useState("");
  //   const [mobile, setMobile] = useState(dmobile);
  return (
    <>
      <h1 className={`text-3xl text-center text-admin font-bold mt-10`}>
        Profile
      </h1>
      <form className={`text-admin font-medium w-[80%] mx-auto text-2xl my-10`}>
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="(unchanged)"
                value={dname}
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                value={dname}
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                value={demail}
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="(unchanged)"
                value={dmobile}
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
                  src={dphoto}
                  width={200}
                  height={200}
                  alt={`${dname + " " + dname}'s photo`}
                  unoptimized
                  className="rounded-full size-[200px] overflow-hidden"
                />
              </div>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-admin hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export const fetchCache = "force-no-store";
