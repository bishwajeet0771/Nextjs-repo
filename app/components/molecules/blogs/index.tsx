import Image from "next/image";
import React from "react";

export default function Blogs() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-sky-100  w-full  mx-auto h-[100%] md:h-screen lg:h-screen">
      {/* Heading */}
      <div className=" justify-center items-center gap-9 flex flex-col pt-[6%]">
        <h1 className="text-[28px] lg:text-[46px] md:text-[36px] sm:text-[28px] text-5xl font-bold font-['Montserrat'] leading-10 tracking-widest">
          Blogs
        </h1>
        <div className=" text-center text-slate-400 text-[20px] lg:text-[24px] font-medium  leading-loose tracking-wide w-[80%]">
          Elevate your Real Estate knowledge: Explore insightful blogs and
          videos. Discover market Trends, Buying Tips, Investment Strategies,
          and Homeownership advice on our Informative Platform
        </div>
      </div>
      {/* Grids */}
      <div className="flex justify-center items-center flex-col md:flex-row lg:flex-row gap-x-14 m-auto mt-10 w-[100%]">
        <div className="relative h-[100%]">
          <Image
            src={
              "https://s3-media0.fl.yelpcdn.com/bphoto/ST4BJ1ObIBIVRhniZ0GexA/300s.jpg"
            }
            className="rounded-[20px]"
            alt="blog"
            width={500}
            height={500}
          />
          <div className="w-[90%] h-24 p-5 text-center flex justify-center items-center absolute bottom-5 left-10 backdrop-blur-sm bg-gradient-to-r from-[#B5BAC2] to-[#00223a] rounded-2xl shadow">
            <p className="  text-white text-2xl font-semibold font-['Montserrat'] ">
              Top 10 investment in Real Estate 2023
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center w-[90%] md:w-[50%] lg:w-[30%]">
          <div className="mt-5 relative h-[250px] overflow-hidden rounded-2xl w-[100%]">
            <Image
              src={
                "https://assets.thesparksite.com/uploads/sites/992/2023/06/Untitled-design-49.png"
              }
              className="rounded-[20px]"
              alt="blog"
              width={700}
              height={300}
            />
            <div className="w-[90%] h-24 p-5 text-center flex justify-center items-center absolute bottom-5 left-10 bg-gradient-to-r from-[#B5BAC2] to-[#00223a] rounded-2xl shadow">
              <p className="  text-white text-2xl font-semibold font-['Montserrat'] ">
                Start a Real Estate business in India
              </p>
            </div>
          </div>
          <div className="mt-5 relative h-[250px] overflow-hidden rounded-2xl w-[100%]">
            <Image
              src={
                "https://assets.thesparksite.com/uploads/sites/992/2023/06/Untitled-design-49.png"
              }
              className="rounded-[20px]"
              alt="blog"
              width={700}
              height={300}
            />
            <div className="w-[90%] h-24 p-5 text-center flex justify-center items-center absolute bottom-5 left-10 bg-gradient-to-r from-[#B5BAC2] to-[#00223a] rounded-2xl shadow">
              <p className="  text-white text-2xl font-semibold font-['Montserrat'] ">
                A guide to buying your 1st home in today’s market
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
