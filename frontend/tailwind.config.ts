import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
  plugins: [],
};
export default config;
