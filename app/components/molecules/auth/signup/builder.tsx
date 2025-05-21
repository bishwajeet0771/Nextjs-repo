"use client";
import dayjs from "dayjs";
import "@mantine/dates/styles.css";
import { useRef, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  // Code,
  Text,
  SimpleGrid,
  ScrollArea,
} from "@mantine/core";
import {
  TextInput,
  PasswordInput,
  Textarea,
  MultiSelect,
  Select,
  NumberInput,
  DateInput,
} from "react-hook-form-mantine";
import StepCss from "@/app/styles/Stepper.module.css";

// import { DateInput } from "@mantine/dates";
import Link from "next/link";
import {
  // usePathname,
  useRouter,
} from "next/navigation";
import { styles } from "@/app/styles/Stepper";
import { DropZone } from "./dropzone";
import AuthPopup from "../authPopup";
import {
  randomId,
  useDisclosure,
  // usePageLeave
} from "@mantine/hooks";
import useAuth from "@/app/hooks/useAuth";
import Success from "../success";
import { useQuery } from "react-query";
import {
  getAllCitiesDetails,
  getCitiesDetails,
  getStatesDetails,
} from "@/app/utils/stats_cities";
import {
  // deleteCookie,
  getCookie,
} from "cookies-next";
import {
  cityParser,
  registerOtherParser,
  stateParser,
} from "@/app/utils/parse";
import {
  // agentSchema,
  builderFirstStepSchema,
  builderSchema,
  builderSchemaIndex1,
  MAX_LENGTH_ADDRESS,
  MAX_LENGTH_COMPANY_NAME,
  MAX_LENGTH_EMAIL,
  MAX_LENTH_TEXT,
  textAreaScema,
} from "@/app/validations/auth";
// import CountryInput from "@/app/components/atoms/CountryInput";
import N from "@/app/styles/Numinput.module.css";
// import OldRouter from "next/router";
import {
  BackSvg,
  DateIcons,
  DropdownArrowIcon,
  EyeClosed,
  EyeOpen,
  StepperDotGray,
  StepperDotGreen,
} from "@/app/images/commonSvgs";
import {
  // handleAllTrimAndReplace,
  handleTrimAllSpaces,
  handleTrimAndReplaceReactHookForm,
} from "@/app/utils/input/validations";
import clsx from "clsx";
import { getQueryParamClient } from "@/app/hooks/custom/useRedirect";
import LoginSignupTabs from "@/app/(auth)/Components/LoginSignup";
import AddmoreInput from "@/app/(auth)/Components/addmore";
import Alert from "./Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Builder({ encriptedData }: any) {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");
  const singupCookie = getCookie("resume_signup_tokenb")?.toString();
  const [active, setActive] = useState(encriptedData || singupCookie ? 1 : 0);
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const { registerOtherDetails, register, login, saveStep } = useAuth({
    type: "register",
  });

  const newForm = useForm<any>({
    reValidateMode: "onBlur",
    shouldUseNativeValidation: false,
    defaultValues: {
      userName: "",
      email: "",
      password: encriptedData?.password || "",
      mobile: encriptedData?.username || null,
      address: "",
      companyName: "",
      state: "",
      city: null,
      pincode: null,
      companyStartDate: null,
      branch: [],
      ceoName: [{ name: "", active: false, key: randomId() }],
      /*   foundedBy: "", */
      mission: "",
      vission: "",
      officeContact: null,
      managingDirectorName: [{ name: "", active: false, key: randomId() }],
      companyLogo: undefined,
      otp: false,
      prevMobile: 0,
      prevEmail: "",
      foundedBy: [{ name: "", active: false, key: randomId() }],
    },
    shouldFocusError: true,
    mode: "all",
    criteriaMode: "firstError",
    progressive: true,
    resolver: yupResolver(
      // @ts-ignore
      active === 0
        ? builderFirstStepSchema
        : active === 1
        ? builderSchemaIndex1
        : active === 2
        ? builderSchema
        : active === 3
        ? textAreaScema
        : {}
    ),
  });
  const form = {
    values: newForm.getValues(),
  };

  const { data: statesData, isLoading: isLoadingStates } = useQuery(
    ["states"],
    getStatesDetails,
    {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      cacheTime: 30000,
      refetchIntervalInBackground: false,
    }
  );
  const { data: brachData, isLoading: isLoadingBrach } = useQuery(
    ["brach"],
    getAllCitiesDetails,
    {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      cacheTime: 30000,
      refetchIntervalInBackground: false,
    }
  );
  const liveState = newForm.watch("state");
  const { data: citiesData, isLoading: isLoadingCities } = useQuery(
    ["cities" + liveState],
    () => getCitiesDetails(parseInt(liveState)),
    {
      enabled: !!liveState,
      staleTime: 30000,
      refetchOnWindowFocus: false,
      cacheTime: 30000,
      refetchIntervalInBackground: false,
    }
  );

  const OtpCallback = () => {
    close();
    // newForm.setValue({
    //   otp: true,
    //   prevMobile: form.values.mobile as unknown as number,
    //   prevEmail: form.values.email as unknown as string,
    // });
    newForm.setValue("otp", true);
    newForm.setValue("prevMobile", form.values.mobile as unknown as number);
    newForm.setValue("prevEmail", form.values.email as unknown as string);
    saveStep(2);
    setActive(1);
  };
  // const onError = (errors: any) => {
  //   const errorsKeys = Object.keys(errors);
  //   if (active === 2 && errorsKeys[0]) {
  //     scrollWhereIsSelected(errorsKeys[0]);
  //     return;
  //   }
  //   return;
  // };
  const nextStep = async (values: any) => {
    try {
      switch (active) {
        case 0:
          if (
            form.values.otp &&
            form.values.mobile === form.values.prevMobile /*  &&
            form.values.email === form.values.prevEmail */
          ) {
            // If OTP is already verified and mobile number is the same, move to the next step
            setActive(1);
          } else {
            // API call for the first step
            setStatus("pending");
            //@ts-ignore
            let data = await register({ ...values, usertype: "B" });
            if (data?.status) {
              setStatus("otp");
              open();
            } else {
              if (data.flag === "m") {
                setStatus("error");
              } else if (data.flag === "e") {
                newForm.setError("email", {
                  message: "Email already registered with us.",
                });
                setStatus("idle");
              } else {
                setStatus("idle");
              }
            }
          }
          break;
        case 1:
          setActive((current) => (current < 3 ? current + 1 : current));
          saveStep(3);
          break;
        case 2: {
          const fieldsToClean = [
            "foundedBy",
            "ceoName",
            "managingDirectorName",
          ];
          fieldsToClean.forEach((field) => {
            const filteredArray = values[field].filter(
              (item: any) => item.name.trim() !== ""
            );
            newForm.setValue(field, filteredArray);
          });
          setActive((current) => (current < 3 ? current + 1 : current));
          saveStep(4);
          break;
        }
        case 3:
          {
            setStatus("pending");
            if (!values.companyStartDate) return;
            const date = new Date(values.companyStartDate);
            const day = date.getDate();
            const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            // API call for the third step
            // eslint-disable-next-line no-unused-vars
            const otherDetailsData = await registerOtherDetails(
              // @ts-ignore
              registerOtherParser({
                ...values,
                branch: values.branch.map((item: any) => parseInt(item)),
                companyStartDate: formattedDate,
              })
            ).then(async () => {
              await saveStep(5);
              await login({
                password: form.values.password,
                username: form.values.mobile as unknown as string,
              });
            });
            setStatus("success");
            // Proceed to the next step after the API call
            setActive((current) => (current < 4 ? current + 1 : current));
          }
          break;
        // Add more cases if needed for other steps
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message)
    }
  };
  type LogoFile = File | null;
  const handleLogoSelect = (logo: LogoFile): void => {
    // @ts-ignore
    newForm.setValue("companyLogo", logo);
  };
  const logo = newForm.watch("companyLogo");
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  // const displayCountryCode = (value: any) => {
  //   console.log(value);
  // };
  const handleStateChange = (state: string) => {
    newForm.setValue("state", state);
    // Clear the city field when the state changes
    newForm.setValue("city", null);
  };
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = (customValue?: number) =>
    viewport.current!.scrollTo({
      top: customValue ?? viewport.current!.scrollHeight,
      behavior: "smooth",
    });
  // const scrollWhereIsSelected = (item: string) => {
  //   const data = [
  //     "companyName",
  //     "branch",
  //     "ceoName",
  //     "foundedBy",
  //     "managingDirectorName",
  //     "officeContact",
  //     "companyStartDate",
  //   ];
  //   const TOP_MULTIPLIER = 60;

  //   const selectedElement = document.getElementById(item);

  //   if (selectedElement && viewport.current) {
  //     if (item === "officeContact") {
  //       // Scroll to the bottom for 'officeContact'
  //       viewport.current.scrollTo({
  //         top: selectedElement.scrollHeight, // Scroll to the bottom of the element
  //         behavior: "smooth",
  //       });
  //     } else {
  //       // Calculate the position based on TOP_MULTIPLIER for other elements
  //       const errorPosition =
  //         data.findIndex((element) => element === item) * TOP_MULTIPLIER;

  //       viewport.current.scrollTo({
  //         top: errorPosition,
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // };
  const handleBuilderNameCallback = (isSpecialCharacters: boolean) => {
    if (isSpecialCharacters) {
      newForm.setError("builderName", {
        type: "custom",
        message: "Note: Special characters (e.g., ./@) are not allowed.",
      });
      setTimeout(() => {
        newForm.clearErrors("builderName");
      }, 4000);
    }
  };
  const queryParam = getQueryParamClient();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* {(encriptedData || singupCookie) && <Alert isTouched={form.isDirty()} />} */}

      <div
        className={clsx(
          "w-full max-w-[423px] flex justify-center items-center flex-col mt-[2%]",
          active === 4 && "max-w-full"
        )}
      >
        {active !== 4 && (
          <div className=" sm:max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[15%] mb-[5%] ">
            <LoginSignupTabs
              searchParams={queryParam.query}
              state="signup"
              singupText="Builder Sign Up"
              className="!px-[14px]"
            />
            {/* <Link
            href={{
              pathname: "/login",
              search: queryParam.query,
            }}
            className="whitespace-nowrap  text-xl md:text-[26px] font-[500] text-[#666]"
          >
            Log In
          </Link>

          <Link
            href={{
              pathname: "/register",
              search: queryParam.query,
            }}
            className="whitespace-nowrap text-xl md:text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
          >
            Builder Sign Up
          </Link> */}
          </div>
        )}

        <AuthPopup
          mobile={form.values.mobile}
          callback={OtpCallback}
          opened={opened}
          open={open}
          close={close}
          userName={form.values.email}
        />
        {(encriptedData || singupCookie) && active !== 4 && (
          <Alert type="builder" isTouched={newForm.formState.isDirty} />
        )}
        <form onSubmit={newForm.handleSubmit(nextStep)} className="w-full">
          <Stepper
            //@ts-ignore
            styles={styles}
            size="xs"
            active={active}
            className="w-full"
            color="green"
            iconSize={24}
            mt={"xs"}
            classNames={{
              root: StepCss.root,
              steps: active === 4 ? StepCss.rootSuccess : StepCss.steps,
              step: StepCss.step,
              separator: StepCss.separator,
              stepLabel: StepCss.steplabelCommonForAll,
              content: StepCss.content,
              stepCompletedIcon: StepCss.icon,
            }}
            key={active}
            // completedIcon
          >
            <Stepper.Step
              label="Personal Details"
              icon={<StepperDotGreen />}
              classNames={{
                stepIcon:
                  active === 0 ? StepCss.stepIcon : StepCss.compltedIcon,
                stepLabel:
                  active === 0
                    ? StepCss.stepLabelActive
                    : active > 0
                    ? StepCss.stepLabelDone
                    : StepCss.stepLabel,
              }}
            >
              <TextInput
                name="userName"
                control={newForm.control}
                {...(newForm.formState.errors?.builderName && {
                  description: newForm.formState.errors?.builderName
                    .message as string,
                })}
                required
                size="lg"
                label="Builder Name"
                placeholder="Enter builder name here"
                onBlurCapture={(e) =>
                  handleTrimAndReplaceReactHookForm(
                    e,
                    "userName",
                    newForm.setValue,
                    "builderName",
                    handleBuilderNameCallback
                  )
                }
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                  description: "!text-[14px] font-semibold !text-[#0073C6]",
                }}
                mt={"md"}
                maxLength={MAX_LENGTH_COMPANY_NAME}
              />
              <TextInput
                name="email"
                control={newForm.control}
                required
                size="lg"
                mt="sm"
                label="Email"
                placeholder="Enter your email here"
                // {...form.getInputProps("email")}
                onBlurCapture={(e) =>
                  handleTrimAllSpaces(
                    e.target.value,
                    "email",
                    newForm.setValue,
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
                name="password"
                control={newForm.control}
                required
                size="lg"
                mt="sm"
                classNames={{
                  innerInput: StepCss.textInput,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                label="Password"
                placeholder="Create Your Password"
                // {...form.getInputProps("password")}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <EyeOpen /> : <EyeClosed />
                }
                onBlurCapture={(e) =>
                  handleTrimAndReplaceReactHookForm(
                    e,
                    "password",
                    newForm.setValue
                  )
                }
                maxLength={MAX_LENTH_TEXT}
              />
              <NumberInput
                name="mobile"
                control={newForm.control}
                leftSection={
                  <span className="text-[#212c33] font-medium">+91</span>
                }
                required
                classNames={{
                  input: N.classForContact,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                hideControls
                size="lg"
                mt="sm"
                className={clsx(
                  "w-[100%] mb-[3%] ",
                  status === "error" && "!mb-[2px]"
                )}
                label="Mobile Number"
                placeholder="Enter Your Mobile Number"
                // {...form.getInputProps("mobile")}
                error={
                  (newForm.formState.errors.mobile?.message as string) ||
                  status === "error"
                }
                onChange={(e) => {
                  newForm.setValue("mobile", e as any);
                  if (status === "error") {
                    setStatus("idle");
                  }
                }}
                allowNegative={false}
                maxLength={10}
                withErrorStyles
                allowDecimal={false}
                // onCut={() => {
                //   newForm.clearErrors("mobile");
                //   newForm.setValue("mobile", undefined as any);
                // }}
                onPaste={(event) => {
                  newForm.clearErrors("mobile");
                  if (status === "error") {
                    setStatus("idle");
                  }
                  const pastedText = event.clipboardData.getData("text/plain");
                  // Remove all spaces and non-digit characters, then remove leading zeros
                  const trimmedText = pastedText
                    .replace(/\D/g, "")
                    .replace(/^0+/, "");
                  // Keep only the first 10 digits after processing
                  const first10Digits = trimmedText.slice(0, 10);

                  newForm.setValue("mobile", Number(first10Digits) as any);
                }}
                // onBlurCapture={(e) =>
                //   form.values.mobile === "" &&
                //   newForm.setValue("mobile", undefined as any)
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
              label="Address & Other"
              icon={active >= 1 ? <StepperDotGreen /> : <StepperDotGray />}
              classNames={{
                stepLabel:
                  active === 1
                    ? StepCss.stepLabelActive
                    : active > 1
                    ? StepCss.stepLabelDone
                    : StepCss.stepLabel,
                stepIcon: active > 1 ? StepCss.compltedIcon : StepCss.stepIcon,
              }}
            >
              <TextInput
                key={"address"}
                name="address"
                control={newForm.control}
                required
                size="lg"
                label="Office Address"
                placeholder="Enter your office address"
                // {...form.getInputProps("address")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleTrimAndReplaceReactHookForm(
                    e,
                    "address",
                    newForm.setValue
                  );
                }}
                maxLength={MAX_LENGTH_ADDRESS}
              />

              <Select
                key={"state"}
                name="state"
                control={newForm.control}
                rightSection={<DropdownArrowIcon />}
                required
                size="lg"
                mt="md"
                label="State"
                placeholder="Select state"
                data={isLoadingStates ? [] : stateParser(statesData) || []}
                searchable
                maxDropdownHeight={200}
                onChange={(e) => handleStateChange(e as string)}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  dropdown: StepCss.dropdown,
                  label: StepCss.mlabelCss,
                  option: StepCss.optionCss,
                }}
                withScrollArea={false}
              />
              <SimpleGrid cols={2}>
                <Select
                  key={"city"}
                  name="city"
                  control={newForm.control}
                  rightSection={<DropdownArrowIcon />}
                  required
                  size="lg"
                  mt="md"
                  label="City"
                  placeholder="Select city"
                  data={isLoadingCities ? [] : cityParser(citiesData) || []}
                  searchable
                  // {...form.getInputProps("city")}
                  maxDropdownHeight={200}
                  classNames={{
                    root: StepCss.inputRoot,
                    input: StepCss.textInput,
                    error: StepCss.errorMsg,
                    dropdown: StepCss.dropdown,
                    label: StepCss.mlabelCss,
                    option: StepCss.optionCss,
                  }}
                  withScrollArea={false}
                />
                <NumberInput
                  key={"pincode"}
                  name="pincode"
                  control={newForm.control}
                  required
                  size="lg"
                  mt="md"
                  hideControls
                  label="PIN Code"
                  placeholder="Enter PIN code"
                  // onBlurCapture={(e) =>
                  //   form.values.pincode === "" &&
                  //   newForm.setValue("pincode", undefined as any)
                  // }
                  classNames={{
                    root: StepCss.inputRoot,
                    input: StepCss.textInput,
                    error: StepCss.errorMsg,
                    label: StepCss.mlabelCss,
                  }}
                  maxLength={6}
                  onPaste={(event) => {
                    newForm.clearErrors();
                    const pastedText =
                      event.clipboardData.getData("text/plain");
                    const trimmedText = pastedText.replace(/\s/g, "");
                    const first10Digits = trimmedText
                      .replace(/\D/g, "")
                      .slice(0, 6);
                    newForm.setValue("pincode", first10Digits as any);
                  }}
                  allowDecimal={false}
                  allowNegative={false}
                />
              </SimpleGrid>
              <DropZone onLogoSelect={handleLogoSelect} logo={logo} />
            </Stepper.Step>

            <Stepper.Step
              label="Company Details"
              icon={active >= 2 ? <StepperDotGreen /> : <StepperDotGray />}
              classNames={{
                stepLabel:
                  active === 2
                    ? StepCss.stepLabelActive
                    : active > 2
                    ? StepCss.stepLabelDone
                    : StepCss.stepLabel,
                stepIcon: active > 2 ? StepCss.compltedIcon : StepCss.stepIcon,
              }}
            >
              <ScrollArea h={420} viewportRef={viewport} offsetScrollbars>
                <TextInput
                  name="companyName"
                  control={newForm.control}
                  id="companyName"
                  required
                  size="lg"
                  mt="md"
                  label="Builder Company Name"
                  placeholder="Enter Legal Name"
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
                      newForm.setValue
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      ref?.current?.focus();
                    }
                  }}
                  maxLength={MAX_LENGTH_COMPANY_NAME}
                />
                <MultiSelect
                  name="branch"
                  control={newForm.control}
                  // ref={ref}
                  id="branch"
                  rightSection={<DropdownArrowIcon />}
                  required
                  size="lg"
                  mt="md"
                  checkIconPosition="right"
                  label="Branch"
                  searchable
                  placeholder={`${
                    form.values.branch.length === 0 ? "-- Select Branch--" : ""
                  }`}
                  classNames={{
                    pill: StepCss.pill,
                    inputField: StepCss.textInput,
                    error: StepCss.errorMsg,
                    dropdown: StepCss.dropdown,
                    label: StepCss.mlabelCss,
                    option: StepCss.optionCss,
                  }}
                  data={isLoadingBrach ? [] : cityParser(brachData) || []}
                  // {...form.getInputProps("branch")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      form.values.branch.length === 0 && e.preventDefault();
                    }
                  }}
                  hidePickedOptions
                  maxValues={31}
                  // onOptionSubmit={(e) => {
                  //   console.log("alert ", e);
                  //   newForm.setValue("branch", e);
                  // }}
                  withScrollArea={false}
                  {...(((newForm.formState.errors.branch?.message &&
                    form.values.branch.length > 30) ||
                    form.values.branch.length === 29) && {
                    dropdownOpened: false,
                  })}
                />
                <DateInput
                  id="companyStartDate"
                  name="companyStartDate"
                  control={newForm.control}
                  required
                  size="lg"
                  mt="md"
                  label="Company Start Date"
                  rightSection={<DateIcons />}
                  rightSectionPointerEvents="none"
                  placeholder="DD/MM/YYYY"
                  maxDate={dayjs(new Date()).toDate()}
                  classNames={{
                    root: StepCss.inputRoot,
                    input: StepCss.textInput,
                    error: StepCss.errorMsg,
                    label: StepCss.mlabelCss,
                    calendarHeader: StepCss.calendComStDt,
                  }}
                  mb={"md"}
                />
                {/* <TextInput
                id="foundedBy"
                required
                size="lg"
                mt="md"
                label="Founded By"
                placeholder="Founder name"
                {...form.getInputProps("foundedBy")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleTrimAndReplaceReactHookForm(e, "foundedBy", form);
                  e.target.value !== "" && scrollToBottom();
                }}
              /> */}
                <AddmoreInput
                  form={newForm}
                  id={"foundedBy"}
                  label={"Founded By"}
                  placeholder={"Enter Founder name"}
                  scrollToBottom={scrollToBottom}
                />
                <AddmoreInput
                  form={newForm}
                  id={"ceoName"}
                  label={"CEO Name"}
                  placeholder={"Enter CEO Name"}
                  scrollToBottom={scrollToBottom}
                />
                <AddmoreInput
                  form={newForm}
                  id={"managingDirectorName"}
                  label={"Managing Director"}
                  placeholder={"Enter Managing Director Name"}
                  scrollToBottom={scrollToBottom}
                />
                {/* <TextInput
                id="ceoName"
                required
                size="lg"
                mt="md"
                label="CEO Name"
                placeholder="Enter CEO Name"
                {...form.getInputProps("ceoName")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleTrimAndReplaceReactHookForm(e, "ceoName", form);
                }}
              /> */}
                {/*  <TextInput
                id="managingDirectorName"
                required
                size="lg"
                mt="md"
                label="Managing Director"
                placeholder="Enter Managing Director Name"
                {...form.getInputProps("managingDirectorName")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.mangingDrCust,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleTrimAndReplaceReactHookForm(e, "managingDirectorName", form);
                }}
              /> */}
                <TextInput
                  control={newForm.control}
                  name="officeContact"
                  id="officeContact"
                  withAsterisk
                  // required
                  size="lg"
                  // mt="md"
                  label="Office Contact Number"
                  placeholder="Enter Office Contact Number"
                  // {...form.getInputProps("officeContact")}
                  classNames={{
                    root: StepCss.inputRoot,
                    input: StepCss.textInput,
                    error: StepCss.errorMsg,
                    label: StepCss.mlabelCss,
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    newForm.clearErrors("officeContact");
                    const pastedText = e.clipboardData
                      .getData("text")
                      .trim()
                      .replace(/\u202C/g, "");
                    newForm.setValue("officeContact", pastedText);
                  }}
                  onBlurCapture={(e) => {
                    handleTrimAndReplaceReactHookForm(
                      e,
                      "officeContact",
                      newForm.setValue
                    );
                  }}
                  maxLength={18}
                />
              </ScrollArea>
            </Stepper.Step>

            <Stepper.Step
              label="Description"
              icon={active >= 3 ? <StepperDotGreen /> : <StepperDotGray />}
              classNames={{
                stepLabel:
                  active === 3
                    ? StepCss.stepLabelActive
                    : active > 3
                    ? StepCss.stepLabelDone
                    : StepCss.stepLabel,
                stepIcon: active > 3 ? StepCss.compltedIcon : StepCss.stepIcon,
              }}
            >
              <Textarea
                control={newForm.control}
                name="vission"
                size="lg"
                required
                placeholder="Enter your company vision that you are going to provide buyers."
                label="Company Vision"
                autosize
                mt="md"
                minRows={5}
                maxRows={5}
                // {...form.getInputProps("vission")}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleTrimAndReplaceReactHookForm(
                    e,
                    "vission",
                    newForm.setValue
                  );
                }}
                maxLength={5001}
              />
              <Text size="sm" mt="xs" ta={"right"}>
                Maximum 5000 Characters
              </Text>
              <Textarea
                control={newForm.control}
                name="mission"
                size="lg"
                required
                mt={"md"}
                placeholder="Enter your builder's description that you are going to provide buyers."
                label="Builder's Descriptions"
                autosize
                minRows={5}
                maxRows={5}
                classNames={{
                  root: StepCss.inputRoot,
                  input: StepCss.textInput,
                  error: StepCss.errorMsg,
                  label: StepCss.mlabelCss,
                }}
                onBlurCapture={(e) => {
                  handleTrimAndReplaceReactHookForm(
                    e,
                    "mission",
                    newForm.setValue
                  );
                }}
                // {...form.getInputProps("mission")}
                maxLength={5001}
              />{" "}
              <Text size="sm" mt="xs" ta={"right"} mb={"lg"}>
                Maximum 5000 Characters
              </Text>
              {/*  <Checkbox
            label={
            <>
            I accept{' '}
          <Anchor href="https://Rpclan.com" target="_self" inherit>
            terms and conditions
          </Anchor>
        </>
         }
       /> */}
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
          <Group justify="flex-end" className="w-full mt">
            {active !== 4 && (
              <div className="w-full lg:w-full flex justify-between items-center flex-wrap md:flex-nowrap">
                <Button
                  disabled={(encriptedData || singupCookie) && active === 1}
                  mt="sm"
                  onClick={() => {
                    if (encriptedData) {
                      active === 1 ? router.back() : prevStep();
                    } else {
                      active !== 0 ? prevStep() : router.back();
                    }
                  }}
                  className="!rounded-[6px]  !border-solid  !w-[46%] !border-1 !border-blue-600 !bg-[#FFF] !text-[#0073C6] md:!w-[100%] md:!max-w-[178px] disabled:opacity-50"
                >
                  <BackSvg /> Back
                </Button>

                <Button
                  loading={status === "pending"}
                  mt="sm"
                  className="!rounded-[6px] !w-[52%] md:!w-[100%]  md:!max-w-[225px] !bg-[#0c7aca]"
                  // onClick={nextStep}
                  type="submit"
                >
                  {form.values.otp &&
                  form.values.mobile === form.values.prevMobile &&
                  form.values.email === form.values.prevEmail
                    ? "Save & Continue"
                    : "Save & Verify"}
                  {/* {active === 0 ? "SAVE & VERIFY" : "SAVE & CONTINUE"} */}
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
              <p className="text-center text-[#556477] text-[16px] not-italic xl:font-medium leading-[normal] mt-2 xl:mt-1 mb-[15px]">
                Forgot Password?{" "}
                <Link
                  href={{ pathname: "/forgot", search: queryParam.query }}
                  className="text-[color:var(--Brand-green-primary,#148B16)] text-[16px] font-[600]   not-italic xl:font-medium leading-[normal] underline"
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
    </>
  );
}

export default Builder;
