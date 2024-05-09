"use client";

import { Layout } from "antd";

const { Footer } = Layout;

export default function UserFooter() {
  return (
    <Footer style={{ textAlign: "center" }}>
      EcoSync © {new Date().getFullYear()} Created by Homo_sapiens
    </Footer>
  );
}
