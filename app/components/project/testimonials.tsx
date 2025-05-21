import React from "react";
import { RatingStar } from "../../images/commonSvgs";
import Image from "next/image";

const videos = [1, 2, 3, 4, 5, 6, 7, 8];

// type Props = {};

const Card = () => {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground mb-[1%] shadow-sm w-[95%]"
      data-v0-t="card"
    >
      <div className="flex items-start justify-between flex-col md:flex-row rounded-[10px] bg-[#FFF] ">
        <Image
          width={149}
          height={149}
          src="/youtube.png"
          alt="Ankita Soni"
          className="md:rounded-l-[10px] rounded-t-[10px] w-full md:w-[30%] h-[149px] "
        />
        <div className="flex justify-start p-[2%] items-center flex-col ml-[0px] md:ml-[20px] ">
          <div className=" flex justify-between w-full items-start flex-wrap">
            <div className="text-left">
              <h4 className="text-lg font-semibold">Ankita Soni</h4>
              <p className="text-xs text-gray-500">Individual</p>
            </div>

            <div>
              <div className="flex items-center">
                <RatingStar className="text-yellow-400 h-4 w-4" />
                <RatingStar className="text-yellow-400 h-4 w-4" />
                <RatingStar className="text-yellow-400 h-4 w-4" />
                <RatingStar className="text-yellow-400 h-4 w-4" />
                <RatingStar className="text-yellow-400 h-4 w-4" />
              </div>
              <p className="text-xs text-gray-400 mt-2">3 days ago</p>
            </div>
          </div>

          <p className="text-sm text-left text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Testimonials({ projName }: { projName: string }) {
  return (
    <div className="bg-white p-0 w-[90%] mb-[3%] ">
      <div className="flex flex-col md:flex-row gap-[1%]">
        <div className="flex-1 w-[100%] md:w-[47%] ">
          <h2 className="text-2xl font-semibold">
            TESTIMONIALS OF <span className="text-green-500">{projName}</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 italic">
            Voice of Happy Homeowners: Testimonials
          </p>
          <div className="mt-4 relative w-full">
            <Image
              width={700}
              height={400}
              src="/youtube.png"
              alt="Testimonials video"
              className="rounded-lg !w-[100%]"
            />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white h-8 w-8"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-start p-[1%] items-end flex-col rounded-l-[30px] bg-gradient-to-r from-[#EFF5FF] /0  to-[#F2FAFF]/100 w-[100%] md:w-[48%] mt-[3%] md:mt-[0%] ">
          <div className="flex items-center">
            <button className="inline-flex shadow-md text-[20px] text-[#4D6677] lowercase italic items-center justify-center rounded-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm">
              Testimonials Playlist
            </button>
          </div>
          <div dir="ltr" className="relative overflow-hidden mt-4 ">
            <div
              data-radix-scroll-area-viewport
              className=" w-full overflow-y-auto max-h-[360px] lg:max-h-[563px] flex justify-start items-start flex-col "
            >
              {/* single card */}
              {videos.map((each) => {
                return <Card key={`videosSingleCard_${each}`} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
