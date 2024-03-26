import STSRegistrationForm from "./sts_registration";

export default async function STSRegistration() {
  return (
    <>
      <h1 className={`text-3xl text-center text-admin font-bold mt-10`}>
        Secondary Transfer Station (STS) Registration
      </h1>
      <STSRegistrationForm />
    </>
  );
}
