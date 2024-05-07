"use client";

import React from "react";
import {
  CarOutlined,
  HeatMapOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Divider } from "antd";
import { Tag } from "antd";
import Link from "next/link";
const { Sider } = Layout;

const label = ["STS", "Landfill", "Vehicle", "Profile"];
const items = [HomeOutlined, HeatMapOutlined, CarOutlined, UserOutlined].map(
  (icon, index) => ({
    key: label[index],
    icon: React.createElement(icon),
    label: <Link href={`/${label[index].toLowerCase()}`}>{label[index]}</Link>,
  })
);

const logout = [LogoutOutlined].map((icon) => ({
  key: "Logout",
  icon: React.createElement(icon),
  label: <Link href={`/logout`}>Logout</Link>,
}));

const color = [
  "gold",
  "purple",
  "blue",
  "green",
  "magenta",
  "geekblue",
  "cyan",
];

const Sidebar = ({
  id,
  name,
  sts_id,
  landfill_id,
  permissions,
  roles,
}: any) => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0" className="h-screen">
      <div className="flex flex-col gap-10">
        <div>
          <div className="p-5">
            {[...roles, ...roles, ...roles, ...roles].map((role: any) => (
              <Link href={`/${role}`} key={role} className="mb-2 inline-block">
                <Tag color={color[Math.floor(Math.random() * color.length)]}>
                  {role.toUpperCase()}
                </Tag>
              </Link>
            ))}
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
            theme="dark"
          />
        </div>
        <div>
          <h2 className="text-gray-300 text-[1rem] px-5 py-3">User Info: </h2>
          <h2 className="text-gray-300 px-10 pb-3">{name}</h2>
          <h2 className="text-gray-300 px-10 pb-3">User ID: {id}</h2>
          {sts_id && (
            <h2 className="text-gray-300 px-10 pb-3">STS Id: {sts_id}</h2>
          )}
          {landfill_id && (
            <h2 className="text-gray-300 px-10 pb-3">
              Landfill Id: {landfill_id}
            </h2>
          )}
        </div>
        <div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={logout}
            theme="dark"
          />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
