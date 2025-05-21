import React from "react";
import MainHeading from "../heading";
import CardSection from "./Card";

type Props = {};

export default function BlogsSection({}: Props) {
  return (
    <div className="w-[90%] m-auto pb-10 mb-[0px] sm:mb-[40px]  ">
      <MainHeading
        title="Latest Blogs"
        content="From Market Updates to Home Tips: Your Source for Real Estate Knowledge"
        className={{ title: "text-center", content: "" }}
        url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`}
      />
      <div>
        <CardSection />
      </div>
    </div>
  );
}
