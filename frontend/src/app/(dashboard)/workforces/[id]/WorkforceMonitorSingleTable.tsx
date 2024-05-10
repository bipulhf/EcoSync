"use client";

import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import Link from "next/link";

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

const WorkforceMonitorSingleTable = ({ workforce_monitor }: any) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: ["workforce", "full_name"],
      key: "full_name",
    },
    {
      title: "Workforce ID",
      dataIndex: ["workforce", "id"],
      key: "workforce_id",
    },
    {
      title: "Workforce ID",
      dataIndex: ["workforce", "mobile"],
      key: "mobile_number",
    },
    {
      title: "Rate per Hour",
      dataIndex: ["workforce", "rate_per_hour"],
      key: "rate_per_hour",
      render: (text) => `${text} TK`,
    },
    {
      title: "Start Time",
      dataIndex: "login",
      key: "start_time",
      render: (text, row: any) =>
        row.leave_today ? "On Leave" : new Date(text).toLocaleTimeString(),
    },
    {
      title: "End Time",
      dataIndex: "logout",
      key: "end_time",
      render: (text, row: any) =>
        row.leave_today
          ? "On Leave"
          : text
          ? new Date(text).toLocaleTimeString()
          : "Still Working",
    },
    {
      title: "Leave Today?",
      dataIndex: "leave_today",
      key: "leave_today",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Over Time",
      dataIndex: "login",
      key: "over_time",
      render: (text, row: any) =>
        row.logout
          ? new Date(row.login).getTime() - new Date(row.logout!).getTime() >
            8 * 60 * 60 * 1000
            ? `Yes, Extra: ${new Date(
                new Date(row.login).getTime() -
                  new Date(row.logout!).getTime() -
                  8 * 60 * 60 * 1000
              ).toLocaleTimeString()}`
            : "No"
          : row.leave_today
          ? "On Leave"
          : "Still Working",
    },
    {
      title: "Date",
      dataIndex: "login",
      key: "login",
      render: (text, row: any) => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={workforce_monitor}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
      size="middle"
      scroll={{ x: "max-content" }}
    />
  );
};

export default WorkforceMonitorSingleTable;
