import React from "react";
import Box from "./Box";
import { CDN_BASE_URL } from "@/app/env";

type Props = {};

export default function ListBox({}: Props) {
  return (
    <div className="flex overflow-x-scroll sm:flex-wrap gap-[4%] mt-[22px] pt-[10px] scrollbar-hide">
      {config.data.map((item) => (
        <Box key={item.id} {...item} />
      ))}
    </div>
  );
}

const config = {
  data: [
    {
      name: "Marathahalli",
      id: 397,
      type: "L",
      url: `${CDN_BASE_URL}/staticmedia-images-icons/homepage/marathalli.webp`,
    },
    {
      name: "koramangala",
      id: 354,
      type: "L",
      url: `${CDN_BASE_URL}/staticmedia-images-icons/homepage/koramangala.webp`,
    },
    {
      name: "jp nagar",
      id: 298,
      type: "L",
      url: `${CDN_BASE_URL}/staticmedia-images-icons/homepage/jpnagar.webp`,
    },
    {
      name: "whitefield",
      id: 563,
      type: "L",
      url: `${CDN_BASE_URL}/staticmedia-images-icons/homepage/whitefield.webp`,
    },
    {
      name: "Rajajinagar",
      id: 458,
      type: "L",
      url: `${CDN_BASE_URL}/staticmedia-images-icons/homepage/rajajinagar.webp`,
    },
    {
      name: "indira nagar",
      id: 261,
      type: "L",
      url: `${CDN_BASE_URL}/staticmedia-images-icons/homepage/Indiranagar.webp`,
    },
  ],
};
