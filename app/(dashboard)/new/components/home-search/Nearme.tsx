"use client";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
// import crpto from "crypto"
import { encryptData } from "@/app/utils/auth/nodeCrypto";
type Props = {};

export default function Nearme({}: Props) {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const isMobileStarting = useMediaQuery("(max-width: 760px)");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          window.open(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/search?sf=lat=${lat}-lng=${lng}`,
            "_self",
            "noreferrer"
          );
          const encryptedObject = encryptData(
            JSON.stringify({
              lt: position.coords.latitude,
              la: position.coords.longitude,
            })
          );
          setCookie("ui", encryptedObject, {
            expires: new Date(new Date().getTime() + 10 * 60 * 1000),
          });
          setError(null);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  return (
 

    <button
      aria-label="Near Me"
      className="flex items-center gap-1 rounded p-1 bg-[#f0ffdc] text-[#006400] text-[12px] not-italic font-medium cursor-pointer text-nowrap "
      onClick={getLocation}
    >
      {config.nearMe}{" "}
      {isMobileStarting ? "" : <span className="hidden sm:flex">Near Me</span>}
    </button>
  );
}

const config = {
  nearMe: (
    <svg
      className=" min-w-[20px] min-h-[20px] cursor-pointer "
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M19.0005 11C19.0005 13.1217 18.1576 15.1566 16.6573 16.6569C15.1571 18.1571 13.1222 19 11.0005 19C8.87876 19 6.84393 18.1571 5.34363 16.6569C3.84334 15.1566 3.00049 13.1217 3.00049 11C3.00049 8.87827 3.84334 6.84344 5.34363 5.34315C6.84393 3.84285 8.87876 3 11.0005 3C13.1222 3 15.1571 3.84285 16.6573 5.34315C18.1576 6.84344 19.0005 8.87827 19.0005 11Z"
        stroke="#148B16"
        strokeWidth="1.5"
      />
      <path
        opacity="0.5"
        d="M14.0005 11C14.0005 11.7956 13.6844 12.5587 13.1218 13.1213C12.5592 13.6839 11.7961 14 11.0005 14C10.2048 14 9.44178 13.6839 8.87917 13.1213C8.31656 12.5587 8.00049 11.7956 8.00049 11C8.00049 10.2044 8.31656 9.44129 8.87917 8.87868C9.44178 8.31607 10.2048 8 11.0005 8C11.7961 8 12.5592 8.31607 13.1218 8.87868C13.6844 9.44129 14.0005 10.2044 14.0005 11Z"
        stroke="#148B16"
        strokeWidth="1.5"
      />
      <path
        opacity="0.5"
        d="M1 11H3M19 11H21M11 3V1M11 21V19"
        stroke="#148B16"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};
