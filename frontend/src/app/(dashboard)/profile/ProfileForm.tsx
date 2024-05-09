"use client";

import { updateUser } from "@/utils/actions";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import ChangePasswordModal from "./ChangePasswordModal";

function Submit({ color }: any) {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center my-5">
      <button
        type="submit"
        className={`bg-${color} hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
        disabled={pending}
      >
        {pending ? "Updating..." : "Update"}
      </button>
    </div>
  );
}

export default function ProfileForm({
  id,
  color,
  fname,
  lname,
  photo,
  email,
  mobile,
  roles,
}: any) {
  const [user, setUser] = useState({
    first_name: fname,
    last_name: lname,
    photo,
    email,
    mobile,
  });

  const [image, setImage] = useState(user.photo);
  const [loading, setLoading] = useState(false);
  const rolesString = roles.join(", ");

  const [state, formAction] = useFormState(updateUser, null);

  return (
    <>
      <form
        className={`text-${color} font-medium w-[80%] mx-auto text-lg lg:text-xxl my-5`}
        action={formAction}
      >
        <div className="flex justify-around items-center max-md:flex-col-reverse">
          <input type="text" id="id" name="id" required value={id} hidden />
          <div className="w-full mr-10">
            <div className="mb-2 md:max-w-[90%]">
              <label htmlFor="first_name" className="block mb-2">
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                placeholder="Enter your first name"
                value={user.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value as string })
                }
              />
            </div>

            <div className="mb-2 md:max-w-[90%]">
              <label htmlFor="last_name" className="block mb-2">
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                value={user.last_name}
                placeholder="Enter your last name"
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value as string })
                }
              />
            </div>

            <div className="mb-2 md:max-w-[90%]">
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                value={user.email}
                placeholder="Enter your email"
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value as string })
                }
              />
            </div>

            <div className="mb-2 md:max-w-[90%]">
              <label htmlFor="mobile" className="block mb-2">
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                placeholder="Enter your mobile number"
                value={user.mobile}
                onChange={(e) =>
                  setUser({ ...user, mobile: e.target.value as string })
                }
              />
            </div>
            <div className="mb-2 md:max-w-[90%]">
              <label htmlFor="role" className="block mb-2">
                Role:
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
                value={rolesString.toUpperCase()}
                disabled
              />
            </div>
            <div className="mt-5">
              <ChangePasswordModal />
            </div>
          </div>
          <div>
            <div className="mb-2 md:max-w-[90%]">
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
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-${color}`}
              />
              <label htmlFor="image" className="block mb-2">
                {loading ? "Uploading..." : ""}
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Submit color={color} />
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
