"use client";
import { useForm, yupResolver } from "@mantine/form";
import {
  // TextInput,
  Button,
  // Box,
  // PasswordInput,
  NumberInput,
  em,
} from "@mantine/core";
import { PasswordInput } from "react-hook-form-mantine";
import { yupResolver as yupHook } from "@hookform/resolvers/yup";
import { useForm as useFormHook } from "react-hook-form";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import S from "@/app/styles/Numinput.module.css";
import * as yup from "yup";
import { useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { resendOtp, resetPasswordApi } from "@/app/utils/auth";
import { BackSvg, EyeClosed, EyeOpen } from "@/app/images/commonSvgs";
import Image from "next/image";
import { forgetPasswordLockImg } from "@/app/images/commonImages";

import ForgotAuthPopup from "../../atoms/ForgotPopup";
import { handleTrimAndReplaceReactHookForm } from "@/app/utils/input/validations";
const schema = yup.object().shape({
  mobile: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .typeError("Valid 10-digit mobile number is required")
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Mobile number is required"),
});
function ForgotForm() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp" | "form"
  >("idle");
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();


  const form = useForm({
    initialValues: { mobile: null, otp: false },
    validate: yupResolver(schema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });
  const onSubmit = async (values: any) => {
    setStatus("pending");
    const data = await resendOtp(values.mobile, "pwd_change");
    if (data?.status) {
      setStatus("otp");
      open();
    }
    setStatus("idle");
  };

  const onClose = () => {
    setStatus("idle");
    close();
  };
  const OtpCallback = async () => {
    form.setFieldValue("otp", true);
    close();
  };

  return (
    <div
      className={clsx(
        "w-[100%]   flex justify-center items-center flex-col  mt-[3%] p-[10%] md:p-[2%]",
        status === "success" ? "max-w-[90%]" : "max-w-[459px]"
      )}
    >
      {status === "success" ? (
        <ForgotSucess />
      ) : form.values.otp ? (
        <Form
          status={status}
          mobile={form.values.mobile}
          setStatus={setStatus}
        />
      ) : (
        <form
          onSubmit={form.onSubmit(onSubmit)}
          className="w-[100%] flex justify-center items-center flex-col "
        >
          {/* <div className="inline-flex items-center border pl-[3px] py-0.5 rounded-md border-solid border-[#CDD7DE] bg-[#fafafa] mt-3">
            <h2
              className={`flex flex-col justify-center items-center gap-1 rounded border shadow-[0px_4px_11.1px_0px_rgba(25,80,71,0.46)_inset,0px_4px_12.9px_0px_rgba(140,177,141,0.38)] px-[35px] md:px-[52px] py-1.5 border-solid border-[#148B16] bg-[#148b16] text-white text-2xl not-italic font-bold leading-[normal] text-nowrap `}
            >
              Forgot Password ?
            </h2>
          </div> */}
          <h2
            className={`whitespace-nowrap text-2xl font-bold text-[#148B16] text-center mt-1`}
          >
            Forgot Password ?
          </h2>
          <Image
            src={forgetPasswordLockImg}
            alt="lock"
            width={200}
            height={200}
          />
          <h3 className="font-normal text-[16px] xl:text-lg max-w-xl text-center">
            Don’t worry! Please enter the phone number we will send the OTP in
            this phone number.
          </h3>
          <NumberInput
            leftSection={
              <span className="text-[#212c33] font-medium">+91</span>
            }
            classNames={{
              input: S.classForContact,
              error: S.errorMsg,
            }}
            hideControls
            size="lg"
            mt="sm"
            className="w-[100%] mb-[3%] rounded-[8px] bg-transparent "
            label=""
            placeholder="Enter Mobile Number"
            {...form.getInputProps("mobile")}
            maxLength={10}
            allowDecimal={false}
            onPaste={(event) => {
              const pastedText = event.clipboardData.getData("text/plain");
              const trimmedText = pastedText.replace(/\s/g, "");
              const first10Digits = trimmedText.replace(/\D/g, "").slice(0, 10);
              form.setFieldValue("mobile", first10Digits as any);
            }}
            allowNegative={false}
          />
          {/* <div className="min-w-[30px] self-start !max-w-[75px] flex justify-center items-center ">
            <CountryInput
              onSelect={displayCountryCode}
              className={`focus:outline-none min-w-[30px] !max-w-[75px] relative ${
                (form.errors.mobile != undefined &&
                  form.errors.mobile != null) ||
                status === "error"
                  ? "bottom-[71px]"
                  : "bottom-[47px]"
              }  ml-[2px]`}
            />
          </div> */}

          <div className="w-full flex justify-between items-center flex-wrap-reverse">
            <Button
              mt="sm"
              onClick={() => router.back()}
              className="!rounded-[6px] !border-solid  !w-[49%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] md:!w-[100%] md:!max-w-[178px]  "
            >
              <BackSvg /> Back
            </Button>
            <Button
              loading={status === "pending"}
              type="submit"
              mt="sm"
              className="!rounded-[6px] !w-[49%] md:!w-[100%]  md:!max-w-[225px] !bg-[#0c7aca]"
            >
              CONTINUE
            </Button>
          </div>
        </form>
      )}

      <ForgotAuthPopup
        callback={OtpCallback}
        opened={opened}
        open={open}
        close={onClose}
        userName={""}
        mobile={form.values.mobile && form.values.mobile}
      />
    </div>
  );
}

export default ForgotForm;
import StepCss from "@/app/styles/Stepper.module.css";
import ForgotSucess from "./complete/page";
import clsx from "clsx";
import toast from "react-hot-toast";
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at-least 6 digits")
    .max(40, "Password should not exceed 40 characters"),

  confirmPassword: yup
    .string()
    .required("Re- enter New password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return value === this.parent.password;
    })
    .max(40, "Password should not exceed 40 characters"),
});
const Form = ({ setStatus, mobile }: any) => {
  const form = useFormHook({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    shouldFocusError: true,
    mode: "all",
    criteriaMode: "firstError",
    progressive: true,
    resolver: yupHook(validationSchema),
  });
  const { login } = useAuth({ type: "login" });
  const onSubmit = async (values: any) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await resetPasswordApi(values.password).then(() => {
        login({
          password: values.password,
          username: mobile as string,
        });
      });
      setStatus("success");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const isPasswordMatched = () => {
    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    // Check if password length is greater than or equal to 6 characters
    if (password.length >= 6) {
      // If password length is valid, check if passwords match
      return password === confirmPassword;
    } else {
      // If password length is less than 6 characters, return false
      return false;
    }
  };
  return (
    <div className="w-full">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col "
      >
        <h2
          className={`whitespace-nowrap text-2xl font-bold text-[#148B16] text-center mt-1 mb-10`}
        >
          Reset Password
        </h2>
        <PasswordInput
          control={form.control}
          name="password"
          required
          size="lg"
          className="w-[100%] mb-[3%]"
          mt="sm"
          label="Enter New Password"
          placeholder="Enter Your Password"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOpen /> : <EyeClosed />
          }
          // {...form.getInputProps("password")}
          onBlurCapture={(e) =>
            handleTrimAndReplaceReactHookForm(e, "password", form.setValue)
          }
          type="text"
          classNames={{
            root: StepCss.inputRoot,
            error: StepCss.errorMsg,
            innerInput: StepCss.textInput,
          }}
          max={41}
        />
        <PasswordInput
          control={form.control}
          name="confirmPassword"
          required
          size="lg"
          className="w-[100%] mb-[3%]"
          mt="sm"
          label="Re-Enter New Password"
          placeholder="Enter Your Password"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOpen /> : <EyeClosed />
          }
          // {...form.getInputProps("confirmPassword")}
          onBlurCapture={(e) =>
            handleTrimAndReplaceReactHookForm(
              e,
              "confirmPassword",
              form.setValue
            )
          }
          type="text"
          classNames={{
            root: StepCss.inputRoot,
            error: StepCss.errorMsg,
            innerInput: StepCss.textInput,
          }}
          max={41}
        />
        {isPasswordMatched() && (
          <p className="text-right ml-auto text-[color:var(--Brand-green-primary,#148B16)] text-sm italic font-semibold leading-[normal]">
            Password matched
          </p>
        )}
        <Button
          type="submit"
          size={isMobile ? "compact-xs" : "md"}
          className="!w-[100%] !text-[18px]  !h-[57px] mt-[4%] !bg-[#0c7aca] rounded-[6px] xl:text-[20px]"
        >
          Update Password
        </Button>
      </form>
    </div>
  );
};
