"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";

const VehicleModal = ({ vehicles }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        {vehicles.length} vehicles (see list)
      </Button>
      <Modal
        title="Vehicles"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default VehicleModal;
