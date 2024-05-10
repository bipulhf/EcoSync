"use client";

import { Table } from "antd";

function WorkforceTable({ workforce }: any) {
  const columns = [
    {
      title: "Workforce ID",
      dataIndex: "workforce_id",
      key: "contract_id",
    },
    {
      title: "Name",
      dataIndex: ["workforce", "full_name"],
      key: "full_name",
    },
    {
      title: "Mobile",
      dataIndex: ["workforce", "mobile"],
      key: "mobile",
    },
    {
      title: "Job Title",
      dataIndex: ["workforce", "job_title"],
      key: "job_title",
      filters: (
        workforce.map(
          (single_workforce: any) => single_workforce.workforce.job_title
        ) as any
      ).map((company: any) => ({
        text: company,
        value: company,
      })),
      onFilter: (value: any, record: any) =>
        record.workforce.job_title === value,
      filterMode: "tree",
      filterSearch: true,
    },
    {
      title: "Rate Per Hour",
      dataIndex: ["workforce", "rate_per_hour"],
      key: "rate_per_hour",
      render: (text: any) => `${text} TK`,
    },
    {
      title: "Company Name",
      dataIndex: ["contractor", "company_name"],
      key: "company_name",
      filters: (
        workforce.map(
          (contract: any) => contract.contractor.company_name
        ) as any
      ).map((company: any) => ({
        text: company,
        value: company,
      })),
      onFilter: (value: any, record: any) =>
        record.contractor.company_name === value,
      filterMode: "tree",
      filterSearch: true,
    },
  ];

  return (
    <Table
      // @ts-ignore
      columns={columns}
      dataSource={workforce}
      scroll={{ x: "max-content" }}
      style={{ width: "100%" }}
    ></Table>
  );
}
export default WorkforceTable;
