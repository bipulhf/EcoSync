"use client";

import { Layout } from "antd";

const { Content } = Layout;

export default function UserContent() {
  return (
    <Content style={{ margin: "24px 16px 0" }}>
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      ></div>
    </Content>
  );
}
