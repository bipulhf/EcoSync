"use client";

import { Table } from "antd";
import { useState, useEffect } from "react";
import { downloadReport, getReport } from "@/utils/actions";

function ReportTable({ sts_id_list, vehicle_number_list }: any) {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords(1, 10);
  }, []);
  const columns = [
    {
      title: "STS ID",
      dataIndex: ["sts_vehicle", "sts_id"],
      key: "sts_id",
      filters: sts_id_list,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record: any) => record.sts_vehicle.sts_id == value,
    },
    {
      title: "Vehicle Number",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      filters: vehicle_number_list,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record: any) => record.vehicle_number == value,
    },
    {
      title: "STS Arrival Time",
      dataIndex: ["sts_vehicle", "arrival_time"],
      key: "sts_arrival_time",
      render: (text: any) => (
        <p>
          {new Date(text).toLocaleTimeString()}
          <p className="text-[12px]">{new Date(text).toLocaleDateString()}</p>
        </p>
      ),
    },
    {
      title: "STS Departure Time",
      dataIndex: ["sts_vehicle", "departure_time"],
      key: "sts_departure_time",
      render: (text: any) => (
        <p>
          {new Date(text).toLocaleTimeString()}
          <p className="text-[12px]">{new Date(text).toLocaleDateString()}</p>
        </p>
      ),
    },
    {
      title: "Landfill Arrival Time",
      dataIndex: "arrival_time",
      key: "landfill_arrival_time",
      render: (text: any) => (
        <p>
          {new Date(text).toLocaleTimeString()}
          <p className="text-[12px]">{new Date(text).toLocaleDateString()}</p>
        </p>
      ),
    },
    {
      title: "Landfill Departure Time",
      dataIndex: "departure_time",
      key: "landfill_departure_time",
      render: (text: any) => (
        <p>
          {new Date(text).toLocaleTimeString()}
          <p className="text-[12px]">{new Date(text).toLocaleDateString()}</p>
        </p>
      ),
    },
    {
      title: "Capacity",
      dataIndex: ["vehicle", "capacity"],
      key: "capacity",
      render: (text: any) => `${text} Tons`,
    },
    {
      title: "Volume of Waste",
      dataIndex: "waste_volume",
      key: "waste_volume",
      render: (text: any) => `${text} Tons`,
    },
    {
      title: "Cost",
      dataIndex: "waste_volume",
      key: "cost",
      render: (text: any, item: any) =>
        `${(
          (item.vehicle.cost_per_km_unloaded +
            (item.waste_volume / item.vehicle.capacity) *
              (item.vehicle.cost_per_km_loaded -
                item.vehicle.cost_per_km_unloaded)) *
          (item.sts_vehicle.sts.distance_meter / 1000)
        ).toFixed(2)} ltr`,
    },
    {
      title: "Download Bill",
      dataIndex: "download",
      key: "download",
      render: (text: any, item: any) => (
        <button
          className={`px-2 py-1 rounded-lg hover:underline bg-admin text-white`}
          onClick={() => {
            downloadReport(item.id);
          }}
        >
          Download Bill
        </button>
      ),
    },
  ];

  const fetchRecords = (page: number, pageSize: number) => {
    setLoading(true);
    getReport(page, pageSize).then((data) => {
      setDataSource(data.data);
      setTotal(data.total);
      setLoading(false);
    });
  };

  return (
    <Table
      loading={loading}
      // @ts-ignore
      columns={columns}
      dataSource={dataSource}
      pagination={{
        total,
        onChange: (page, pageSize) => {
          fetchRecords(page, pageSize);
        },
      }}
      size="middle"
      scroll={{ x: "max-content" }}
    ></Table>
  );
}
export default ReportTable;
