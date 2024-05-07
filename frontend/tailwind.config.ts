import type { Config } from "tailwindcss";

const config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        admin: "#4A75CB",
        admin_bg: "#F3F7FB",
        sts_primary: "#82B378",
        sts_bg: "#F8FFF6",
        sts_text: "#699860",
        landfill: "#B84C42",
        landfill_bg: "#FFFFFF",
        black: "#000000",
        red: "#DF3E3E",
        unassigned: "#6F6F6F",
      },
    },
  },
} satisfies Config;

export default config;
