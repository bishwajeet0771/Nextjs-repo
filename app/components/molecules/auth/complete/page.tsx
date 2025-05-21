/* eslint-disable no-undef */
"use client";
import { getQueryParamClient } from "@/app/hooks/custom/useRedirect";
import { ForgotPass } from "@/app/images/commonSvgs";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ForgotSucess() {
  return (
    <div className={clsx("flex   flex-col items-center justify-center   ")}>
      <h1 className="text-[color:var(--Brand-green-primary,#148B16)] text-[28px] not-italic font-bold leading-[normal]">
        Reset Password
      </h1>
      <ForgotPass className="mt-[7%]" />
      <p className="text-black font-semibold text-center text-[16px] xl:text-[26px] not-italic xl:font-medium leading-[normal] mt-10 mb-10">
        Password successfully reset! Your account security is our priority.
        Remember to keep your new password safe.
      </p>
      <Countdown />
    </div>
  );
}

const Countdown = () => {
  const queryParam = getQueryParamClient();
  const router = useRouter();
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
            router.push("/login" + queryParam.query);
            return prevTime;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerRunning, queryParam, router]);

  return (
    <p className="text-[color:var(--Grey-2,#767270)] text-nowrap text-[16px] xl:text-[26px] not-italic font-medium leading-[normal] mt-4">
      You will be redirected to login page in {timeRemaining.seconds} sec
    </p>
  );
};
