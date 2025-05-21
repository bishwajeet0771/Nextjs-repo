"use client";
import { createTheme } from "@mantine/core";
import montserrat from "./font";



const Mantine = createTheme({
  fontFamily: montserrat.style.fontFamily,
  fontFamilyMonospace: montserrat.style.fontFamily,
  headings: { fontFamily: montserrat.style.fontFamily },
  cursorType: "pointer",
  colors: {
    themeBlue: [
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
      "#0073C6",
    ],
  },
});

export default Mantine;
