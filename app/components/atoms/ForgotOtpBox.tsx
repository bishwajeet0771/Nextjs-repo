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
  userName: string;
  close: () => void;
  callback: () => void;
  mobile: number | null;
};

export default function ForgotOtpBox({
  // userName,
  close,
  callback,
  mobile,
}: Props) {
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
    <Box maw={551} mx="auto">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] h-full flex justify-center items-center flex-col "
      >
        <h1 className="text-[#333] font-[600] text-lg md:text-[24px] text-center ">
          OTP VERIFICATION
        </h1>
        <p className="text-[#B5ABAC] font-[500] md:text-[20px] text-center mb-[3%]  ">
          A One Time- Password has been sent to{" "}
          {hideMobileNumber((mobile && mobile) || 0)}
        </p>
        <div className=" mr-auto ml-auto ">
          {" "}
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
          <p className="text-[#F00] font-[500] text-[13px] xl:text-[16px] w-[100%] !max-w-[500px] !mb-[6%] text-center ">
            You&apos;ve entered wrong OTP, Please enter your OTP again!
          </p>
        )}
        {form.errors.otp && (
          <p className="text-[#F00] font-[500] text-[13px] xl:text-[16px] w-[100%] !max-w-[500px] !mb-[6%] text-center ">
            {form.errors.otp}
          </p>
        )}
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
    await resendOtp(userName, "pwd_change");
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
        <p>Didn&apos;t receive otp?</p>
      )}

      <button
        disabled={timerRunning}
        style={{
          color: timerRunning ? "#b1b5ba" : "#0073C6",
        }}
        onClick={resendOTP}
      >
        Resend OTP
      </button>
    </div>
  );
};
