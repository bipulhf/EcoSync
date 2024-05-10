import { baseURL } from "../../../../../files";
import { getJWT } from "@/utils/actions";
import MultipleLocation from "@/components/dashboard/maps/MultipleLocation";
import StsModal from "@/components/tables/StsModal";
import ManagerModal from "@/components/dashboard/modals/ManagerModal";
import ContractsModal from "@/components/dashboard/modals/ContractModal";

const getData = async (id: string) => {
  const data = await (
    await fetch(`${baseURL}/contractor/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();

  const contracts = await (
    await fetch(`${baseURL}/contract/${id}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();

  return { data, contracts };
};

export default async function ContractorProfile({
  params,
}: {
  params: { id: string };
}) {
  const { data, contracts } = await getData(params.id);

  return (
    <>
      <div className="flex justify-center items-center content-center">
        <div className="px-10 pt-10 text-xl text-admin text-center">
          <div className="text-xl flex flex-col gap-2 text-admin mb-5">
            <h1 className={`font-bold italic mb-6`}>Contractor Information</h1>
            <h2 className="font-semibold">Contractor ID : {data.id}</h2>
            <h2>Company Name : {data.company_name}</h2>
            <h2>
              Registration Date :{" "}
              {new Date(data.created_at).toLocaleDateString()}
            </h2>
            <h2>TIN : {data.tin}</h2>
            <h2>Mobile : {data.mobile}</h2>
            <h2 className="font-bold">
              Payment Per Ton Waste : {data.payment_per_ton_waste} Tk
            </h2>
            <h2>
              Required Amount of Waste Per Day :{" "}
              {data.required_amount_waste * 1000} kg
            </h2>
          </div>
          <div>
            <ContractsModal contracts={contracts} />
          </div>
        </div>
      </div>
    </>
  );
}

export const fetchCache = "force-no-store";
