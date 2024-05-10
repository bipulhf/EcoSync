import ContractRegistrationForm from "./ContractRegistrationForm";

export default async function ContractorRegistration() {
  return (
    <>
      <h1
        className={`text-xl lg:text-2xl text-center text-admin font-bold mt-10`}
      >
        Contract Registration
      </h1>
      <ContractRegistrationForm />
    </>
  );
}
