/* eslint-disable no-unused-vars */
"use client";
import { getPathTypeFromQueryParams } from "@/app/hooks/custom/useRedirect";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Success() {
  // const P = useParams();
  const path = usePathname();
  return (
    <div
      className={clsx(
        "flex  max-w-3xl flex-col items-center justify-center  m-auto ",
        path === "/register/individual" && "p-4"
      )}
    >
      <div
        className={clsx(
          "w-full  rounded-lg bg-white  text-center ",
          path === "/register/individual" && "p-8"
        )}
      >
        <h1 className="text-[color:var(--Brand-green-primary,#148B16)] text-[28px] not-italic font-bold leading-[normal]">
          Congratulations!
        </h1>
        <p className="text-[color:var(--Grey-1,#666)] text-center text-[18px] mt-6 xl:text-[26px] not-italic font-medium leading-[normal] xl:mt-10">
          Your account has been created successfully
        </p>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/login-signup/congratulationslogin-signup.gif`}
          alt="success"
          width={200}
          height={200}
          className="m-auto"
        />
        <Countdown />
      </div>
    </div>
  );
}
const Countdown = ({ initialCount = 5, redirectPath = "/" }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 5,
  });

  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime.seconds > 0) {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          } else if (prevTime.minutes > 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            clearInterval(interval);
            setTimerRunning(false);
            return prevTime;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerRunning]);
  const page = getPathTypeFromQueryParams();
  return (
    <p className="text-[color:var(--Grey-2,#767270)] text-center text-[16px] xl:text-[24px] not-italic font-medium leading-[normal]">
      You will be redirected to {page} in {timeRemaining.seconds} sec
    </p>
  );
};
