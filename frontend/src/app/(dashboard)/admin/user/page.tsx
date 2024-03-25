import UserRegistrationForm from "@/components/auth/user-registration";

export default async function UserRegistration() {
  return (
    <>
      <h1 className={`text-3xl text-center text-admin font-bold mt-10`}>
        User Registration
      </h1>
      <UserRegistrationForm />
    </>
  );
}
