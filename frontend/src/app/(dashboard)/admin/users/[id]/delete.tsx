"use client";

import { deleteUser } from "@/utils/actions";
import { useFormState, useFormStatus } from "react-dom";

function Delete() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center my-5">
      <button
        className={`bg-red hover:underline transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
        disabled={pending}
        type="submit"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default function DeleteForm({ id }: any) {
  const [state, formAction] = useFormState(deleteUser, null);
  return (
    <form action={formAction}>
      <input type="text" id="id" name="id" required value={id} hidden />
      <Delete />
    </form>
  );
}
