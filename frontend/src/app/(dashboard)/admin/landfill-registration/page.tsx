import LandfillRegistrationForm from "./landfill_registration";

export default async function STSRegistration() {
  return (
    <>
      <h1 className={`text-3xl text-center text-admin font-bold mt-10`}>
        Landfill Registration
      </h1>
      <LandfillRegistrationForm />
    </>
  );
}
