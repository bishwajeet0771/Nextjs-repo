"use client";

import React, { useRef, useState } from "react";
import BlogCard from "./BlogCarousalCard";
import {
  NextCarouselButton,
  PrevCarouselButton,
} from "@/app/images/commonSvgs";
import { useAtom } from "jotai";
import { blogDetails } from "@/app/hooks/blog";
import "@mantine/carousel/styles.css";

function BlogCarousal() {
  const [{ allBlogData, selectedBlog }] = useAtom(blogDetails);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    const container = containerRef.current;
    if (!container) return;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
    container.scrollLeft = scrollLeft - walk;
  };

  const onScrollingLeftAndRight = (direction: string) => {
    const ele = containerRef.current;

    if (ele) {
      if (direction == "L") {
        ele.scrollLeft -= 300;
      } else {
        ele.scrollLeft += 300;
      }
    }
  };

  const newList = allBlogData.filter((each) => each.id !== selectedBlog?.id);

  return (
    <div className="flex justify-center items-center w-[94%] md:w-[90%] mb-[3%] relative ">
      {newList != undefined && newList != null && newList?.length >= 2 && (
        <PrevCarouselButton
          className={`w-[32px] h-[32px] cursor-pointer bottom-1 absolute left-[10px] md:left-[-40px] top-[45%] z-10`}
          onClick={() => onScrollingLeftAndRight("L")}
          circle="#227FBC"
          iconColor="white"
        />
      )}

      <div
        ref={containerRef}
        className="flex justify-start items-center w-full overflow-y-auto mt-5 scroll-smooth scrollbar-hide cursor-grab "
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ userSelect: "none" }}
      >
        <div className="w-full flex justify-start items-start max-w-[1000px] gap-[20px] ">
          {newList?.map((card: any) => (
            <BlogCard key={`blogCard_${card.id}`} data={card} />
          ))}
        </div>
      </div>

      {newList != undefined && newList != null && newList.length >= 2 && (
        <NextCarouselButton
          className={`w-[32px] h-[32px] cursor-pointer bottom-1 absolute right-[10px] md:right-[-40px] top-[45%] z-10`}
          onClick={() => onScrollingLeftAndRight("R")}
          circle="#227FBC"
          iconColor="white"
        />
      )}
    </div>
  );
}

export default BlogCarousal;
