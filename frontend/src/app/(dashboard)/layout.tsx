import UserHeader from "@/components/dashboard/header";
import extractUserInfo from "@/utils/verify";
import type { Metadata } from "next";

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
  const { role } = await extractUserInfo();
  let bgColor = "#FFFFFF";
  if (role === "admin") bgColor = "#F3F7FB";
  else if (role === "sts-manager") bgColor = "#F8FFF6";
  else if (role === "landfill-manager") bgColor = "#FFFFFF";

  return (
    role && (
      <main className={`h-screen`} style={{ backgroundColor: bgColor }}>
        <UserHeader />
        {children}
      </main>
    )
  );
}
