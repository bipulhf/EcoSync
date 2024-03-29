export default async function TotalWasteStoredThisWeek({ capacity }: any) {
  return (
    <div className="mt-10 mb-5">
      <h2 className="text-2xl">Total Waste Stored (this week):</h2>
      <h2 className="text-4xl text-landfill font-bold">
        {capacity ? capacity : 0} Tons
      </h2>
    </div>
  );
}
