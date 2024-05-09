import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoSync - Revolutionizing Waste Management",
  description:
    "EcoSync - Revolutionizing Waste Management, a Dhaka North City Corporation (DNCC) initiative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-[100%]`}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
