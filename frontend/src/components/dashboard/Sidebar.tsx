"use client";

import React from "react";
import {
  BarChartOutlined,
  BranchesOutlined,
  CarOutlined,
  CarryOutOutlined,
  HeatMapOutlined,
  HomeOutlined,
  LogoutOutlined,
  TruckOutlined,
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Tag } from "antd";
import Link from "next/link";
import { Logout } from "@/utils/actions";
import { getRandomNumberInRangeWithoutCollision } from "@/utils/generateRandom";
const { Sider } = Layout;

const labels = [
  {
    key: "STS",
    label: <Link href={`/sts`}>STS</Link>,
    icon: React.createElement(HomeOutlined),
  },
  {
    key: "LANDFILL",
    label: <Link href={`/landfills`}>Landfill</Link>,
    icon: React.createElement(HeatMapOutlined),
  },
  {
    key: "VEHICLE",
    label: <Link href={`/vehicles`}>Vehicle</Link>,
    icon: React.createElement(CarOutlined),
  },
  {
    key: "USER",
    label: <Link href={`/profile`}>Profile</Link>,
    icon: React.createElement(UserOutlined),
  },
  {
    key: "REPORT",
    label: <Link href={`/report`}>Report</Link>,
    icon: React.createElement(CarryOutOutlined),
  },
  {
    key: "STS_VEHICLE",
    label: <Link href={`/sts/entry_vehicle`}>STS Vehicle Entry</Link>,
    icon: React.createElement(TruckOutlined),
  },
  {
    key: "READ_USER_ALL",
    label: <Link href={`/users`}>Users</Link>,
    icon: React.createElement(UsergroupAddOutlined),
  },
  {
    key: "STS_SELF",
    label: <Link href={`/sts/fleet`}>Fleet</Link>,
    icon: React.createElement(BranchesOutlined),
  },
  {
    key: "ROLES",
    label: <Link href={`/roles`}>Roles and Permissions</Link>,
    icon: React.createElement(UserAddOutlined),
  },
];

const logout = [LogoutOutlined].map((icon) => ({
  key: "Logout",
  icon: React.createElement(icon),
  label: (
    <form action={Logout}>
      <button type="submit">Logout</button>
    </form>
  ),
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
  var usedNumbers: number[] = [];
  var items: any[] = [];
  console.log(permissions);
  labels.map((label) => {
    permissions.map((permission: string) => {
      if (permission.includes(label.key) && !items.includes(label))
        items.push(label);
    });
  });

  return (
    <Sider breakpoint="lg" collapsedWidth="0" className="min-h-screen">
      <div className="flex flex-col gap-10">
        <div>
          <div className="p-5">
            {roles.map((role: any) => (
              <div key={role} className="mb-2 inline-block">
                <Tag
                  color={
                    color[
                      getRandomNumberInRangeWithoutCollision(
                        0,
                        color.length,
                        usedNumbers
                      )
                    ]
                  }
                >
                  <UserSwitchOutlined /> {role.toUpperCase()}
                </Tag>
              </div>
            ))}
          </div>
          <Menu
            mode="inline"
            items={[
              {
                key: "Home",
                label: <Link href={`/dashboard`}>Dashboard</Link>,
                icon: React.createElement(BarChartOutlined),
              },
            ]}
            theme="dark"
          />
          <Menu mode="inline" items={items} theme="dark" />
        </div>
        <div>
          <h2 className="text-gray-300 text-[1rem] px-5 py-3">User Info: </h2>
          <h2 className="text-gray-300 px-10 pb-3">{name}</h2>
          <h2 className="text-gray-300 px-10 pb-3">User ID: {id}</h2>
          {sts_id && (
            <h2 className="text-gray-300 px-10 pb-3">STS ID: {sts_id}</h2>
          )}
          {landfill_id && (
            <h2 className="text-gray-300 px-10 pb-3">
              Landfill ID: {landfill_id}
            </h2>
          )}
        </div>
        <div>
          <Menu mode="inline" items={logout} theme="dark" />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
