export default function StsCard({ sts }: any) {
  return (
    <div className="text-admin text-lg border-2 border-admin p-3 rounded-lg flex flex-col items-center text-center hover:text-white hover:bg-admin transition-all duration-150 hover:cursor-pointer max-sm:text-sm">
      <div>
        <h2>STS ID : {sts.id}</h2>
        <h2 className="font-bold">Ward No : {sts.ward}</h2>
        <h2>Capacity : {sts.capacity} Tons</h2>
        <h2>Landfill ID : {sts.landfill_id}</h2>
        <h2>Distance : {(sts.distance_meter / 1000).toFixed(2)} km</h2>
      </div>
    </div>
  );
}
