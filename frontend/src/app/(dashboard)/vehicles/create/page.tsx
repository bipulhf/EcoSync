import VechicleRegistrationForm from "./VehicleRegistrationForm";

export default async function VechicleRegistration() {
  return (
    <>
      <h1
        className={`text:xl md:text-2xl text-center text-admin font-bold mt-10`}
      >
        Vehicle Registration
      </h1>
      <VechicleRegistrationForm />
    </>
  );
}
