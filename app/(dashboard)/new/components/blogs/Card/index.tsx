"use client";
import React from "react";
import Card from "./Card";
import { blogDetails } from "@/app/hooks/blog";
import { useAtom } from "jotai";

type Props = {};

export default function CardSection({}: Props) {
  const [{ allBlogData }] = useAtom(blogDetails);
  
  return (
    <div className="w-full flex sm:justify-center items-start gap-4 mt-4 overflow-x-scroll scrollbar-hide py-[10px] ">
      {allBlogData.map((eachCard: any, index:number)=>{
        if(index < 3){
          return(
            <Card key={`blogCard_${eachCard.id}`} data={eachCard} />
          )}
      })}
    </div>
  );
}
