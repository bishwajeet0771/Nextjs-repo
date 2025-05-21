/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
"use client";
import React, { useEffect, useState } from "react";
// import { Modal } from "@mantine/core";
import classes from "@/app/styles/FaqWithBg.module.css";
import { FAQ } from "@/app/validations/types/project";
import { addQna } from "@/app/utils/api/actions/Qna";
import { useForm, yupResolver } from "@mantine/form";
import { qnaSchema } from "@/app/validations/project";
import { useSession } from "next-auth/react";
import handleTrimAndReplace from "@/app/utils/input/validations";
// import clsx from "clsx";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import FaqReadMore from "../atoms/faq/FaqReadmore";
// import StepCscs from "@/app/styles/Stepper.module.css";
import { useMediaQuery } from "@mantine/hooks";
// import S from "@/app/styles/Qna.module.css";
import Close from "./button/close";
import {
  CompareMessage,
  QnaSuccesssMessage,
  RentListingNotFoundMessage,
  SellListingNotFoundMessage,
} from "./success";
import { useMessagePopup } from "@/app/hooks/project/useMessagePopup";
import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";
type FaqWithBgProps = {
  data: FAQ[];
  projName: string;
  slug: string;
  postedById: number;
};

export default function FaqWithBg({
  data,
  projName,
  slug,
  postedById,
}: FaqWithBgProps) {
  return (
    <div
      className={data?.length > 0 ? classes.wrapper : "!w-[95%] !md:w-[90%]   "}
      id="frequently-asked-questions"
    >
      <div className="flex justify-center items-center text-center !w-[100%] !md:w-[90%] relative">
        {data?.length > 0 && (
          <>
            <div className="hidden sm:block absolute left-[2%] sm:left-[16%] sm:mr-[-70px] bottom-[20px] w-[168px] h-[74px] rounded-[50%] blur-[29.5px] bg-[#0093ff4d] " />
            <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[4px] sm:mb-[28px] xl:mb-[24px] capitalize ">
              <strong>
                <span className="text-[#001F35]">
                  Frequently Asked Questions of{" "}
                </span>
                <span className="text-green-800">{projName}</span>{" "}
              </strong>
            </h2>
          </>
        )}
      </div>
      <div className={`${data?.length > 0 ? "mb-4" : ""}`}>
        {data?.map((faq, index) => {
          return (
            faq.faqAnswer &&
            faq.faqQuestion && (
              <MainCard
                key={`faqMainCard_${index.toString()}`}
                faq={faq}
                index={index}
                data={data}
              />
            )
          );
        })}
      </div>
      <AddQnaForm projName={projName} slug={slug} postedById={postedById} />
    </div>
  );
}
const MainCard = ({
  faq,
  index,
  data,
}: {
  faq: FAQ;
  index: number;
  data: FAQ[];
}) => {
  const isMobile = useMediaQuery(`(max-width: 601px)`);
  return (
      isMobile ? (
        <MobileFaqCard
          faqQuestion={faq.faqQuestion}
          faqAnswer={faq.faqAnswer}
          last={index === data.length - 1}
        />
      ) : (
        <FaqCard
          faqQuestion={faq.faqQuestion}
          faqAnswer={faq.faqAnswer}
          key={faq.faqAnswer}
          last={index === data.length - 1}
        />
      )
  );
};
const AddQnaForm = ({
  projName,
  slug,
  postedById,
}: {
  projName: string;
  slug: string;
  postedById: number;
}) => {
  const [, { open }] = usePopShortList();
  const { data: session } = useSession();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >();
  const {
    getInputProps,
    onSubmit,
    setErrors,
    reset,
    setFieldValue,
    errors,
    values,
  } = useForm({
    initialValues: {
      question: "",
    },
    validate: yupResolver(qnaSchema),
  });
  const [opened, { close, open: openSuccesPopup }] = useMessagePopup("qna");
  const handleQna = async () => {
    try {
      await addQna({
        question: values.question,
        projIdEnc: slug,
        ansBy: postedById,
      });
      openSuccesPopup();
      setStatus("success");
    } catch (error: any) {
      setErrors({ question: error.message });
      setStatus("error");
    }
  };
  const formSubmit = async (values: any) => {
    if (session) {
      setStatus("pending");
      handleQna();
    } else {
      open(handleQna, {
        type: "have-any-question",
      });
    }
  };
  const onClose = () => {
    close();
    document.body.style.overflow = "unset";
    opened.type === "qna" && reset();
  };
  const isMobile = useMediaQuery(`(max-width: 601px)`);

  return (
    <form
      className="max-w-[100%] mx-auto mt-6 sm:mt-[50px] sm:pt-[12px] rounded-lg space-y-2 mb-[30px]"
      onSubmit={onSubmit(formSubmit)}
      id="have-any-question"
    >
      <h2 className="inline-flex items-center gap-3 p-2 rounded-2xl bg-[#ecf7ff] sm:mb-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          className="sm:h-[52px] sm:w-[52px] h-[30px] w-[30px]"
        >
          <path
            d="M13.9865 41.1667L4.33398 48.75V8.66667C4.33398 8.09203 4.56226 7.54093 4.96859 7.1346C5.37492 6.72827 5.92602 6.5 6.50065 6.5H45.5006C46.0753 6.5 46.6264 6.72827 47.0327 7.1346C47.439 7.54093 47.6673 8.09203 47.6673 8.66667V39C47.6673 39.5746 47.439 40.1257 47.0327 40.5321C46.6264 40.9384 46.0753 41.1667 45.5006 41.1667H13.9865ZM23.834 30.3333V34.6667H28.1673V30.3333H23.834ZM18.5625 19.0948L22.8135 19.9463C22.9341 19.3428 23.2237 18.7859 23.6484 18.3404C24.0732 17.895 24.6157 17.5793 25.2129 17.4302C25.8101 17.281 26.4373 17.3045 27.0216 17.4979C27.606 17.6913 28.1234 18.0467 28.5136 18.5226C28.9039 18.9986 29.151 19.5756 29.2261 20.1865C29.3013 20.7974 29.2014 21.4171 28.9382 21.9734C28.6749 22.5298 28.2591 23 27.739 23.3292C27.219 23.6585 26.6162 23.8333 26.0006 23.8333H23.834V28.1667H26.0006C27.4366 28.1662 28.843 27.7581 30.0561 26.9897C31.2692 26.2213 32.2393 25.1242 32.8533 23.8261C33.4674 22.528 33.7002 21.0823 33.5248 19.657C33.3494 18.2318 32.773 16.8856 31.8625 15.7752C30.952 14.6647 29.7449 13.8356 28.3817 13.3843C27.0185 12.933 25.5551 12.878 24.1618 13.2257C22.7686 13.5735 21.5027 14.3097 20.5115 15.3487C19.5202 16.3877 18.8444 17.6868 18.5625 19.0948Z"
            fill="#18B8F2"
          />
        </svg>{" "}
        <span className="text-[#242424] sm:text-[22px] xl:text-[32px] not-italic font-bold leading-[normal]">
          Have any Question? Ask Here 👇
        </span>
      </h2>
      <h2 className="text-[16px] sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[10px] xl:mb-[24px] capitalize ">
        Ask your question related to Project
        <span className="!text-[#0C5F0E]"> {projName}!</span>
      </h2>

      <div className=" gap-4">
        <div className="flex-1">
          {/* <Textarea
            id="question"
            name="question"
            placeholder="Type your question here . . . ."
            rows={isMobile ? 2 : 4}
            mb={"sm"}
            {...getInputProps("question")}
            className={clsx(
              "placeholder:!text-[#4D6677] placeholder:!text-[18px]  font-medium leading-[23.784px]  rounded-[10px] ",
              !errors.question && "!border !border-solid !border-[#737579]"
            )}
            size="lg"
            radius={"10px"}
            onBlur={(e) =>
              handleTrimAndReplace(e, "question", setFieldValue, "dis")
            }
            classNames={{
              input: StepCscs.textAreaInput,
              error: "!text-[12px] !sm:text-[18px]",
            }}
          /> */}

          <textarea
            id="question"
            name="question"
            placeholder="Type your question here . . . ."
            className={`placeholder:!text-[#4D6677] px-[10px] py-[6px] md:px-[16px] md:py-[10px] placeholder:!text-[14px] md:placeholder:!text-[18px] w-full resize-none leading-[23.784px] text-[14px] md:text-[16px] text-[#333] font-[500] rounded-[6px] md:rounded-[10px] focus:outline-none border border-solid border-[#737579] ${
              !errors.question ? "" : "border-[#F00]"
            } `}
            rows={isMobile ? 2 : 4}
            {...getInputProps("question")}
            onBlur={(e) =>
              handleTrimAndReplace(e, "question", setFieldValue, "dis")
            }
          />

          {errors.question && (
            <p className="text-[12px] sm:text-[14px] text-[#F00]">
              {errors.question}
            </p>
          )}
        </div>
        <button
        aria-label="Submit Question" name="Submit Question" title="Submit Question"
          type="submit"
          // loading={status === "pending"}
          // size={isMobile ? "xs" : "md"}
          className="bg-btnPrimary text-white text-[14px] md:text-[16px] py-[4px] px-[8px] md:py-[6px] md:px-[12px] rounded-[4px] font-[600] "
        >
          Submit
        </button>
      </div>
      {opened.status && (
        <Success
          text={values.question}
          // opened={opened.status}
          opened={opened}
          onClose={onClose}
          projName={projName}
        />
      )}
    </form>
  );
};

