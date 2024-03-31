"use client";

import { deleteUser, updateUserAdmin } from "@/utils/actions";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { baseURL } from "../../../../../../files";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center my-5">
      <button
        type="submit"
        className={`bg-admin hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
        disabled={pending}
      >
        {pending ? "Updating..." : "Update"}
      </button>
    </div>
  );
}

export default function UserProfileForm({
  id,
  fname,
  lname,
  photo,
  email,
  mobile,
  role,
  sts_id,
  landfill_id,
}: any) {
  const [user, setUser] = useState({
    first_name: fname,
    last_name: lname,
    photo,
    email,
    mobile,
    password: "",
    role,
    sts_id,
    landfill_id,
  });

  const [state, formAction] = useFormState(updateUserAdmin, null);
  const router = useRouter();
  const [del, setDel] = useState(false);
  const [image, setImage] = useState(photo);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <form
        className={`text-admin font-medium w-[80%] mx-auto text-2xl py-5`}
        action={formAction}
      >
        <div className="flex justify-around items-center">
          <input type="text" id="id" name="id" required value={id} hidden />
          <div className="w-full mr-10">
            <div className="mb-2">
              <label htmlFor="first_name" className="block mb-2">
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter your first name"
                value={user.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value as string })
                }
              />
            </div>

            <div className="mb-2">
              <label htmlFor="last_name" className="block mb-2">
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                value={user.last_name}
                placeholder="Enter your last name"
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value as string })
                }
              />
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                value={user.email}
                placeholder="Enter your email"
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value as string })
                }
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="block mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="(unchanged)"
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value as string })
                }
              />
            </div>

            <div className="mb-2">
              <label htmlFor="mobile" className="block mb-2">
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                placeholder="Enter your mobile number"
                value={user.mobile}
                onChange={(e) =>
                  setUser({ ...user, mobile: e.target.value as string })
                }
              />
            </div>
            <div className="mb-2 items-center">
              <label htmlFor="role" className="w-[30%] block mb-2">
                User Role
              </label>
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                id="role"
                name="role"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin bg-white`}
              >
                <option value="unassigned">Unassigned</option>
                <option value="sts_manager">STS Manager</option>
                <option value="landfill_manager">Landfill Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {user.role === "sts_manager" && (
              <div className="mb-2 items-center">
                <label htmlFor="sts_id" className="w-[30%] block mb-2">
                  Enter STS ID
                </label>
                <input
                  type="text"
                  id="sts_id"
                  name="sts_id"
                  required
                  value={user.sts_id}
                  onChange={(e) => setUser({ ...user, sts_id: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                  placeholder="Enter STS ID"
                />
              </div>
            )}
            {user.role === "landfill_manager" && (
              <div className="mb-2 items-center">
                <label htmlFor="landfill_id" className="w-[30%] block mb-2">
                  Enter Landfill ID
                </label>
                <input
                  type="text"
                  id="landfill_id"
                  name="landfill_id"
                  required
                  value={user.landfill_id}
                  onChange={(e) =>
                    setUser({ ...user, landfill_id: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
                  placeholder="Enter Landfill ID"
                />
              </div>
            )}
          </div>
          <div>
            <div className="mb-2">
              <label htmlFor="image" className="block mb-2">
                Upload Image:
              </label>
              <div className="my-10">
                <img
                  src={image}
                  width={200}
                  height={200}
                  alt={`${user.first_name + " " + user.last_name}'s photo`}
                  className="rounded-full size-[200px] overflow-hidden"
                />
                <input type="hidden" name="photo" value={image} />
              </div>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={async (e) => {
                  setLoading(true);
                  const data = new FormData();
                  data.append("file", e.target.files![0]);
                  data.append(
                    "upload_preset",
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
                  );
                  data.append(
                    "cloud_name",
                    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string
                  );
                  data.append("folder", "Cloudinary-React");

                  try {
                    const response = await fetch(
                      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                      {
                        method: "POST",
                        body: data,
                      }
                    );
                    const res = await response.json();
                    console.log(res);
                    setUser({ ...user, photo: res.secure_url });
                    setImage(res.secure_url);
                    setLoading(false);
                  } catch (error) {
                    setLoading(false);
                  }
                }}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-admin`}
              />
              <label htmlFor="image" className="block mb-2">
                {loading ? "Uploading..." : ""}
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-10">
          <Submit />
          <div className="flex justify-center my-5">
            <button
              className={`bg-red hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
              disabled={del}
              onClick={(e) => {
                if (confirm("Do you really want to delete this profile?")) {
                  setDel(true);
                  fetch(`${baseURL}/users/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                  }).then(() => {
                    setDel(false);
                    deleteUser();
                    router.replace("/admin/users");
                  });
                }
              }}
            >
              {del ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </form>
      {state?.message && (
        <p className="text-red text-2xl font-medium mt-4 text-center">
          {state.message}
        </p>
      )}
    </>
  );
}
