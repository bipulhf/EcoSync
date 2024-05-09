"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";

const RolesPermissionsModal = ({ roles_permissions }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        Edit Permissions
      </Button>
      <Modal
        title={`${roles_permissions.role.toUpperCase()}'s Permissions`}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      ></Modal>
    </>
  );
};

export default RolesPermissionsModal;
