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
) => {};

const ContractorMonitorTable = ({ contractor_monitor }: any) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: ["contractor", "company_name"],
      key: "full_name",
    },
    {
      title: "Waste Amount",
      dataIndex: "waste_amount",
      key: "waste_amount",
      render: (text) => `${text * 1000} kg`,
    },
    {
      title: "Type of Waste",
      dataIndex: "type_of_waste",
      key: "type_of_waste",
      render: (text) => text.toUpperCase(),
      filters: (
        contractor_monitor.map((contract: any) => contract.type_of_waste) as any
      ).map((company: any) => ({
        text: company,
        value: company,
      })),
      onFilter: (value: any, record: any) => record.type_of_waste === value,
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
      render: (text) => text.toUpperCase(),
      filters: (
        contractor_monitor.map((contract: any) => contract.vehicle_type) as any
      ).map((company: any) => ({
        text: company,
        value: company,
      })),
      onFilter: (value: any, record: any) => record.vehicle_type === value,
      filterMode: "tree",
      filterSearch: true,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={contractor_monitor}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
      size="middle"
      scroll={{ x: "max-content" }}
    />
  );
};

export default ContractorMonitorTable;
