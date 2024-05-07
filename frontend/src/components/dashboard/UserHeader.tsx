"use client";

import Image from "next/image";
import logo from "@/../public/static/images/logo.png";
import { Layout } from "antd";

const { Header } = Layout;

export default function UserHeader({ roles }: any) {
  let headerColor = "#6F6F6F";
  if (roles.includes("admin")) headerColor = "#4A75CB";
  else if (roles.includes("landfill_manager")) headerColor = "#B84C42";
  else if (roles.includes("sts_manager")) headerColor = "#82B378";

  return (
    <Header
      style={{ padding: 5, background: headerColor }}
      className="flex justify-center"
    >
      <Image src={logo} alt="Logo" width={160} />
    </Header>
  );
}
