export default function VehicleInLandfill({
  landfill_vehicle,
  leftLandfill,
}: any) {
  return (
    <div className="border-2 border-landfill rounded-lg p-3 my-5">
      <h2 className="text-2xl">Vechicles in Landfill:</h2>
      {landfill_vehicle.map((vehicle: any) => (
        <form
          action={leftLandfill}
          className="text-landfill text-2xl font-medium my-3"
          key={vehicle.id}
        >
          <input name="id" value={vehicle.id} type="hidden" />
          <span className="mx-2">
            Arrived at: <b>{vehicle.arrival_time}</b>
          </span>{" "}
          | <span className="mx-2">{vehicle.vehicle.vehicle_number}</span> |{" "}
          <span className="mx-2">{vehicle.vehicle.driver_name}</span>
          <button
            type="submit"
            className="mx-2 px-3 py-2 text-white text-xl bg-landfill rounded-lg hover:underline transition-all duration-300"
          >
            Left Landfill
          </button>
        </form>
      ))}
    </div>
  );
}
