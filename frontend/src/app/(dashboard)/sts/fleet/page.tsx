import extractUserInfo from "@/utils/verify";
import { baseURL } from "../../../../../files";
import Link from "next/link";
import { getJWT } from "@/utils/actions";
import FleetTable from "../../../../components/tables/FleetTable";

const getData = async () => {
  const sts = await (
    await fetch(`${baseURL}/fleet`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return sts;
};

export default async function Fleet() {
  const sts = await getData();

  return (
    <div className="py-10 w-[95%] mx-auto">
      <h1 className="text-lg md:text-2xl text-sts_text text-center mb-5 font-bold">
        List for Fleet Optimization
      </h1>
      <FleetTable vehicle={sts} />
    </div>
  );
}
