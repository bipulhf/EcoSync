import WorkforceRegistrationForm from "./WorkforceRegistrationForm";

export default async function WorkforceRegistration() {
  return (
    <>
      <h1
        className={`text-xl lg:text-2xl text-center text-admin font-bold mt-10`}
      >
        Workforce Registration
      </h1>
      <WorkforceRegistrationForm />
    </>
  );
}
