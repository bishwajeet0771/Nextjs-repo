/* eslint-disable react/jsx-boolean-value */
"use client";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React, { useState } from "react";
// import S from "@/app/styles/Rating.module.css";
import { yupResolver } from "@mantine/form";
import { ratingSchema, ratingSchema2 } from "@/app/validations/project";
import { addRating } from "@/app/utils/api/actions/ratings";
// import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import LoginPopup from "../molecules/popups/login";
import Close from "./button/close";
import { usePopUpRatings } from "@/app/hooks/popups/usePopUpRatings";
import {
  RatingForm,
  // Success
} from "./success/rating";
import { FormProvider, useForm } from "@/app/context/rating";
import { RatingMessage } from "./success";
// import Styles from "@/app/styles/Qna.module.css";
import useDynamicProj from "@/app/hooks/project/useDynamic";
import { allowBackButton, preventBackButton } from "../molecules/popups/req";
import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";
export default function Banner({
  projName,
  projIdEnc,
}: {
  projName: string;
  projIdEnc: string;
}) {
  const [opened, { open, close }] = usePopUpRatings();

  const onAddingRatings = () => {
    open();
  };

  return (
    <div
      className="bg-[#f0f9ff] scroll-mt-[180px] w-[94%] px-2 sm:px-8 py-4 sm:py-4 xl:py-12 mx-auto sm:mt-[50px]"
      id="proj_rating"
    >
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <div className="w-[95%] sm:w-[95%] xl:w-[90%] m-auto flex flex-col md:flex-row justify-between items-center ">
        <div>
          <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[12px] capitalize break-words sm:text-nowrap w-[78%]">
            <strong>
              <span className="text-[#001F35]">Project Rating For </span>
              <span className="text-green-800 sm:text-[24px] xl:text-[28px] not-italic leading-[normal] tracking-[1.28px]">
                {projName}
              </span>
            </strong>
          </h2>
          <p className="text-black text-[13px] sm:text-[20px] xl:text-xl sm:px-1 not-italic font-medium leading-[normal] tracking-[0.96px] mb-4 sm:mb-4 xl:mb-8">
            Your headline should show readers how your review can help them
            solve a problem or make a decision, offer something different or
            unexpected, and be clear and specific about what your review is
            about
          </p>
          <button
            aria-label="Add Ratings" name="Add Ratings" title="Add Ratings"
            onClick={() => {
              onAddingRatings();
              preventBackButton();
            }}
            className="flex flex-col justify-center items-center gap-2.5 rounded text-white  text-[12px] sm:text-[14px]  xl:text-[24px] not-italic font-bold leading-[normal] capitalize p-2.5 bg-btnPrimary"
          >
            Add Ratings
          </button>
        </div>
        <div className="hidden md:block flex-shrink-0 relative h-[200px] w-full sm:w-[30%] xl:w-[600px]">
          <Image
            src="/abc/rating.svg"
            alt="Project Rating Illustration"
            className=" sm:h-[240px] sm:w-[240px] xl:h-[320px] xl:w-[320px] absolute sm:-top-[24px] xl:-top-[87px] right-0"
            width={600}
            height={300}
            title="Project Rating Illustration"
          />
        </div>
        <AddRating
          opened={opened}
          close={close}
          projName={projName}
          projIdEnc={projIdEnc}
        />
      </div>
    </div>
  );
}
// interface Props {
//   review: string;
//   rating: number;
//   proj: string;
// }
const AddRating = ({
  opened,
  close,
  projName,
  projIdEnc,
}: {
  opened: any;
  close: any;
  projName: string;
  projIdEnc: string;
}) => {
  const { data: session } = useSession();
  const { data, updateRatings } = useDynamicProj(projIdEnc);

  const [status, setStatus] = useState<
    "pending" | "idle" | "success" | "error"
  >("idle");
  const isDataSubmitted = isSubmitted({
    isReviewSubmitted: data?.userReview as string,
    isSubmitted: data?.userRating as string,
    status: status,
  });
  const form = useForm({
    initialValues: {
      review: "",
      rating: 0,
    },
    validate: yupResolver(
      isDataSubmitted.isRatingSubmitted ? ratingSchema2 : ratingSchema
    ),
  });
  const onClose = () => {
    form.reset();
    // if (!isDataSubmitted.isReviewSubmitted) {
    setStatus("idle");
    // }
    close();
    document.body.style.overflow = "unset";
  };

  const formSubmit = async (values: any) => {
    setStatus("pending");
    if (isDataSubmitted.isRatingSubmitted) {
      if (!form.values.review) {
        onClose();
        return;
      }

      await addRating({
        projIdEnc: projIdEnc,
        rating: form.values.rating,
        review: form.values?.review,
      });
    } else {
      await addRating({ ...values, projIdEnc: projIdEnc });
    }
    const optimisticData = {
      rating: values.rating,
      ...(values.rating && { userRating: "Y" }),
      ...(values.review && { review: "Y" }),
    };
    updateRatings(optimisticData);
    setStatus("success");
  };
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  const isTab = useMediaQuery(`(max-width: 1600px)`);
  return (
    // <Modal
    //   classNames={
    //     isDataSubmitted.isSubmitted
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
    //           title: S.title,
    //           root: S.root,
    //           close: S.close,
    //           content: S.content,
    //           overlay: S.overlay,
    //           header: !session ? S.disabled : S.header,
    //         }
    //   }
    //   opened={opened}
    //   onClose={onClose}
    //   centered
    //   title={
    //     isDataSubmitted.isRatingSubmitted
    //       ? "Rate it Right: Your Review, Your Rating!"
    //       : "Rate it Right: Your Review, Your Rating!"
    //   }
    //   size={
    //     isMobile
    //       ? "100%"
    //       : session
    //       ? isDataSubmitted.isSubmitted
    //         ? isTab
    //           ? "40%"
    //           : "auto"
    //         : "58%"
    //       : "35%"
    //   }
    // >

    opened && (
      <ModalBox
        isOpen={opened}
        handleChange={() => {
          document.body.style.overflow = "unset";
          onClose();
          allowBackButton();
        }}
        containerClassStyle={`!rounded-[20px] !p-0 !w-[94%] md:!w-[40%] xl:!w-[35%] ${
          isMobile
            ? "!w-[100%]"
            : session
            ? isDataSubmitted.isSubmitted
              ? isTab
                ? "!w-[40%]"
                : "!w-auto"
              : "!w-[58%]"
            : "!w-[35%]"
        } `}
        hideCrossIcon={true}
      >
        <FormProvider form={form}>
          <div className="relative">
            {(!session ||
              status === "success" ||
              isDataSubmitted.isSubmitted) && (
              <Close close={onClose} className="absolute top-3 right-1 z-50" />
            )}
            {session ? (
              status === "success" || isDataSubmitted.isSubmitted ? (
                <RatingMessage close={onClose} />
              ) : (
                <RatingForm
                  projName={projName}
                  projIdEnc={projIdEnc}
                  formSubmit={formSubmit}
                  isSubmitted={isDataSubmitted.isRatingSubmitted}
                />
              )
            ) : (
              <LoginPopup type="RATING" />
            )}
          </div>
        </FormProvider>
      </ModalBox>
    )
    // </Modal>
  );
};

const isSubmitted = (data: {
  isReviewSubmitted: string;
  isSubmitted: string;
  status: string;
}) => {
  const isSubmitted =
    data.status === "success" ||
    (data?.isSubmitted === "Y" && data.isReviewSubmitted === "Y");
  const isRatingSubmitted = data?.isSubmitted === "Y";
  const isReviewSubmitted = data?.isReviewSubmitted === "Y";
  return {
    isSubmitted,
    isRatingSubmitted,
    isReviewSubmitted,
  };
};
