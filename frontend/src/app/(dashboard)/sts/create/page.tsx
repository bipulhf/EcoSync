import STSRegistrationForm from "./StsRegistrationForm";

export default async function STSRegistration() {
  return (
    <>
      <h1
        className={`text-xl lg:text-2xl text-center text-admin font-bold mt-10`}
      >
        Secondary Transfer Station (STS) Registration
      </h1>
      <STSRegistrationForm />
    </>
  );
}
