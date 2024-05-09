import { getJWT } from "@/utils/actions";
import { baseURL } from "../../../../files";
import RolesPermissionForm from "@/components/dashboard/RolesPermissionForm";
import { UserAddOutlined } from "@ant-design/icons";

const getData = async () => {
  const response = await fetch(`${baseURL}/roles-permissions`, {
    headers: {
      Authorization: `Bearer ${await getJWT()}`,
    },
  });
  const data = await response.json();
  return data;
};

export default async function RolesAndPermissions() {
  const data = await getData();
  return (
    <div className="w-[95%] lg:w-[80%] mx-auto py-10">
      <h2 className="text-admin md:text-2xl font-bold mb-10">
        <UserAddOutlined /> Roles and Permissions:{" "}
      </h2>
      <RolesPermissionForm roles_permissions={data} />
    </div>
  );
}
