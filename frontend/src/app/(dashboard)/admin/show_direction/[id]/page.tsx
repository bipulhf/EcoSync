import { cookies } from "next/headers";
import { baseURL } from "../../../../../../files";
import ShowDirection from "../../_components/show_direction";
import { convertSecondsToTime } from "@/utils/timeconvert";
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
  const sts_postition = { lat: sts.latitude, lng: sts.longitude };
  const landfill_position = {
    lat: sts.landfill.latidute,
    lng: sts.landfill.longitude,
  };

  return (
    <div className="pb-10 mt-5 mx-10 flex flex-col items-center">
      <div>
        <h1 className="text-3xl font-semibold text-center mb-5 text-admin">
          From STS ID: {sts.id} To Landfill ID: {sts.landfill.id}
        </h1>
      </div>
      <div>
        <h1 className="text-xl font-bold text-center mb-5 text-admin">
          Distance: {(sts.distance_meter / 1000).toFixed(2)} km, Estimated Time:{" "}
          {convertSecondsToTime(sts.possible_time_sec)}
        </h1>
      </div>
      <ShowDirection
        sts_position={{
          lat: sts.latitude as number,
          lng: sts.longitude as number,
        }}
        landfill_position={{
          lat: sts.landfill.latitude as number,
          lng: sts.landfill.longitude as number,
        }}
      />
    </div>
  );
}

export const fetchCache = "force-no-store";
