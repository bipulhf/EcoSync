import VechicleRegistrationForm from "./vehicle_registration";

export default async function VechicleRegistration() {
  return (
    <>
      <h1 className={`text-3xl text-center text-admin font-bold mt-10`}>
        Vehicle Registration
      </h1>
      <VechicleRegistrationForm />
    </>
  );
}
