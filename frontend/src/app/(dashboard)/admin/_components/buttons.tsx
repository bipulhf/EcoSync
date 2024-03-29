import Link from "next/link";

export default function Buttons() {
  return (
    <div className="text-2xl font-semibold text-white flex justify-evenly pb-10">
      <Link href={"/admin/user"}>
        <button className="px-8 py-2 bg-admin rounded-lg hover:underline">
          Add User
        </button>
      </Link>
      <Link href={"/admin/users"}>
        <button className="px-8 py-2 bg-unassigned rounded-lg hover:underline">
          User List
        </button>
      </Link>
      <Link href={"/admin/vehicle-registration"}>
        <button className="px-8 py-2 bg-landfill rounded-lg hover:underline">
          Add Vehicle
        </button>
      </Link>
      <Link href={"/admin/sts-registration"}>
        <button className="px-8 py-2 bg-sts_text rounded-lg hover:underline">
          Add STS
        </button>
      </Link>
      <Link href={"/admin/report"}>
        <button className="px-8 py-2 bg-admin rounded-lg hover:underline">
          Billing Report
        </button>
      </Link>
    </div>
  );
}
