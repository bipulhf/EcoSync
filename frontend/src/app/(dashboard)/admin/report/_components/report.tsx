"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { downloadReport } from "@/utils/actions";
import { getTimeFromDate } from "@/utils/timeconvert";

interface Props {
  query: string;
  type: string;
  pageNo: number;
}

export default function ReportTable({ query, type, pageNo }: Props) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(pageNo || 1);

  useEffect(() => {
    setIndex(pageNo);
  }, [pageNo]);

  useEffect(() => {
    if (query) {
      fetch(
        `http://localhost:8000/report?pageNo=${pageNo}&query=${query}&type=${type}`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setItems(data.data);
          setHasMore(!data.isLast);
          setIndex(index + 1);
        });
    } else {
      fetch(`http://localhost:8000/report?pageNo=1`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data.data);
          setHasMore(!data.isLast);
          setIndex(index + 1);
        });
    }
  }, [query, type]);

  const fetchMoreData = async () => {
    let data: any;
    if (query) {
      data = await (
        await fetch(
          `http://localhost:8000/report?pageNo=${index}&query=${query}&type=${type}`,
          {
            credentials: "include",
          }
        )
      ).json();
      // @ts-ignore
      setItems((prevItems) => [...prevItems, ...data.data]);
      setHasMore(!data.isLast);
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      data = await (
        await fetch(`http://localhost:8000/report?pageNo=${index}`, {
          credentials: "include",
        })
      ).json();
      // @ts-ignore
      setItems((prevItems) => [...prevItems, ...data.data]);
      setHasMore(!data.isLast);
      setIndex(index + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
    >
      <table className="text-center w-full text-xl">
        <thead>
          <tr className="border-b-2 border-admin">
            <th className="py-4">SL</th>
            <th className="py-4">STS ID</th>
            <th className="py-4">Vehicle Number</th>
            <th className="py-4">STS Arrival Time</th>
            <th className="py-4">STS Departure Time</th>
            <th className="py-4">Landfill Arrival Time</th>
            <th className="py-4">Landfill Departure Time</th>
            <th className="py-4">Vehicle Capacity</th>
            <th className="py-4">Volume of Waste</th>
            <th className="py-4">Cost</th>
            <th className="py-4"></th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item: any, index: any) => (
              <tr key={item.id} className="border-b-2 border-admin">
                <td className="py-4">{index + 1}</td>
                <td className="py-4">{item.sts_id}</td>
                <td className="py-4">
                  {item.vehicle.vehicle_number}
                  <br />
                  <h2 className="text-sm">
                    {(item.sts.distance_meter / 1000).toFixed(2)}km |{" "}
                    {(item.sts.possible_time_sec / 60).toFixed(0)} min
                  </h2>
                </td>
                <td className="py-4">
                  {item.arrival_time
                    ? getTimeFromDate(new Date(item.arrival_time))
                    : "Not Arrived"}
                </td>
                <td className="py-4">
                  {item.departure_time
                    ? getTimeFromDate(new Date(item.departure_time))
                    : "In STS"}
                </td>
                <td className="py-4">
                  {item.Landfill_Vehicle
                    ? item.Landfill_Vehicle.arrival_time
                      ? getTimeFromDate(
                          new Date(item.Landfill_Vehicle.arrival_time)
                        )
                      : "Not Arrived"
                    : "Not Arrived"}
                </td>
                <td className="py-4">
                  {item.Landfill_Vehicle
                    ? item.Landfill_Vehicle.arrival_time
                      ? item.Landfill_Vehicle.departure_time
                        ? getTimeFromDate(
                            new Date(item.Landfill_Vehicle.departure_time)
                          )
                        : "In Landfill"
                      : "Not Arrived"
                    : "Not Arrived"}
                </td>
                <td className="py-4">{item.vehicle.capacity}</td>
                <td className="py-4">{item.waste_volume}</td>
                <td className="py-4 font-bold text-landfill">
                  {(
                    (item.vehicle.cost_per_km_unload +
                      (item.waste_volume / item.vehicle.capacity) *
                        (item.vehicle.cost_per_km_load -
                          item.vehicle.cost_per_km_unload)) *
                    (item.sts.distance_meter / 1000)
                  ).toFixed(2)}{" "}
                  ltr
                </td>
                <td className="py-4">
                  <button
                    className={`p-3 rounded-lg ${
                      item.Landfill_Vehicle.departure_time
                        ? "hover:underline bg-admin"
                        : "bg-unassigned"
                    } text-white`}
                    disabled={!item.Landfill_Vehicle.departure_time}
                    onClick={() => {
                      downloadReport(item.id);
                    }}
                  >
                    Download Bill
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}
