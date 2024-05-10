"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import ContractTable from "@/components/tables/ContractTable";

const ContractsModal = ({ contracts }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        See Contracts
      </Button>
      <Modal
        title="Contracts"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <ContractTable contracts={contracts} />
      </Modal>
    </>
  );
};

export default ContractsModal;
