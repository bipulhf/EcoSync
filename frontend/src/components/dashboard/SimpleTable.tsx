import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import Link from "next/link";

interface DataType {
  id: number;
  first_name: string;
  email: string;
  mobile: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "User ID",
    dataIndex: "id",
    key: "user_id",
    render: (id) => <Link href={`/users/${id}`}>{id}</Link>,
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    key: "mobile",
  },
];

const SimpleTables = ({ data }: { data: DataType[] }) => (
  <Table columns={columns} dataSource={data} />
);

export default SimpleTables;