const FaqCard = ({
  faqQuestion,
  faqAnswer,
  last,
}: {
  faqQuestion: string;
  faqAnswer: string;
  last: boolean;
}) => {
  return (
    <>
      <h3 className=" text-[#242424] sm:text-[20px] xl:text-[24px] not-italic font-medium sm:font-bold leading-[normal] sm:mb-0 capitalize">
        {faqQuestion}
      </h3>
      <FaqReadMore text={faqAnswer} title={faqQuestion} />
      {/*  {!last && ( */}
      <hr className="bg-[#00000080] my-4 sm:my-[18px] h-[2px]" />
      {/*   )} */}
    </>
  );
};
const MobileFaqCard = ({
  faqQuestion,
  faqAnswer,
  last,
}: {
  faqQuestion: string;
  faqAnswer: string;
  last: boolean;
}) => {
  return (
    <div className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 mt-2 rounded-md">
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 pt-1 pb-1 sm:p-6"
      >
        <span className="flex-1 min-w-0 font-semibold text-black text-left break-words">
          {faqQuestion}
        </span>
      </button>
      <div className="px-4 pb-2 sm:px-6 sm:pb-6">
        <div>
          <FaqReadMore text={faqAnswer} title={faqQuestion} maxLines={3} />
        </div>
      </div>
    </div>
  );
};

