"use client";
import Image from "next/image";
import { useState } from "react";
import Searchbar from "./searchbar";
const propertyTypes = ["Buy", "Rent"];
const HomeSearch = () => {
  const [selectedType, setSelectedType] = useState(propertyTypes[0]);
  return (
    <div className="h-screen w-full pl-5 md:pl-0 border-2 grid grid-cols-[1.1fr_2fr] gap-2 sm:px-20 headerBg">
      <div className=" items-center justify-center hidden md:flex">
        <Image
          src={"/home-search.svg"}
          alt="home-search"
          height={300}
          width={500}
        />
      </div>
      <div className="flex items-center w-full">
        <div className="flex-col flex gap-6 w-full">
          <div className="w-[400px] border-2-- grid grid-cols-3 pl-3">
            {propertyTypes.map((type) => (
              <button
                onClick={() => setSelectedType(type)}
                key={type}
                style={
                  selectedType === type
                    ? {
                        color: "#148B16",
                        fontWeight: "bold",
                        textUnderlineOffset: "5px",
                        textDecoration: "underline 3px #148B16 ",
                      }
                    : undefined
                }
                className={"text-3xl text-left font- text-gray-500"}
              >
                {type}
              </button>
            ))}
          </div>
          <Searchbar />

          <div>
            <h3 className="text-[34px] font-medium text-slate-600">
              <p className="text-green-600 inline">10K + </p> Active User
            </h3>
            <p className="text-[24px] text-slate-500">
              Join our vibrant online community of 10k active users today.
              Discover endless possibilities, connect, and share experiences
              like never before.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
