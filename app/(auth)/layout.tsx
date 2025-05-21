/* eslint-disable no-undef */
import { Toaster } from "react-hot-toast";
import Logo from "../components/atoms/Logo";

import "@mantine/core/styles.css";
import data from "../data/auth";
import "./root.css";
import { TbBuilding } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";
import MantineTheme from "@/mantine.config";
import { MantineProvider } from "@mantine/core";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={MantineTheme}>
      <main className="w-full flex  sm:h-screen">
        <div className="relative flex-col hidden md:flex items-start sm:pl-[5%] lg:pl-[7%] justify-start sm:pt-[3%] xl:pt-[6%] bg-gradient-to-b from-[#E4F4FF] /0 via-[#FFF] /0 to-[#EFFFF3]/100 w-full ">
          <Link
            href={"/"}
            className=" top-[7%] left-[25%] p-2 bg-[#ffffff7a] sm:mb-[50px] xl:mb-[72px]"
          >
            <div className="flex justify-center items-center gap-1 rounded   text-[#0C7ACA] text-xl xl:text-2xl not-italic font-bold flex-nowrap ">
              {config.homeIcon} <p>Go to Home</p>
            </div>
            {config.line}
          </Link>
          <div className="  flex flex-col justify-start items-start ">
            <ul className=" text-neutral-600 w-full text-base font-semibold">
              {data.map((item) => (
                <li
                  key={item.text}
                  className="w-full mb-[3%] flex items-center justify-start"
                >
                  <TbBuilding />{" "}
                  <p className="font-Playfair text-[color: #545353] sm:text-[20px]  xl:text-[24px] font-[600] ml-[10px] ">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <Image
            width={500}
            height={500}
            src="/auth/login.svg"
            className="sm:mt-10  h-[100vh] sm:max-h-[340px] sm:w-[70%] xl:max-w-[490px]  xl:w-auto xl:mt-20"
            alt="not found"
          />
        </div>
        <div className="flex justify-center items-start w-full pt-[10%] sm:pt-[3%] xl:pt-[5.5%] relative max-h-[100vh] overflow-y-auto ">
          <Link
            href={"/"}
            className=" sm:hidden top-0 left-0 p-2 bg-[#ffffff7a]  absolute"
          >
            <div className="flex  justify-center items-center gap-1 rounded underline  text-[#0C7ACA] text-[14px] not-italic font-bold flex-nowrap">
              {config.homeIcon}{" "}
              <p className="h-[17px] hover:underline cursor-pointer ">Home</p>
            </div>
            <hr className="bg-[#0C7ACA] h-[2px]" />
          </Link>
          <div className="w-full bg-white text-gray-600 justify-center items-center ">
            <Logo styles="w-full flex justify-center items-center" />

            {children}
            <div className="xl:relative">
              <Toaster
                reverseOrder={false}
                containerStyle={{
                  position: "absolute",
                  bottom: "3%",
                  zIndex: "1000",
                }}
                position="bottom-center"
                toastOptions={{
                  style: {
                    background: '#333', // dark background
                    color: '#fff',      // light text
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </MantineProvider>
  );
}

const config = {
  homeIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      className="w-[15px] h-[15px] sm:w-[29px] sm:h-[29px]"
    >
      <path
        d="M4 10.9987L14.5 2.83203L25 10.9987V23.832C25 24.4509 24.7542 25.0444 24.3166 25.4819C23.879 25.9195 23.2855 26.1654 22.6667 26.1654H6.33333C5.71449 26.1654 5.121 25.9195 4.68342 25.4819C4.24583 25.0444 4 24.4509 4 23.832V10.9987Z"
        stroke="#0C7ACA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 26.1667V14.5H18V26.1667"
        stroke="#0C7ACA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  line: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="185"
      height="2"
      viewBox="0 0 185 2"
      fill="none"
      className="w-[160px] xl:w-[185px]"
    >
      <path
        d="M1 1H184"
        stroke="#0C7ACA"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};
