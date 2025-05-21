"use client";
import S from "@/app/styles/Numinput.module.css";
import P from "@/app/styles/Pass.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box } from "@mantine/core";
import { NumberInput, TextInput, PasswordInput } from "react-hook-form-mantine";
import useAuth from "@/app/hooks/useAuth";
import {
  useRouter,
  // useSearchParams
} from "next/navigation";
import Link from "next/link";
import AuthPopup from "../authPopup";
import { useDisclosure } from "@mantine/hooks";
import {
  individualSchema,
  MAX_LENGTH_EMAIL,
  MAX_LENTH_TEXT,
} from "@/app/validations/auth";
import { useState } from "react";
import Success from "../success";
import { BackSvg, EyeClosed, EyeOpen } from "@/app/images/commonSvgs";
import {
  handleTrimAllSpaces,
  handleTrimAndReplaceReactHookForm,
} from "@/app/utils/input/validations";
import StepCss from "@/app/styles/Stepper.module.css";
import clsx from "clsx";
import { getQueryParamClient } from "@/app/hooks/custom/useRedirect";
import LoginSignupTabs from "@/app/(auth)/Components/LoginSignup";
import { useForm } from "react-hook-form";

function Individual() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const router = useRouter();
  const { register, saveStep, login } = useAuth({ type: "register" });
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", mobile: undefined },
    shouldFocusError: true,
    mode: "all",
    criteriaMode: "firstError",
    progressive: true,
    resolver: yupResolver(individualSchema),
  });
  const values = form.getValues();
  const onSubmit = async (values: any) => {
    setStatus("pending");
    const data = await register({ ...values, usertype: "I" });
    if (data?.status) {
      setStatus("otp");
      open();
    } else {
      if (data.flag === "m") {
        setStatus("error");
      } else if (data.flag === "e") {
        form.setError("email", {
          message: "Email already registered with us.",
        });
        setStatus("idle");
      } else {
        setStatus("idle");
      }
    }
  };

  const onClose = () => {
    setStatus("idle");
    close();
  };
  const OtpCallback = async () => {
    await login({
      password: values.password,
      username: values.mobile as unknown as string,
    });
    form.reset();
    setStatus("success");
    saveStep(2);
    close();
  };
  const queryParam = getQueryParamClient();
  return (
    <>
      {status === "success" ? (
        <Success />
      ) : (
        <Box className="w-full max-w-[423px] m-1 mt-[3%] " mx="auto">
          <div className=" sm:max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[15%] mb-[5%] ">
            <LoginSignupTabs
              searchParams={queryParam.query}
              state="signup"
              singupText="Individual Sign Up"
              className="!px-[14px]"
            />
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[100%] flex flex-col"
          >
            <TextInput
              control={form.control}
              name="name"
              required
              mt={"xs"}
              size="lg"
              className="w-[100%] mb-[3%] "
              label="Your Name"
              placeholder="Enter Your Name Here"
              maxLength={MAX_LENTH_TEXT}
              // {...form.getInputProps("name")}
              onBlurCapture={(e) =>
                handleTrimAndReplaceReactHookForm(e, "name", form.setValue)
              }
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
            />
            <TextInput
              name="email"
              control={form.control}
              // type="email"
              required
              size="lg"
              mt="xs"
              label="Email"
              placeholder="Enter Your Email Here"
              onBlurCapture={(e) =>
                handleTrimAllSpaces(
                  e.target.value,
                  "email",
                  form.setValue,
                  "email"
                )
              }
              maxLength={MAX_LENGTH_EMAIL}
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              mb={"3%"}
            />
            <PasswordInput
              name="password"
              control={form.control}
              mt={"xs"}
              classNames={{
                visibilityToggle: P.visibilityToggle,
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                innerInput: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              required
              maxLength={MAX_LENTH_TEXT}
              size="lg"
              className="w-[100%] mb-[3%] "
              label="Password"
              placeholder="Create Your password"
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <EyeOpen /> : <EyeClosed />
              }
              onBlurCapture={(e) =>
                handleTrimAndReplaceReactHookForm(e, "password", form.setValue)
              }
            />
            <NumberInput
              name="mobile"
              control={form.control}
              leftSection={
                <span className="text-[#212c33] font-medium text-[16px]">
                  +91
                </span>
              }
              mt={"xs"}
              required
              classNames={{
                root: StepCss.inputRoot,
                input: S.classForContact,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              hideControls
              size="lg"
              className={clsx(
                "w-[100%] mb-[3%] ",
                status === "error" && "!mb-[2px]"
              )}
              label="Mobile Number"
              placeholder="Enter Your Mobile Number"
              // {...form.getInputProps("mobile")}
              error={
                form.formState.errors.mobile?.message || status === "error"
              }
              onChange={(e) => {
                form.setValue("mobile", e as any);
                if (status === "error") {
                  setStatus("idle");
                }
              }}
              allowDecimal={false}
              maxLength={10}
              onPaste={(event) => {
                form.clearErrors();
                if (status === "error") {
                  setStatus("idle");
                }

                const pastedText = event.clipboardData.getData("text/plain");

                // Remove all spaces and non-digit characters, then remove leading zeros
                const trimmedText = pastedText
                  .replace(/\D/g, "")
                  .replace(/^0+/, "");
                // console.log(trimmedText);
                // Keep only the first 10 digits after processing
                const first10Digits = trimmedText.slice(0, 10);

                form.setValue("mobile", Number(first10Digits) as any);
              }}
              allowNegative={false}
              onBlurCapture={() =>
                (values.mobile as any) === "" &&
                form.setValue("mobile", undefined as any)
              }
            />
            {status === "error" && (
              <p className=" text-right text-[color:var(--Mandatory,#F00)] text-[12px] xl:text-[15px] italic font-medium leading-[normal]">
                Account already exists. Kindly use{" "}
                <Link
                  href={{ pathname: "/login", search: queryParam.query }}
                  className="text-[#0073C6] text-[15px] italic font-bold leading-[normal] underline"
                >
                  Login
                </Link>{" "}
                below
              </p>
            )}

            <div className="w-full flex justify-between items-center flex-wrap-reverse">
              <Button
                mt="sm"
                onClick={() => router.back()}
                className="!rounded-[6px] !border-solid  !w-[49%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] lg:!w-[100%] md:!max-w-[178px]  "
              >
                <BackSvg /> Back
              </Button>
              <Button
                loading={status === "pending"}
                type="submit"
                mt="sm"
                className="!rounded-[6px] !w-[49%] md:!w-[100%]  md:!max-w-[225px] !bg-[#0c7aca]"
              >
                SAVE & VERIFY
              </Button>
            </div>

            <Link
              href={{ pathname: "/login", search: queryParam.query }}
              className="text-[#002749] font-semibold  sm:text-[14px] flex gap-1 justify-center items-center  rounded border p-2 border-solid border-[#B2B2B2] mb-3 mt-[5%] text-nowrap max-w-fit m-auto"
            >
              Already have an Account?
              <span className="sm:text-[14px]  text-[#0C7ACA]  not-italic font-semibold text-nowrap">
                LogIn
              </span>
            </Link>
            {status === "error" && (
              <p className="text-center text-[#556477] text-[16px] font-[600] xl:text-xl not-italic xl:font-medium leading-[normal] xl:mt-3 mb-[15px]">
                Forgot Password?{" "}
                <Link
                  href={{ pathname: "/forgot", search: queryParam.query }}
                  className="text-[color:var(--Brand-green-primary,#148B16)] text-[16px] xl:text-xl not-italic font-[600] xl:font-medium leading-[normal] underline"
                >
                  Reset
                </Link>
              </p>
            )}

            <Link
              href={{ pathname: "/" }}
              className=" not-italic text-[#148B16] text-[14px]  font-semibold   leading-[normal]  sm:font-[400] border rounded-sm p-2 border-solid border-[#148B16] text-center max-w-fit m-auto"
            >
              Continue without Register
            </Link>
          </form>
        </Box>
      )}

      <AuthPopup
        callback={OtpCallback}
        opened={opened}
        open={open}
        close={onClose}
        userName={values.email}
        mobile={values.mobile && values.mobile}
      />
    </>
  );
}

export default Individual;
