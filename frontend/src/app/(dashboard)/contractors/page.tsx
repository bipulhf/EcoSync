import Link from "next/link";
import { baseURL } from "../../../../files";
import { getJWT } from "@/utils/actions";
import extractUserInfo from "@/utils/verify";
import { AppstoreAddOutlined } from "@ant-design/icons";
import ContractorCard from "./ContractorCard";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/contractor`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function Contractors() {
  const contractors = await getData();
  const { permissions } = await extractUserInfo();

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto py-10">
      <div className="flex justify-between">
        <h2 className="text-admin text-2xl font-bold mb-10">
          <AppstoreAddOutlined /> Contractor List:{" "}
        </h2>
        {permissions.includes("CREATE_CONTRACTOR") && (
          <Link href={"/contractors/create"}>
            <button className="px-5 py-2 bg-admin text-white rounded-lg hover:underline font-semibold">
              <AppstoreAddOutlined /> Add Contractor
            </button>
          </Link>
        )}
      </div>
      <div className="flex gap-4 flex-wrap max-md:justify-center">
        {contractors.length ? (
          contractors.map((user: any) => (
            <Link
              href={`/contractors/${user.id}`}
              key={user.id}
              className="min-w-[20%]"
            >
              <ContractorCard contractor={user} />
            </Link>
          ))
        ) : (
          <h2>No Contractor Found</h2>
        )}
      </div>
    </div>
  );
}
