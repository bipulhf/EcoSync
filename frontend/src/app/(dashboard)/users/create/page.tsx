import UserRegistrationForm from "@/components/dashboard/UserRegistrationForm";

export default async function UserRegistration() {
  const total_roles = [
    "unassigned",
    "admin",
    "sts_manager",
    "landfill_manager",
  ];

  return (
    <>
      <h1
        className={`text:xl md:text-2xl text-center text-admin font-bold mt-10`}
      >
        User Registration
      </h1>
      <UserRegistrationForm total_roles={total_roles} />
    </>
  );
}
