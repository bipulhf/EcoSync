import { Logout } from "@/utils/actions";

export default function LogoutButton() {
  return (
    <form action={Logout}>
      <button
        type="submit"
        className="text-white text-2xl hover:text-red transition-all duration-200"
      >
        <abbr title="Logout">⏻</abbr>
      </button>
    </form>
  );
}
