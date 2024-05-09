export default function LandfillCard({ landfill }: any) {
  return (
    <>
      <div className="text-admin text-lg border-2 border-admin p-3 rounded-lg flex flex-col items-center text-center hover:text-white hover:bg-admin transition-all duration-150 hover:cursor-pointer max-sm:text-sm">
        <div>
          <h2>STS ID : {landfill.id}</h2>
          <h2 className="font-bold">
            City Corporation : {landfill.city_corporation}
          </h2>
          <h2>
            Starting Time : {new Date(landfill.start_time).toLocaleTimeString()}
          </h2>
          <h2>
            Closing Time : {new Date(landfill.end_time).toLocaleTimeString()}
          </h2>
        </div>
      </div>
    </>
  );
}
