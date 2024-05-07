import ShowDirection from "./ShowDirection";
import { convertSecondsToTime } from "@/utils/timeconvert";

export default async function GetDirection({ sts }: any) {
  return (
    <div className="pb-10 mt-5 mx-10 flex flex-col items-center">
      <div>
        <h1 className="text-xl font-semibold text-center mb-5 text-admin">
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
