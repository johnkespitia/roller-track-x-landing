import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",
        dark: "#1C1C1C",
        neon: {
          purple: "#9D4EDD",
          green: "#06D6A0",
        },
      },
      fontFamily: {
        heading: ["Montserrat", "Bebas Neue", "sans-serif"],
        body: ["Roboto", "Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
