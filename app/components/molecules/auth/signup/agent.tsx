"use client";
import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  // Code, rem, FocusTrap
} from "@mantine/core";
import { TextInput, PasswordInput, NumberInput } from "react-hook-form-mantine";
import N from "@/app/styles/Numinput.module.css";
import S from "@/app/styles/Pass.module.css";
import {
  useRouter,
  // useSearchParams
} from "next/navigation";
import Link from "next/link";
import { styles } from "@/app/styles/Stepper";
// import { DropZone } from "./dropzone";
import { useDisclosure } from "@mantine/hooks";
import AuthPopup from "../authPopup";
import useAuth from "@/app/hooks/useAuth";
import Success from "../success";
import {
  BackSvg,
  EyeClosed,
  EyeOpen,
  StepperDotGray,
  StepperDotGreen,
} from "@/app/images/commonSvgs";
import StepCss from "@/app/styles/Stepper.module.css";
import { registerOtherParser } from "@/app/utils/parse";
import {
  // handleTrimAndReplace,
  handleTrimAllSpaces,
  handleTrimAndReplaceReactHookForm,
} from "@/app/utils/input/validations";
import clsx from "clsx";
import { getQueryParamClient } from "@/app/hooks/custom/useRedirect";
import LoginSignupTabs from "@/app/(auth)/Components/LoginSignup";
import { useForm } from "react-hook-form";
import {
  addressSchema,
  agentSchema,
  MAX_LENGTH_ADDRESS,
  MAX_LENGTH_COMPANY_NAME,
  MAX_LENGTH_EMAIL,
  MAX_LENTH_TEXT,
} from "@/app/validations/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie } from "cookies-next";
import Alert from "./Alert";
function Agent({ encriptedData }: any) {
  const singupCookie = getCookie("resume_signup_tokena")?.toString();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const [active, setActive] = useState(encriptedData || singupCookie ? 1 : 0);
  const router = useRouter();
  const { registerOtherDetails, register, login, saveStep } = useAuth({
    type: "register",
  });

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<any>({
    reValidateMode: "onBlur",
    shouldUseNativeValidation: false,
    defaultValues: {
      userName: "",
      email: "",
      password: encriptedData?.password || "",
      mobile: encriptedData?.username || undefined,
      companyName: "",
      companyLogo: undefined,
      address: "",
      otp: false,
      prevMobile: 0,
      prevEmail: "",
    },
    shouldFocusError: true,
    mode: "all",
    criteriaMode: "firstError",
    progressive: true,

    // @ts-ignore
    resolver: yupResolver(active === 0 ? agentSchema : addressSchema),
  });
  const formValues = form.getValues();

  const OtpCallback = () => {
    close();
    form.setValue("otp", true);
    form.setValue("prevMobile", formValues.mobile as unknown as number);
    form.setValue("prevEmail", formValues.email as unknown as string);
    // form.setValues({
    //   otp: true,
    //   prevMobile: form.values.mobile as unknown as number,
    //   prevEmail: form.values.email as unknown as string,
    // });
    setActive(1);
    saveStep(2);
  };
  const nextStep = async (submittedData: any) => {
    // console.log(rest);

    // // Validate the form
    // if (!form.formState.isValid) {
    //   return;
    // }
    // Handle API call based on the current step
    let values = submittedData;
    if (active === 0) {
      if (
        values.otp &&
        values.mobile === values.prevMobile /* &&
        form.values.email === form.values.prevEmail */
      ) {
        // If OTP is already verified and mobile number is the same, move to the next step
        setActive(1);
      } else {
        // If OTP is not verified or mobile number has changed, make the API call
        setStatus("pending");
        //@ts-ignore
        let data = await register({ ...values, usertype: "A" });
        // console.log(data);
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
      }
    }
    if (active === 1) {
      // if (form.formState.isValid) {
      // eslint-disable-next-line no-unused-vars
      const data = await registerOtherDetails(
        registerOtherParser({ ...values })
      ).then(() => {
        saveStep(3);
        login({
          password: values.password,
          username: values.mobile as unknown as string,
        });
      });
      setActive((current) => (current < 3 ? current + 1 : current));
      // }
      // API call for the second step
      // Customize this based on your requirements
    } else if (active === 2) {
      // Proceed to the next step after the API call
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };
  // type LogoFile = File | null;

  // const handleLogoSelect = (logo: LogoFile): void => {
  //   // @ts-ignore
  //   form.setValue("companyLogo", logo);
  // };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  // const displayCountryCode = (value: any) => {
  //   console.log(value);
  // };
  // const logo = form.watch("companyLogo");

  const queryParam = getQueryParamClient();
  return (
    <div
      className={clsx(
        "w-full max-w-[423px] flex justify-center items-center flex-col m-[2%] ",
        active == 2 && "max-w-full"
      )}
    >
      {active !== 2 && (
        <div className=" sm:max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[15%] mb-[5%] ">
          <LoginSignupTabs
            searchParams={queryParam.query}
            state="signup"
            singupText="Agent Sign Up"
            className="!px-[14px]"
          />
        </div>
      )}

      <AuthPopup
        mobile={formValues.mobile}
        callback={OtpCallback}
        opened={opened}
        open={open}
        close={close}
        userName={formValues.email}
      />
      {(encriptedData || singupCookie) && (
        <Alert isTouched={form.formState.isDirty} type="agent" />
      )}
      <form onSubmit={form.handleSubmit(nextStep)} className="w-full ">
        <Stepper
          color="green"
          iconSize={24}
          active={active}
          mt={"xs"}
          size="xs"
          className="!w-full"
          // @ts-ignore
          styles={styles}
          classNames={{
            root: StepCss.aRoot,
            steps: active === 2 ? StepCss.rootSuccess : StepCss.aSteps,
            step: StepCss.step,
            separator: StepCss.separatorForAgent,
            stepLabel: StepCss.steplabelCommonForAll,
            content: StepCss.content,
            stepCompletedIcon: StepCss.compltedIcon,
          }}
        >
          <Stepper.Step
            autoSave={"true"}
            label="Personal Details"
            icon={<StepperDotGreen className={StepCss.stepperIcon} />}
            classNames={{
              stepLabel:
                active === 0
                  ? StepCss.stepLabelActive
                  : active > 0
                  ? StepCss.stepLabelDone
                  : StepCss.stepLabel,
              stepIcon: active === 0 ? StepCss.stepIcon : StepCss.compltedIcon,
            }}
          >
            <TextInput
              control={form.control}
              name="userName"
              required
              size="lg"
              label="Your Name"
              placeholder="Enter Your Name Here"
              // {...form.getInputProps("userName")}
              onBlurCapture={(e) =>
                handleTrimAndReplaceReactHookForm(e, "userName", form.setValue)
              }
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              maxLength={MAX_LENTH_TEXT}
            />

            <TextInput
              key={"email"}
              name="email"
              control={form.control}
              required
              size="lg"
              mt="sm"
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
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              maxLength={MAX_LENGTH_EMAIL}
            />
            <PasswordInput
              control={form.control}
              name="password"
              required
              classNames={{
                visibilityToggle: S.visibilityToggle,
                root: StepCss.inputRoot,
                innerInput: StepCss.textInput,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              size="lg"
              mt={"xs"}
              label="Password"
              placeholder="Create Your Password"
              // {...form.getInputProps("password")}
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <EyeOpen /> : <EyeClosed />
              }
              onBlurCapture={(e) =>
                handleTrimAndReplaceReactHookForm(e, "password", form.setValue)
              }
              maxLength={MAX_LENTH_TEXT}
            />
            <NumberInput
              valueIsNumericString
              control={form.control}
              name="mobile"
              leftSection={
                <span className="text-[#212c33] font-medium">+91</span>
              }
              required
              hideControls
              size="lg"
              mt={"xs"}
              className={clsx(
                "w-[100%] mb-[3%] ",
                status === "error" && "!mb-[2px]"
              )}
              label="Mobile Number"
              placeholder="Enter Your Mobile Number"
              // {...form.getInputProps("mobile")}
              error={
                (form?.formState?.errors?.mobile?.message as string) ||
                status === "error"
              }
              onChange={(e) => {
                form.setValue("mobile", e as any);
                if (status === "error") {
                  setStatus("idle");
                }
              }}
              allowNegative={false}
              classNames={{
                root: StepCss.inputRoot,
                input: N.classForContact,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              maxLength={10}
              allowDecimal={false}
              onPaste={(event) => {
                form.clearErrors("mobile");
                if (status === "error") {
                  setStatus("idle");
                }
                const pastedText = event.clipboardData.getData("text/plain");
                const trimmedText = pastedText
                  .replace(/\D/g, "")
                  .replace(/^0+/, "");
                const first10Digits = trimmedText.slice(0, 10);
                form.setValue("mobile", Number(first10Digits) as any);
              }}
              // onBlurCapture={(e) =>
              //   formValues.mobile == "" &&
              //   form.setValue("mobile", undefined as any)
              // }
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
            {/* <div className="min-w-[30px] !max-w-[75px] flex justify-center items-center ">
            <CountryInput
              onSelect={displayCountryCode}
              className={`focus:outline-none min-w-[30px] !max-w-[75px] relative ${
                (form.errors.mobile != undefined &&
                  form.errors.mobile != null) ||
                status === "error"
                  ? "bottom-[65px]"
                  : "bottom-[45px]"
              }  ml-[2px]`}
            />
          </div> */}
          </Stepper.Step>

          <Stepper.Step
            label="Address & Others"
            icon={active > 0 ? <StepperDotGreen /> : <StepperDotGray />}
            classNames={{
              stepLabel:
                active > 1 ? StepCss.stepLabelActive : StepCss.stepLabel,
              stepIcon: active > 1 ? StepCss.stepIconActive : StepCss.stepIcon,
            }}
          >
            {" "}
            <TextInput
              key={"companyName"}
              control={form.control}
              name="companyName"
              required
              size="lg"
              // mt={"xs"}
              label="Company Name"
              placeholder="Enter your company name here"
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              onBlurCapture={(e) =>
                handleTrimAndReplaceReactHookForm(
                  e,
                  "companyName",
                  form.setValue
                )
              }
              maxLength={MAX_LENGTH_COMPANY_NAME}
            />
            <TextInput
              mt={"xs"}
              key={"address"}
              name="address"
              control={form.control}
              required
              size="lg"
              label="Office Address"
              placeholder="Enter your office address here"
              classNames={{
                root: StepCss.inputRoot,
                input: StepCss.textInput,
                error: StepCss.errorMsg,
                label: StepCss.mlabelCss,
              }}
              onBlurCapture={(e) =>
                handleTrimAndReplaceReactHookForm(e, "address", form.setValue)
              }
              maxLength={MAX_LENGTH_ADDRESS}
              mb={40}
            />
            {/* <DropZone onLogoSelect={handleLogoSelect} logo={logo ?? ""} /> */}
          </Stepper.Step>

          <Stepper.Completed>
            {/* Completed! Form values: */}
            <Success />
            {/* <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code> */}
            {/* {(window.location.href = "http://localhost:3000/success")} */}
          </Stepper.Completed>
        </Stepper>

        <Group justify="flex-end" className="w-full">
          {active !== 2 && (
            <div className="w-[100%] flex justify-between items-center flex-wrap">
              <Button
                disabled={(encriptedData || singupCookie) && active === 1}
                mt="sm"
                onClick={() => {
                  active !== 0 ? prevStep() : router.back();
                }}
                className="!rounded-[6px] !border-solid  !w-[46%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] md:!w-[100%] md:!max-w-[178px] disabled:opacity-50"
              >
                <BackSvg />
                Back
              </Button>

              <Button
                loading={status === "pending"}
                mt="sm"
                className="!rounded-[6px] !w-[52%] md:!w-[100%]  md:!max-w-[225px] !bg-[#0c7aca]"
                // onClick={nextStep}
                type="submit"
              >
                {formValues.otp &&
                formValues.mobile === formValues.prevMobile &&
                formValues.email === formValues.prevEmail
                  ? "Save & Continue"
                  : "Save & Verify"}

                {/* {active === 0 ? "Save & Verify" : "Save & Continue"} */}
              </Button>
            </div>
          )}
        </Group>
      </form>
      {active === 0 && (
        <>
          <Link
            href={{ pathname: "/login", search: queryParam.query }}
            className="text-[#002749] font-semibold  sm:text-[14px] flex justify-center items-center gap-1 rounded border p-2 border-solid border-[#B2B2B2] mb-3 mt-[5%] text-nowrap max-w-fit m-auto"
          >
            Already have an Account?
            <span className="sm:text-[14px]  text-[#0C7ACA]  not-italic font-semibold text-nowrap">
              LogIn
            </span>
          </Link>
          {status === "error" && (
            <p className="text-center text-[#556477] font-semibold md:text-xl not-italic xl:font-medium leading-[normal] mt-2 xl:mt-3 mb-[16px]">
              Forgot Password?{" "}
              <Link
                href={{ pathname: "/forgot", search: queryParam.query }}
                className="text-[color:var(--Brand-green-primary,#148B16)] md:text-xl not-italic font-medium leading-[normal] underline"
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
        </>
      )}
    </div>
  );
}

export default Agent;
