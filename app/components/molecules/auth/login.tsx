"use client";
import { PasswordInput, NumberInput } from "react-hook-form-mantine";
import {
  Button,
  // Box,
  em,
} from "@mantine/core";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import { EyeClosed, EyeOpen } from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";
import {
  // handleTrimAndReplace,
  // handleAllTrimAndReplace,
  handleTrimAndReplaceReactHookForm,
} from "@/app/utils/input/validations";
import StepCss from "@/app/styles/Stepper.module.css";
import {
  getCallPathServer,
  getQueryParam,
} from "@/app/hooks/custom/useRedirect";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MAX_LENTH_TEXT } from "@/app/validations/auth";
// import { TbArrowAutofitDown } from "react-icons/tb";
const schema = yup.object().shape({
  username: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .test(
      "len",
      "Mobile number should be 10 digit",
      (val) => val?.toString().length === 10
    )
    .required("Mobile number is required")
    .typeError("Mobile number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must be under 40 characters"),
});

function Login({ params }: any) {
  const [state, setState] = useState<"idle" | "pending" | "success">("idle");
  // const form = useForm({
  //   initialValues: { username: null, password: "" },
  //   validate: yupResolver(schema),
  //   validateInputOnBlur: true,
  // });
  const {
    control,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { isLoading },
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: { username: undefined, password: "" },
    shouldFocusError: true,
    mode: "onTouched",
    criteriaMode: "firstError",
    resolver: yupResolver(schema),
  });

  const { login } = useAuth({ type: "login" });
  const onSubmit = async (values: any) => {
    setState("pending");
    await login(values);
    setState("success");
  };

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <div className="sm:max-w-[420px] xl:max-w-[423px] m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[100%] flex justify-center items-center flex-col "
      >
        <NumberInput
          control={control}
          name="username"
          mt={"xs"}
          required
          allowNegative={false}
          classNames={{
            root: StepCss.inputRoot,
            input: StepCss.textInput,
            error: StepCss.errorMsg,
            label: StepCss.custlabelOfNum,
          }}
          hideControls
          size="lg"
          className="w-[100%]  mb-[3%] "
          label="Mobile Number"
          placeholder="Enter Your Mobile Number"
          // {...form.getInputProps("username")}
          maxLength={10}
          allowDecimal={false}
          onPaste={(event) => {
            clearErrors("username");
            const pastedText = event.clipboardData.getData("text/plain");
            const trimmedText = pastedText.replace(/\s/g, "");
            const first10Digits = trimmedText.replace(/\D/g, "").slice(0, 10);
            setValue("username", Number(first10Digits) as any);
          }}
        />

        <PasswordInput
          control={control}
          name="password"
          classNames={{
            root: StepCss.inputRoot,
            error: StepCss.errorMsg,
            innerInput: StepCss.textInput,
            label: StepCss.custlabelOfNum,
          }}
          required
          size="lg"
          className="w-[100%] mb-[1%]"
          mt="sm"
          label="Password"
          placeholder="Enter Your Password"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOpen /> : <EyeClosed />
          }
          maxLength={MAX_LENTH_TEXT}
          // {...form.getInputProps("password")}
          onBlurCapture={(e) =>
            handleTrimAndReplaceReactHookForm(e, "password", setValue)
          }
        />

        <Link
          href={{ pathname: "/forgot", search: getQueryParam(params) }}
          className="text-[#0C7ACA] text-sm not-italic font-semibold mb-[1%] xl:mb-[2%]  w-full cursor-pointer "
        >
          Forgot Password ?
        </Link>

        <Button
          loading={state === "pending"}
          type="submit"
          size={isMobile ? "compact-xs" : "md"}
          className="!w-[100%] !h-[50px]  mt-[4%] !bg-[#0c7aca] rounded-[6px] !text-[20px] sm:h-[57px] !font-extrabold:"
        >
          LOGIN
        </Button>
        <div className="text-center mt-6 ">
          <Link
            href={{ pathname: "/register", search: getQueryParam(params) }}
            className="text-[#282828]  flex justify-center items-center gap-1 rounded border p-2 border-solid border-[#B2B2B2] mb-[20px] text-nowrap text-[14px] font-[400]"
          >
            New User?{" "}
            <span className="text-[14px]  text-[#0C7ACA]  font-semibold  not-italic text-nowrap   ">
              Create an account
            </span>
          </Link>
          <Link
            href={{ pathname: getCallPathServer(params) }}
            className="text-[14px] leading-[normal]    border rounded-sm p-2 border-solid border-[#148B16] text-[#148B16] not-italic "
          >
            Continue without login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
