import VehiclesGoingToLandfill from "./VehiclesGoingToLandfill";
import VehiclesComingFromLandfill from "./VehiclesComingFromLandfill";
import WeeklyWasteAmountLandfill from "./WeeklyWasteAmountLandfill";
import DemoHeatmap from "./HeatMap";
import VechiclesInSTS from "./VehiclesInSts";
import VehicleInLandfill from "./VehiclesInLandfill";

export default async function UserContent({ permissions }: any) {
  return (
    <div style={{ margin: "24px 16px 0" }}>
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        {/* <DemoHeatmap /> */}
        {(permissions.includes("READ_LANDFILL_SELF") ||
          permissions.includes("READ_LANDFILL_ALL")) && (
          <WeeklyWasteAmountLandfill />
        )}
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
