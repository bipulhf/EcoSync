import VehiclesGoingToLandfill from "./VehiclesGoingToLandfill";
import VehiclesComingFromLandfill from "./VehiclesComingFromLandfill";
import WeeklyWasteAmountLandfill from "./WeeklyWasteAmountLandfill";
import VechiclesInSTS from "./VehiclesInSts";
import VehicleInLandfill from "./VehiclesInLandfill";
import { baseURL } from "../../../files";
import { getJWT } from "@/utils/actions";
import PieChart from "./PieChart";
import CustomHeatMap from "./HeatMap";

const getData = async (text: string) => {
  let heat_map_data;
  if (text !== "")
    heat_map_data = await (
      await fetch(`${baseURL}/${text}/last-week-waste`, {
        headers: {
          Authorization: `Bearer ${await getJWT()}`,
        },
      })
    ).json();
  const vehicle_transported_waste = await (
    await fetch(`${baseURL}/vehicle/transported-waste`, {
      headers: {
        Authorization: `Bearer ${await getJWT()}`,
      },
    })
  ).json();
  return { vehicle_transported_waste, heat_map_data };
};

export default async function UserContent({ permissions }: any) {
  let path = permissions.includes("READ_LANDFILL_ALL")
    ? "landfill"
    : permissions.includes("READ_LANDFILL_SELF")
    ? "sts"
    : "";
  const { vehicle_transported_waste, heat_map_data } = await getData(path);
  return (
    <div style={{ margin: "24px 16px 0" }}>
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        {(permissions.includes("READ_LANDFILL_SELF") ||
          permissions.includes("READ_LANDFILL_ALL")) && (
          <WeeklyWasteAmountLandfill />
        )}

        <div className="flex items-center max-lg:flex-col flex-wrap justify-evenly max-[500px]:hidden">
          {(permissions.includes("READ_LANDFILL_ALL") ||
            permissions.includes("READ_LANDFILL_SELF")) && (
            <div className="w-[80%] lg:w-[45%]">
              <CustomHeatMap
                data={heat_map_data}
                xField={path + "_id"}
                yField="date"
              />
            </div>
          )}

          {(permissions.includes("READ_VEHICLE_ALL") ||
            permissions.includes("READ_LANDFILL_SELF") ||
            permissions.includes("READ_VEHICLE_SELF")) && (
            <div className="w-[80%] lg:w-[30%]">
              <PieChart
                data={vehicle_transported_waste}
                text={`Total Waste\nTransported\nby Different\nTypes of\nVehicles`}
              />
            </div>
          )}
        </div>
        {permissions.includes("STS_VEHICLE_UPDATE") && <VechiclesInSTS />}
        {((permissions.includes("READ_VEHICLE_SELF") &&
          permissions.includes("READ_LANDFILL_SELF")) ||
          permissions.includes("READ_VEHICLE_ALL")) && (
          <VehiclesGoingToLandfill permissions={permissions} />
        )}
        {permissions.includes("LANDFILL_VEHICLE_UPDATE") && (
          <VehicleInLandfill />
        )}
        {((permissions.includes("READ_STS_SELF") &&
          permissions.includes("READ_VEHICLE_SELF")) ||
          permissions.includes("READ_VEHICLE_ALL")) && (
          <VehiclesComingFromLandfill />
        )}
      </div>
    </div>
  );
}
