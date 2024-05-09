import { getJWT } from "@/utils/actions";
import { baseURL } from "../../../files";

const getData = async () => {
  const data = await (
    await fetch(`${baseURL}/landfill/weekly-waste`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${await getJWT()}` },
    })
  ).json();
  return data;
};

export default async function WeeklyWasteAmountLandfill() {
  const { weekly_waste_amount } = await getData();
  return (
    <div className="mb-5 text-center">
      <h2 className="text-md md:text-xl">Total Waste Stored (this week):</h2>
      <h2 className="text-lg md:text-2xl text-landfill font-bold">
        {weekly_waste_amount ? weekly_waste_amount : 0} Tons
      </h2>
    </div>
  );
}
