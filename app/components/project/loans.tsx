"use client";
import { BankDetailsList } from "@/app/images/commonImages";
import { Bank } from "@/app/validations/types/project";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import PropertyHeading from "../property/heading";
import SubHeading from "./headings/SubHeading";
// import { Carousel } from "@mantine/carousel";
// import { useMediaQuery } from "@mantine/hooks";
// import Css from "@/app/styles/Loan.module.css";
export default function ProjectLoans({
  banks,
  name,
  type,
}: {
  type: string;
  banks: Bank[];
  name: string;
}) {
  // const isMobile = useMediaQuery(`(max-width: 601px)`);

  const [windowWidth, setWindowWidth] = useState(0);
  const maxCradNumber = 5;
  const [maxCards, setMaxCards] = useState(maxCradNumber);
  const isMobile = windowWidth <= 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="bg-white pt-2 pb-4 sm:pt-screen-spacing w-[95%] md:w-[90%] mx-auto  h-auto  scroll-mt-[100px]"
      id="loans"
    >
      {type === "prop" ? (
        <PropertyHeading
          title={
            <Fragment>
              Bank Approvals Of <span className="text-green-800">{name}</span>
            </Fragment>
          }
          desc="Unlock Your Dream Home with Hassle-Free Bank Approval Loans"
          className="mb-[10px] xl:mb-[10px]"
        />
      ) : (
        <>
          <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[4px] sm:mb-[10px] xl:mb-[12px] capitalize">
            <strong>
              <span className="text-[#001F35]">Bank Approvals For </span>
              <span className="text-green-800">{name}</span>
            </strong>
          </h2>
          <SubHeading
            text=" Explore bank loan approvals options for your project with multiple
            banks"
            className="mt-4"
          />
        </>
      )}
      {isMobile ? (
        // <Carousel
        //   slideSize="70%"
        //   className="!h-[160px] sm:!h-[200px]"
        //   slideGap="md"
        //   align="start"
        //   slidesToScroll={1}
        //   mt={"md"}
        //   classNames={Css}
        // >
        //   {banks?.map((bank, index) => {
        //     if (bank.bankid) {
        //       return (
        //         <Carousel.Slide key={`banks_${bank.bankid}`}>
        //           <div className="flex flex-col justify-center items-center gap-1.5 p-1.5 mt-4 sm:max-w-[150px] md:max-w-[170px] text-center border rounded-[7px] border-solid border-[#CCCED1] min-h-[120px] sm:min-h-[160px]">
        //             <Image
        //               src={
        //                 BankDetailsList?.get(bank.bankid)?.url ??
        //                 `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/Bank-projectproperty.png`
        //               }
        //               alt={bank.bankName}
        //               width={140}
        //               height={90}
        //               className="max-w-[90px] sm:min-h-[70px] sm:w-[140px] aspect-video "
        //               unoptimized
        //             />
        //             <p className="mt-3  text-[#242424] text-center text-[14px] sm:text-xl not-italic font-semibold leading-[normal] capitalize">
        //               {bank.bankName}
        //             </p>
        //           </div>
        //         </Carousel.Slide>
        //       );
        //     }
        //   })}
        // </Carousel>
        <div className="mt-[30px] md:mt-1 flex flex-wrap w-full gap-[16px]">
          {banks?.map((bank, index) => {
            if (bank.bankid && index < maxCards) {
              return (
                <div
                  key={`banks_${bank.bankid}`}
                  className="flex flex-col justify-center items-center gap-1.5 p-[6px] text-center border rounded-[7px] border-solid border-[#CCCED1] w-[46%] "
                >
                  <Image
                    src={
                      BankDetailsList?.get(bank.bankid)?.url ??
                      `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/Bank-projectproperty.png`
                    }
                    alt={bank.bankName}
                    title={bank.bankName}
                    width={140}
                    height={90}
                    className="max-w-[90px] sm:min-h-[70px] sm:w-[140px] aspect-video "
                    unoptimized
                  />
                  <p className="mt-3 text-[#242424] text-[13px] text-center not-italic font-semibold leading-[normal] capitalize ">
                    {bank.bankName}
                  </p>
                </div>
              );
            }
          })}

          {banks.length > maxCradNumber && (
            <div
              className=" flex justify-center items-center h-[150px] w-[46%] border border-solid border-[#CCCED1] rounded-[7px] flex-col cursor-pointer "
              onClick={() =>
                setMaxCards(
                  maxCards === maxCradNumber ? banks.length : maxCradNumber
                )
              }
            >
              <div
                className={`rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-3 animate-pulse pointer-events-none ${
                  maxCards === maxCradNumber ? "" : `rotate-180`
                } `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent pointer-events-none ">
                {maxCards === maxCradNumber ? "View More" : "View Less"}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-16 md:mt-1 flex justify-start items-center flex-wrap w-full gap-x-[3%] md:gap-y-[20px]">
          {banks?.map((bank) => {
            if (bank.bankid) {
              return (
                <div
                  key={`loans_${bank.bankid}`}
                  className="flex flex-col justify-center items-center gap-1.5 p-[6px] mt-4 sm:max-w-[142px] md:max-w-[170px] text-center border rounded-[7px] border-solid border-[#CCCED1] min-h-[160px] "
                >
                  <Image
                    src={
                      BankDetailsList?.get(bank.bankid)?.url ??
                      `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/Bank-projectproperty.png`
                    }
                    alt={bank.bankName}
                    title={bank.bankName}
                    width={140}
                    height={70}
                    className="min-h-[30px] min-w-[70px] aspect-video "
                    unoptimized
                  />
                  <p className="mt-3 text-[#242424] text-[13px] text-center  not-italic font-semibold leading-[normal] capitalize ">
                    {bank.bankName}
                  </p>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
