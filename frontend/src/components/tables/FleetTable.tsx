"use client";

import { Table, TableProps } from "antd";
import Link from "next/link";

interface DataType {
  vehicle_number: string;
  type: string;
  capacity: number;
  driver_name: string;
  driver_mobile: string;
  trip: number;
  transport: number;
  cost_loaded: number;
  travelling: boolean;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Vehicle Number",
    dataIndex: "vehicle_number",
    key: "vehicle_number",
    render: (vehicle_number) => (
      <Link href={`/sts/entry_vehicle?vehicle_number=${vehicle_number}`}>
        {vehicle_number}
      </Link>
    ),
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type) => type.toUpperCase(),
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
    render: (capacity) => `${capacity} Tons`,
  },
  {
    title: "Driver Name",
    dataIndex: "driver_name",
    key: "driver_name",
  },
  {
    title: "Drive Mobile",
    dataIndex: "driver_mobile",
    key: "drive_mobile",
  },
  {
    title: "Trip Remaining",
    dataIndex: "trip",
    key: "trip",
  },
  {
    title: "Can Transport",
    dataIndex: "transport",
    key: "transport",
    render: (transport, row) =>
      `${row.capacity} X ${row.trip} = ${row.capacity * row.trip} tons`,
  },
  {
    title: "Cost Per KM",
    dataIndex: "cost_loaded",
    key: "cost_loaded",
    render: (cost_loaded) => `${cost_loaded} ltr`,
  },
  {
    title: "Available?",
    dataIndex: "travelling",
    key: "travelling",
    render: (travelling) => (travelling ? "No" : "Yes"),
  },
];

const FleetTable = ({ vehicle }: any) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={vehicle}
        size="middle"
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default FleetTable;
