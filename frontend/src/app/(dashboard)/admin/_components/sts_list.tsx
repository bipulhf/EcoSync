import { distance } from "@/utils/distance";
import Link from "next/link";

interface Props {
  sts: Array<any>;
}
export default function STSList({ sts }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-center mb-5">STS List</h1>
      <table>
        <thead className="text-2xl text-center">
          <tr>
            <th className="min-w-[5rem]">ID</th>
            <th className="min-w-[10rem]">Ward</th>
            <th className="min-w-[10rem]">Capacity</th>
            <th className="min-w-[10rem]">Distance</th>
            <th className="min-w-[10rem]"></th>
          </tr>
        </thead>
        <tbody className="text-3xl text-center">
          {sts.map((sts: any) => (
            <tr
              key={sts.id}
              className="hover:text-landfill transition-all duration-200"
            >
              <td className="min-w-[5rem]">{sts.id}</td>
              <td className="min-w-[10rem]">{sts.ward}</td>
              <td className="min-w-[10rem]">{sts.capacity} Tons</td>
              <td className="min-w-[10rem]">
                {(sts.distance_meter / 1000).toFixed(2)} km
              </td>
              <td className="min-w-[10rem]">
                <Link href={`/admin/show_direction/${sts.id}`} target="_blank">
                  <button className="bg-admin text-white px-2 py-1 rounded-lg font-bold text-lg hover:underline transition-all duration-300">
                    Show Direction
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
