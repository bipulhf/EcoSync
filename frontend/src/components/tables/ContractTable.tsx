"use client";

import { Table } from "antd";

function ContractTable({ contracts }: any) {
  const columns = [
    {
      title: "Contract ID",
      dataIndex: "id",
      key: "contract_id",
    },
    {
      title: "Company Name",
      dataIndex: ["contractor", "company_name"],
      key: "company_name",
      filters: (
        contracts.map(
          (contract: any) => contract.contractor.company_name
        ) as any
      ).map((company: any) => ({
        text: company,
        value: company,
      })),
      onFilter: (value: any, record: any) =>
        (record.contractor.company_name = value),
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Contractor Registration Date",
      dataIndex: ["contractor", "created_at"],
      key: "registration_date",
      render: (text: any) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Contract Duration",
      dataIndex: "duration",
      key: "sts_departure_time",
      render: (text: any) => `${text} Days`,
    },
    {
      title: "Is Contract Valid?",
      dataIndex: "duration",
      key: "is_contract_valid",
      render: (text: any, row: any) =>
        new Date() <
        new Date(
          new Date(row.contractor.created_at).setDate(
            new Date(row.contractor.created_at).getDate() + text
          )
        )
          ? `Yes`
          : "No",
    },
  ];

  return (
    <Table
      // @ts-ignore
      columns={columns}
      dataSource={contracts}
      scroll={{ x: "max-content" }}
      style={{ width: "100%" }}
    ></Table>
  );
}
export default ContractTable;
