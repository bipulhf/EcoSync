export default function VechiclesInSTS({
  sts_vehicle,
  leftSTS,
}: {
  sts_vehicle: any;
  leftSTS: any;
}) {
  return (
    <div className="border-2 border-sts_text rounded-lg p-3 my-5">
      <h2 className="text-2xl">Vechicles in STS:</h2>
      {sts_vehicle.map((vehicle: any) => (
        <form
          action={leftSTS}
          className="text-sts_text text-2xl font-medium my-3"
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
            className="mx-2 px-3 py-2 text-white text-xl bg-sts_text rounded-lg hover:bg-sts_primary transition-all duration-300"
          >
            Left STS
          </button>
        </form>
      ))}
    </div>
  );
}
