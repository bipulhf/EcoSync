import Link from "next/link";
import { baseURL } from "../../../../files";
import { getJWT } from "@/utils/actions";
import { HomeOutlined } from "@ant-design/icons";
import StsCard from "./StsCard";
import extractUserInfo from "@/utils/verify";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/sts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return data;
};

export default async function Sts() {
  const sts = await getData();
  const { permissions } = await extractUserInfo();

  return (
    <div className="w-[95%] lg:w-[80%] mx-auto py-10">
      <div className="flex justify-between flex-row-reverse">
        {permissions.includes("CREATE_STS") && (
          <Link href={"/sts/create"}>
            <button className="px-5 py-2 bg-admin text-white rounded-lg hover:underline font-semibold">
              <HomeOutlined /> Add STS
            </button>
          </Link>
        )}
        <h2 className="text-admin text-2xl font-bold mb-10">
          <HomeOutlined /> STS List:{" "}
        </h2>
      </div>
      <div className="flex gap-4 flex-wrap max-md:justify-center">
        {sts.map((user: any) => (
          <Link href={`/sts/${user.id}`} key={user.id} className="w-[20%]">
            <StsCard sts={user} />
          </Link>
        ))}
      </div>
    </div>
  );
}
