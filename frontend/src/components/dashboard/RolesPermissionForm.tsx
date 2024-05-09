"use client";

import { Button, Tag } from "antd";
import RolesPermissionsModal from "./RolesPermissionModal";

const color = [
  "gold",
  "purple",
  "blue",
  "green",
  "magenta",
  "geekblue",
  "cyan",
];

const default_permissions_category = ["STS", "LANDFILL"];

export default function RolesPermissionForm({ roles_permissions }: any) {
  return (
    <div>
      {roles_permissions.map((role: any, index: number) => (
        <div key={role.role}>
          <div className="flex flex-wrap gap-4 mt-5 mb-4">
            <h2 className="text-gray-600 text-xl font-bold">
              {role.role.toUpperCase()}
            </h2>
            <RolesPermissionsModal roles_permissions={role} />
          </div>
          <div className="flex flex-wrap gap-2">
            {role.permissions.length ? (
              role.permissions.map((permission: any) => (
                <Tag color={color[index]} key={permission}>
                  {permission}
                </Tag>
              ))
            ) : (
              <Tag color={"default"} key="no-permission">
                No Permission
              </Tag>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
