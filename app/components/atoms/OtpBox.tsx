"use client";

import useAuth from "@/app/hooks/useAuth";
import { resendOtp } from "@/app/utils/auth";
import { hideMobileNumber } from "@/app/utils/parse";
import { otpSchema } from "@/app/validations/auth";
import { Box, FocusTrap, PinInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useEffect, useState } from "react";
import S from "@/app/styles/Otp.module.css";

type Props = {
  userName?: string;
  close: () => void;
  callback: () => void;
  mobile?: number | null;
};

export default function OtpBox({ close, callback, mobile }: Props) {
  const { verifyOtp } = useAuth({ type: "otp" });
  const [error, setError] = useState(false);
  const onSubmit = async (value: any) => {
    const data = await verifyOtp({ ...value, username: mobile });
    if (data?.success) {
      callback();
      close();
    } else {
      setError(true);
    }
  };

  const form = useForm({
    initialValues: { otp: 0 },
    validate: yupResolver(otpSchema),
    validateInputOnChange: true,
    onValuesChange(values) {
      if (values.otp.toString().length === 4) {
        onSubmit(values);
      } else {
        setError(false);
      }
    },
  });

  return (
    <Box className="w-full ">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] h-[100%] flex justify-start mt-[4%] items-start sm:items-center md:items-center lg:items-center xl:items-center  flex-col text-center "
      >
        <h1 className="text-[#545353] text-[18px] sm:text-2x xl:text-2x lg:text-2x xl:text-2x mb-6 not-italic font-semibold leading-[normal] text-center  ">
          Please enter your OTP to verify your account
        </h1>
        <p className="text-[#7D7D7D] text-[16px] sm:text-xl not-italic font-medium leading-[normal] mb-[3%] text-center   ">
          A One Time- Password has been sent to{" "}
          {hideMobileNumber((mobile && mobile) || 0)}
        </p>

        <div className=" mr-auto ml-auto ">
          <FocusTrap active>
            <PinInput
              classNames={{
                pinInput: S.pinInput,
                input: S.input,
              }}
              name="otp"
              size="xl"
              {...form.getInputProps("otp")}
              className=""
              inputMode="numeric"
              type={"number"}
              placeholder=""
              data-autofocus
            />
          </FocusTrap>
          <Resend userName={mobile} />
        </div>

        {error && (
          <p className="text-[#F00] font-[500] text-[13px] xl:text-[16px] w-[100%] !max-w-[423px] !mb-[6%] text-center ">
            You&apos;ve entered wrong OTP, Please enter your OTP again!
          </p>
        )}
        {form.errors.otp && (
          <p className="text-[#F00] font-[500] text-[13px] xl:text-[16px] w-[100%] !max-w-[423px] !mb-[6%] text-center ">
            {form.errors.otp}
          </p>
        )}

        {/* <Button
          type="submit"
          mt="sm"
          size="md"
          className="!rounded-[6px] !w-[100%] !max-w-[423px] !bg-[#0c7aca]"
        >
          VALIDATE
        </Button> */}
      </form>
    </Box>
  );
}

const Resend = ({ userName }: any): JSX.Element => {
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 30,
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

  const resendOTP = async () => {
    if (!timerRunning) {
      setTimeRemaining({ minutes: 0, seconds: 30 });
      setTimerRunning(true);
    }
    await resendOtp(userName, "newregistration");
  };

  const { minutes, seconds } = timeRemaining;

  return (
    <div className="w-full flex justify-center my-4 flex-col items-end">
      {seconds > 0 || minutes > 0 ? (
        <p>
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p>Didn&apos;t receive OTP?</p>
      )}

      <button
        disabled={timerRunning}
        style={{
          color: timerRunning ? "#b1b5ba" : "#0073C6",
        }}
        onClick={resendOTP}
        className="text-[#0C7ACA] text-base not-italic font-medium leading-[normal] underline"
      >
        Resend OTP
      </button>
    </div>
  );
};
