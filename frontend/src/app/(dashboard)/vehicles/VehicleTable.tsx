"use client";

import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  vehicle_number: string;
  capacity: number;
  type: string;
  sts_id: number;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const VehicleTable = ({ vehicles }: any) => {
  const stsList: any[] = [];
  vehicles.map((vehicle: any) => {
    stsList.push({ text: vehicle.sts_id, value: vehicle.sts_id });
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Vehicle Number",
      dataIndex: "vehicle_number",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Capacity (in tons)",
      dataIndex: "capacity",
    },
    {
      title: "STS ID",
      dataIndex: "sts_id",
      showSorterTooltip: { target: "full-header" },
      filters: stsList,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.sts_id === value,
      sorter: (a, b) => a.sts_id - b.sts_id,
      sortDirections: ["descend"],
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={vehicles}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default VehicleTable;
