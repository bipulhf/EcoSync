"use client";

import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import Link from "next/link";
import { useFormState } from "react-dom";
import { workforceUpdate } from "@/utils/actions";

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

function removeDuplicates(arr: any[]) {
  let unique: any[] = arr.filter((obj, index) => {
    return index === arr.findIndex((o) => obj.value === o.value);
  });

  return unique;
}

const WorkforceMonitorTable = ({ contractor_monitor }: any) => {
  const [state, formAction] = useFormState(workforceUpdate, null);

  const dateArr = removeDuplicates(
    (contractor_monitor.map((contract: any) => contract.login) as any).map(
      (company: any) => ({
        text: new Date(company).toLocaleDateString(),
        value: new Date(company).toLocaleDateString(),
      })
    )
  );

  console.log(dateArr);
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: ["workforce", "full_name"],
      key: "full_name",
      render: (text, row: any) => (
        <Link href={`/workforces/${row.workforce.id}`}>{text}</Link>
      ),
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
      title: "Date",
      dataIndex: "login",
      key: "login",
      render: (text, row: any) => new Date(text).toLocaleDateString(),
      filters: dateArr,
      onFilter: (value: any, record: any) =>
        new Date(record.login).toLocaleDateString() === value,
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Update Entry",
      dataIndex: "id",
      key: "entry",
      render: (text, row: any) => (
        <form action={formAction}>
          <input type="hidden" name="workforce_id" value={text} />
          <button
            className={`px-2 py-1 rounded-lg hover:underline bg-admin text-white`}
            type="submit"
          >
            Update Entry
          </button>
        </form>
      ),
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

export default WorkforceMonitorTable;
