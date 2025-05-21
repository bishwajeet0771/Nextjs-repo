import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        xl: "1600px",
      },
      colors: {
        btnPrimary: "#0073C6",
        greenPrimary: "#148B16",
        bgPrimary: "#f1f1f1",
        bgSecondary: "#0073C6",
      },
      fontSize: {
        h2: "18px",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
      padding: {
        "screen-spacing": "50px",
        "less-screen-spacing": "30px",
      },

      animation: {
        gradient: "gradientBG 6s ease infinite",
      },
      keyframes: {
        gradientBG: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        "gradient-animate": "200% 200%",
      },
    },
  },

  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
export default config;
