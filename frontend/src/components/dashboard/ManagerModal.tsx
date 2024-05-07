"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import SimpleTables from "./SimpleTable";

const ManagerModal = ({ managers }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        {managers.length} managers (see list)
      </Button>
      <Modal
        title="Managers"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <SimpleTables data={managers} />
      </Modal>
    </>
  );
};

export default ManagerModal;
