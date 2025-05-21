import React from "react";
import Box from "./Box";

type Props = {};

export default function CardSection({}: Props) {
  return (
    <div className=" relative mt-[86px] sm:top-0 flex justify-center items-center sm:justify-start sm:items-start gap-[14px]  sm:gap-[6%] self-stretch sm:mt-[2%] sm:pl-[4%] flex-wrap">
      {config.data.map((item) => (
        <Box key={item.title} {...item} />
      ))}
    </div>
  );
}
const config = {
  data: [
    {
      title: "Builder",
      content: "Check all the listings posted by builder",
      link: `${process.env.NEXT_PUBLIC_PROJECT_URL}/search/listing?sf=listedBy=B`,
      image: "/staticmedia-images-icons/homepage/Builder.webp",
    },
    {
      title: "Agent",
      content: "Check all the listings posted by agent",
      link: `${process.env.NEXT_PUBLIC_PROJECT_URL}/search/listing?sf=listedBy=A`,
      image: "/staticmedia-images-icons/homepage/Agent.webp",
    },
    {
      title: "Owner",
      content: "Check all the listings posted by Owner",
      link: `${process.env.NEXT_PUBLIC_PROJECT_URL}/search/listing?sf=listedBy=I`,
      image: "/staticmedia-images-icons/homepage/Individual.webp",
    },
  ],
};
