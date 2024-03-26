export default function VehicleGoingToLandfill({ landfill_vehicle }: any) {
  return (
    <div className="border-2 border-landfill rounded-lg p-3 my-5 bg-landfill_bg">
      <h2 className="text-2xl font-bold">Vechicles Going to Landfill:</h2>
      {landfill_vehicle.map((vehicle: any) => (
        <div
          className="text-landfill text-2xl font-medium my-3"
          key={vehicle.id}
        >
          <span className="mx-2">
            Left at: <b>{vehicle.departure_time}</b>
          </span>{" "}
          | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
          <span className="mx-2">{vehicle.vehicle.driver_name}</span> |{" "}
          <span className="mx-2 font-bold">
            {vehicle.vehicle.driver_mobile}
          </span>
        </div>
      ))}
    </div>
  );
}
