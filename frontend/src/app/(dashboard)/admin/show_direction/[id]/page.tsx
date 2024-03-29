import { cookies } from "next/headers";
import { baseURL } from "../../../../../../files";
import ShowDirection from "../../_components/show_direction";
const getData = async (id: string) => {
  const sts = await (
    await fetch(`${baseURL}/sts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `${cookies().get("jwt")?.value}`,
      },
    })
  ).json();

  return {
    sts,
  };
};

export default async function GetDirection({
  params,
}: {
  params: { id: string };
}) {
  const { sts } = await getData(params.id);

  return (
    <div className="pb-10 mt-5 mx-10 flex flex-col items-center">
      <div>
        <h1 className="text-4xl font-semibold text-center mb-5 text-admin">
          From STS ID: {sts.id} To Landfill ID: {sts.landfill.id}
        </h1>
      </div>
      <ShowDirection
        sts_position={{ lat: sts.latitute, lng: sts.longitude }}
        landfill_position={{
          lat: sts.landfill.latitute,
          lng: sts.landfill.longitude,
        }}
      />
    </div>
  );
}

export const fetchCache = "force-no-store";
