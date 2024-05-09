import LandfillRegistrationForm from "./LandfillRegistrationForm";

export default async function STSRegistration() {
  return (
    <>
      <h1
        className={`text-xl lg:text-2xl text-center text-admin font-bold mt-10`}
      >
        Landfill Registration
      </h1>
      <LandfillRegistrationForm />
    </>
  );
}
