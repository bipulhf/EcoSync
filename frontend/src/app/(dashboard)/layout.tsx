import extractUserInfo from "@/utils/verify";
import type { Metadata } from "next";
import { Layout } from "antd";
import Sidebar from "@/components/dashboard/Sidebar";
import UserHeader from "@/components/dashboard/UserHeader";

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
          <Layout>
            <UserHeader roles={roles} />
            {children}
          </Layout>
        </Layout>
      </main>
    )
  );
}
