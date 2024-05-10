import CreateContractorForm from "./CreateContractorForm";

export default async function CreateContractorReport() {
  return (
    <>
      <h1
        className={`text-xl lg:text-2xl text-center text-admin font-bold mt-10`}
      >
        Contractor Registration
      </h1>
      <CreateContractorForm />
    </>
  );
}
