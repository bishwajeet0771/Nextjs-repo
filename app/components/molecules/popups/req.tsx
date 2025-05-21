/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
"use client";
import N from "@/app/styles/Numinput.module.css";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import S from "@/app/styles/Req.module.css";
import { useForm, yupResolver } from "@mantine/form";
import { reqSchema } from "@/app/validations/project";
import { addContact, sendContact } from "@/app/utils/api/actions/contact";
import { popupStateAtom, useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useAtomValue } from "jotai";
import Image from "next/image";
import ReqOtpForm from "../../project/forms/otpform";
import handleTrimAndReplace from "@/app/utils/input/validations";
import { ReqcallbackMessage } from "../../project/success";
// import Styles from "@/app/styles/Qna.module.css";
import clsx from "clsx";
import Close from "../../project/button/close";
import Button from "../../atoms/buttons/variansts";
import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";
// import { json } from "stream/consumers";
// import { stringify } from "querystring";
// import useHistoryBackHandler from "./popupCloser";
// import { title } from "process";

export const preventBackButton = () => {
  window.history.pushState(null, "", window.location.href);
  document.body.style.overflow = "hidden";
};

export const allowBackButton = () => {
  window.history.back();
  document.body.style.overflow = "unset";
};

const RequestCallBackModal = () => {
  const isMobile = useMediaQuery("(max-width: 750px)");
  const isTab = useMediaQuery("(max-width: 1600px)");
  const [opened, { close, source, MODAL_TYPE }] = useReqCallPopup();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error" | "otp"
  >("idle");

  const handleClose = () => {
    close();
    document.body.style.overflow = "unset";
    setTimeout(() => {
      setStatus("idle");
    }, 500);
    // allowBackButton();
  };

  useEffect(() => {
    if (opened) {
      // preventBackButton();
      const handlePopState = () => {
        handleClose();
      };

      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
    // else{
    //   allowBackButton();
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    // <Modal
    //   opened={opened}
    //   onClose={handleClose}
    //   centered
    //   size={
    //     isMobile
    //       ? "100%"
    //       : status !== "success"
    //       ? "65%"
    //       : isTab
    //       ? "40%"
    //       : "auto"
    //   }
    //   className="rounded-lg w-[90%]  md:w-[70%] lg:w-[65%] !p-0"
    //   classNames={
    //     status === "success"
    //       ? {
    //           title: Styles.title,
    //           root: Styles.root,
    //           close: Styles.close,
    //           content: Styles.content,
    //           overlay: Styles.overlay,
    //           header: Styles.disabled,
    //           body: Styles.body,
    //         }
    //       : {
    //           close: S.close,
    //           content: S.content,
    //           body: S.body,
    //           overlay: S.overlay,
    //         }
    //   }
    //   zIndex={10000}
    //   withCloseButton={false}
    // >
    opened && (
      <ModalBox
        isOpen={opened}
        handleChange={() => {
          handleClose();
          document.body.style.overflow = "unset";
        }}
        hideCrossIcon={true}
        containerClassStyle={`!p-0 !rounded-[20px] ${
          isMobile
            ? "!w-[94%]"
            : status !== "success"
            ? "!w-[65%]"
            : isTab
            ? "!w-[40%]"
            : "!w-[40%]"
        } `}
      >
        <div
          className={clsx(
            "bg-white relative rounded-lg  w-full overflow-hidden flex ",
            status !== "success" && "min-h-[]"
          )}
        >
          <Close
            close={handleClose}
            className="absolute h-[28px] w-[28px] right-0 z-10 m-[2%] cursor-pointer "
          />

          {status === "success" ? (
            <ReqcallbackMessage close={handleClose} />
          ) : (
            <>
              <div
                className={`w-[100%] md:w-[50%] px-[3%] py-[3%] sm:py-[1%] xl:py-[3%]`}
              >
                {status === "idle" && (
                  <h2 className="text-[18px] sm:text-[20px] xl:text-[24px] font-[600] text-[#202020]  ">
                    {MODAL_TYPE === "REQ_QUOTE"
                      ? "Request Quotation"
                      : "Request Callback"}
                  </h2>
                )}

                <Content
                  close={close}
                  status={status}
                  setStatus={setStatus}
                  source={source}
                />
              </div>
              {
                <div className="hidden md:block w-[50%] relative">
                  <Image
                    className={clsx(
                      "absolute inset-0 h-full w-[100%] object-fit",
                      MODAL_TYPE == "REQ_QUOTE" && "!object-contain"
                    )}
                    src={
                      MODAL_TYPE === "REQ_QUOTE"
                        ? "/quate.svg"
                        : "/requestcallback.png"
                    }
                    alt="Customer Support"
                    width={600}
                    height={534}
                  />
                </div>
              }
            </>
          )}
        </div>
      </ModalBox>
    )
    // </Modal>
  );
};
export default RequestCallBackModal;
const Content = ({
  close,
  status,
  setStatus,
  name,
  projName,
  source,
  builderName,
}: any) => {
  const { data: session } = useSession();
  return session ? (
    <LoggedInUserForm
      close={close}
      status={status}
      setStatus={setStatus}
      projName={projName}
      source={source}
      name={name}
      builderName={builderName}
    />
  ) : (
    <ReqForm
      close={close}
      status={status}
      setStatus={setStatus}
      projName={projName}
      source={source}
      builderName={builderName}
      name={builderName}
    />
  );
};
const LoggedInUserForm = ({ status, setStatus }: any) => {
  const { pushToRequestCallbacks } = useShortlistAndCompare();
  const popupState = useAtomValue(popupStateAtom);
  const { data: session } = useSession();
  const {} = useForm({
    initialValues: {
      name: session?.user.name,
      email: session?.user.email,
      mobile: session?.user.userName,
    },
    validate: yupResolver(reqSchema),
  });

  let Posted_BY =
    popupState.MODAL_TYPE == "PROPERTY_REQ_CALLBACK" ? "Posted By" : "Builder";
  const onSubmit = async () => {
    setStatus("pending");
    const data = {
      name: session?.user?.name,
      email: session?.user?.email,
      mobile: session?.user?.userName,
      ...popupState,
    };

    await pushToRequestCallbacks(popupState.reqId ?? "", async () => {
      const res = await sendContact(data);
    });
    setStatus("success");
  };
  const onSuccess = async () => {
    setStatus("success");
  };

  // console.log(popupState);

  return status === "otp" ? (
    <ReqOtpForm
      callback={onSuccess}
      values={{
        name: session?.user?.name,
        email: session?.user?.email,
        mobile: session?.user?.userName,
        ...popupState,
      }}
      builderName={popupState.postedByName}
      title={popupState.title}
      Posted_BY={Posted_BY}
    />
  ) : (
    <div className="mt-6 w-full">
      <p className=" mb-[8px]  lg:text-[20px] text-[#00487c] text-[14px] xl:text-xl italic font-bold leading-[normal] tracking-[0.8px]">
        <span className="text-[#4D6677] text-[18px] xl:text-xl italic font-medium leading-[normal] tracking-[0.8px]">
          {" "}
          {popupState.MODAL_TYPE === "REQ_QUOTE" ? "Quotation for" : "Call For"}
          :
        </span>{" "}
        <span className="text-[14px] xl:text-[21px]">{popupState.title}</span>
      </p>
      {/* <p className="text-[#148B16] mb-[6%] text-[14px] xl:text-xl lg:text-[20px] italic font-bold leading-[normal] tracking-[0.64px]">
        <span className="text-[#4D6677] text-[18px] xl:text-xl italic font-medium leading-[normal] tracking-[0.8px]">
          {Posted_BY}:
        </span>{" "}
        <span className="text-[14px] xl:text-[21px]">
          {popupState.postedByName}
        </span>
      </p> */}
      {/* Notifcation */}
      <div className=" flex justify-center items-center gap-2.5 border p-2.5 rounded-xl border-solid border-[#FFD600] bg-[#fff4bb] text-[#242424] text-[15px] xl:text-[17px] not-italic font-semibold leading-[normal] mb-6">
        {popupState.MODAL_TYPE === "REQ_QUOTE"
          ? `Your quotation for ${popupState.title} will be sent to your provided contact details.`
          : "You will receive about your inquiries on below contact number"}
      </div>
      {/* NOTIFICATION END */}
      <h3 className="mb-[2%]  text-[#001F35] text-[18px] xl:text-xl not-italic font-bold">
        Your Details
      </h3>

      <p className="text-[#202020] text-[14px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-2">
        Name: {session?.user.name}
      </p>
      <p className="text-[#202020] text-[14px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-2">
        Contact: {session?.user.userName}
      </p>
      <p className="text-[#202020] text-[14px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-2">
        Email: {session?.user.email}
      </p>
      <Button 
        aria-label={popupState.MODAL_TYPE === "REQ_QUOTE" ? "Request Quotation" : "Request Callback"} 
        title={popupState.MODAL_TYPE === "REQ_QUOTE" ? "Request Quotation" : "Request Callback"} 
        variant="blue" 
        className="sm:!py-1.5" onClick={onSubmit}
      >
        {popupState.MODAL_TYPE === "REQ_QUOTE" ? "Request Quotation" : "Request Callback"}
      </Button>
    </div>
  );
};
const ReqForm = ({
  close,
  status,
  setStatus,
}: {
  close: any;
  status: string;
  setStatus: any;
  name: string;
  projName: string;
  source: string;
  builderName: string;
}) => {
  const popupState = useAtomValue(popupStateAtom);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      mobile: null,
    },
    validate: yupResolver(reqSchema),
  });

  let Posted_BY =
    popupState.MODAL_TYPE == "PROPERTY_REQ_CALLBACK" ? "Posted By" : "Builder";
  const formSubmit = async (values: any) => {
    console.log(values);
    setStatus("pending");
    const data = await addContact({
      ...values,
      ...popupState,
    });
    setStatus("otp");
  };
  const onSuccess = async () => {
    setStatus("success");
  };
  const bn = popupState.postedByName;
  const title = popupState.title;
  const isTab = useMediaQuery(`(max-width: 1600px)`);
  return status === "success" ? (
    <Success close={close} />
  ) : status === "otp" ? (
    <ReqOtpForm
      callback={onSuccess}
      values={{
        ...form.values,
        ...popupState,
      }}
      builderName={bn}
      title={title}
      Posted_BY={Posted_BY}
    />
  ) : (
    <form
      className="w-full max-w-[500px] "
      onSubmit={form.onSubmit(formSubmit)}
    >
      <p className=" text-[#00487c] text-[13px]  xl:text-lg italic font-bold leading-[normal] tracking-[0.36px] capitalize mb-[2%] mt-1">
        <span className="text-[#4D6677] text-sm xl:text-lg italic font-medium leading-[normal] tracking-[0.36px] ">
          Call For
        </span>{" "}
        : {title}
      </p>
      {/* <p className="text-[#148B16] text-[13px] xl:text-lg italic font-bold leading-[normal] tracking-[0.64px] mb-[2%] ">
        <span className="text-[#4D6677] text-sm  xl:text-lg italic font-medium leading-[normal] tracking-[0.36px]">
          {Posted_BY}
        </span>{" "}
        : {bn}
      </p> */}
      <p className="text-[#EA7A00] text-[14px] xl:text-base not-italic font-semibold leading-[normal] tracking-[0.64px] mb-[1%] ">
        Looks like you are not registered with us.
      </p>
      <p className="text-[#4D6677] text-[14px] xl:text-sm not-italic font-semibold leading-[normal] tracking-[0.56px] mb-[2%] ">
        No worries add your details to get callback from{" "}
        {popupState.MODAL_TYPE === "PROJECT_REQ_CALLBACK" ? "builder" : bn}
      </p>
      <h2 className="text-[#00487C] text-[14px] xl:text-[18px] font-semibold xl:text-xl not-italic xl:font-bold mb-[1.5%]">
        Your Details
      </h2>
      <div className="flex flex-col max-w-sm">
        <div className={S.inputContainer}>
          <label htmlFor={`req_popup_username`} className={N.label}>
            Enter Your Name Here
          </label>
          <input
            type="text"
            className={S.input}
            {...form.getInputProps("name")}
            id={`req_popup_username`}
            placeholder="Enter Your Name Here"
            onBlur={(e) => handleTrimAndReplace(e, "name", form)}
            style={{ borderColor: form.errors.name ? "#F00" : "" }}
          />
          {form.errors.name && <p className={S.error}>Name is required</p>}
        </div>

        <div className={S.inputContainer} style={{ position: "relative" }}>
          <label htmlFor={`req_popup_input`} className={N.label}>
            Contact Number
          </label>
          <input
            type="text"
            className={S.numInput}
            {...form.getInputProps("mobile")}
            id={`req_popup_input`}
            placeholder="Enter Your Mobile Number"
            maxLength={10}
            onPaste={(event) => {
              const pastedText = event.clipboardData.getData("text/plain");
              const trimmedText = pastedText.replace(/\s/g, "");
              const first10Digits = trimmedText.replace(/\D/g, "").slice(0, 10);
              form.setFieldValue("mobile", first10Digits as any);
            }}
            style={{ borderColor: form.errors.mobile ? "#F00" : "" }}
          />
          <span className={S.countryCodeText}>+ 91</span>
          {form.errors.mobile && (
            <p className={S.error}>Mobile Number is required</p>
          )}
        </div>

        <div className={S.inputContainer}>
          <label htmlFor={`req_popup_email`} className={N.label}>
            Enter Your Email Here
          </label>
          <input
            type="email"
            className={S.input}
            {...form.getInputProps("email")}
            id={`req_popup_email`}
            placeholder="Enter Your Email Here"
            onBlur={(e) => handleTrimAndReplace(e, "email", form)}
            style={{ borderColor: form.errors.email ? "#F00" : "" }}
          />
          {form.errors.email && <p className={S.error}>Email is required</p>}
        </div>
      </div>

      <button
        className="!bg-[#0073C6] text-[14px] md:text-[16px] text-white h-[36px] px-[10px] rounded-[4px] border-none font-semibold "
        type="submit"
        color="#0073C6"
        aria-label={popupState.MODAL_TYPE === "REQ_QUOTE" ? "Request Quotation" : "Request Callback"} 
        name={popupState.MODAL_TYPE === "REQ_QUOTE" ? "Request Quotation" : "Request Callback"} 
        title={popupState.MODAL_TYPE === "REQ_QUOTE" ? "Request Quotation" : "Request Callback"}
        // loading={status === "pending"}
      >
        {popupState.MODAL_TYPE === "REQ_QUOTE"
          ? "Request Quotation"
          : "Request Callback"}
      </button>
    </form>
  );
};

const Success = ({ close }: { close: any }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-start h-full ">
      <p className="text-[#00487C] text-[18px] xl:text-2xl not-italic font-semibold leading-8 tracking-[0.96px] mt-2">
        Your call request has been sent to builder😇
      </p>
      <p className="text-[#202020]  xl:text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]">
        Please wait for callback !
      </p>
      <button aria-label="Go To Project" name="Go To Project" title="Go To Project" onClick={close} className="!bg-[#0073C6] mt-[5%] ">
        Go To Project
      </button>
    </div>
  );
};
