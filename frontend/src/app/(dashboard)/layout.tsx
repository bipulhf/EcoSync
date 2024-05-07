import extractUserInfo from "@/utils/verify";
import type { Metadata } from "next";
import { Layout } from "antd";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "EcoSync - Revolutionizing Waste Management",
  description:
    "EcoSync - Revolutionizing Waste Management, a Dhaka North City Corporation (DNCC) initiative",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id, name, sts_id, landfill_id, roles, permissions } =
    await extractUserInfo();
  let bgColor = "#FFFFFF";
  if (roles.includes("admin")) bgColor = "#F3F7FB";
  else if (roles.includes("sts_manager")) bgColor = "#F8FFF6";
  else if (roles.includes("landfill_manager")) bgColor = "#FFFFFF";

  return (
    roles && (
      <main className={`min-h-screen`}>
        <Layout>
          <Sidebar
            id={id}
            name={name}
            sts_id={sts_id}
            landfill_id={landfill_id}
            permissions={permissions}
            roles={roles}
          />
          <Layout>{children}</Layout>
        </Layout>
      </main>
    )
  );
}
