"use client";

import React, { useState } from "react";
import { Button, Modal, Table, TableProps } from "antd";
import Link from "next/link";

interface DataType {
  id: number;
  ward: number;
  distance_meter: number;
  capacity: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "STS ID",
    dataIndex: "id",
    key: "sts_id",
    render: (id) => <Link href={`/sts/${id}`}>{id}</Link>,
  },
  {
    title: "Ward No",
    dataIndex: "ward",
    key: "ward",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
    render: (capacity) => `${capacity} Tons`,
  },
  {
    title: "Distance",
    dataIndex: "distance_meter",
    key: "distance_meter",
    render: (distance_meter) => `${(distance_meter / 1000).toFixed(2)} km`,
  },
];

const StsModal = ({ sts }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        {sts.length} STS (see list)
      </Button>
      <Modal
        title="STS"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Table
          columns={columns}
          dataSource={sts}
          size="small"
          scroll={{ x: "max-content" }}
        />
      </Modal>
    </>
  );
};

export default StsModal;