const Success = ({ text, opened, onClose, projName }: any) => {
  const renderComponent = {
    qna: <QnaSuccesssMessage />,
    Rlisting: <RentListingNotFoundMessage />,
    Slisting: <SellListingNotFoundMessage />,
    compare: <CompareMessage />,
  };
  type RenderComponentKeys = keyof typeof renderComponent;

  const ComponentTorender =
    renderComponent[opened.type as RenderComponentKeys] || null;
  // const isMobile = useMediaQuery(`(max-width: 750px)`);
  // const isTab = useMediaQuery(`(max-width: 1600px)`);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("scroll 1");
      onClose();
      document.body.style.overflow = "unset";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    // <Modal
    //   classNames={{
    //     title: S.title,
    //     root: S.root,
    //     close: S.close,
    //     content: S.content,
    //     overlay: S.overlay,
    //     header: S.disabled,
    //     body: S.body,
    //   }}
    //   opened={opened.status}
    //   onClose={onClose}
    //   centered
    //   title="Add Rating"
    //   size={isMobile ? "100%" : isTab ? "35%" : "auto"}
    // >
    opened.status && (
      <ModalBox
        isOpen={opened.status}
        handleChange={() => {
          document.body.style.overflow = "unset";
          onClose();
        }}
        hideCrossIcon={true}
        containerClassStyle="w-[90%] md:w-[35%] xl:w-auto !p-0 !rounded-[20px] !min-w-[200px] md:!min-w-[500px] !max-w-[100%] md:!max-w-[500px] "
      >
        <Close
          close={() => {
            document.body.style.overflow = "unset";
            onClose();
          }}
          className="absolute top-2 right-2 z-50"
        />

        {ComponentTorender}
      </ModalBox>
    )
  );
};
