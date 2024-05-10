export default function ContractorCard({ contractor }: any) {
  return (
    <>
      <div className="text-admin text-lg border-2 border-admin p-3 rounded-lg flex flex-col items-center text-center hover:text-white hover:bg-admin transition-all duration-150 hover:cursor-pointer max-sm:text-sm">
        <div>
          <h2>Contractor ID : {contractor.id}</h2>
          <h2 className="font-bold">
            Registration Date :{" "}
            {new Date(contractor.created_at).toLocaleDateString()}
          </h2>
          <h2>Mobile : {contractor.mobile}</h2>
          <h2>
            Required Amount Waste : {contractor.required_amount_waste * 1000} kg
          </h2>
          <h2>STS ID : {contractor.sts_id}</h2>
        </div>
      </div>
    </>
  );
}
