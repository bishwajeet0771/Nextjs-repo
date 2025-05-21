/* eslint-disable react/jsx-boolean-value */
"use client";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import {
  CompareListingMessage,
  // CompareMessage
} from "../../project/success";
import Close from "../../project/button/close";
// import S from "@/app/styles/Qna.module.css";
import { useErrorListing } from "@/app/hooks/property/useError";
import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";
const CompareError = () => {
  const [opened, { close }] = useErrorListing();
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 5000);

    return () => clearTimeout(timer);
  }, [close]);
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
    //   onClose={close}
    //   centered
    //   title="Add Rating"
    //   size={isMobile ? "100%" : "auto"}
    // >
    opened.status &&
      <ModalBox
        isOpen={opened.status}
        handleChange={() => {
          close();

        }}
        hideCrossIcon={true}
        // containerClassStyle="w-[90%] md:w-[35%] xl:w-auto !p-0 !rounded-[20px] !min-w-[200px] md:!min-w-[500px] !max-w-[100%] md:!max-w-[500px] "
        containerClassStyle={`!rounded-[20px] !p-0 ${ isMobile ? "!w-[94%]" : "!w-auto" } `}
      >
      <Close close={close} className="absolute top-2 right-2 z-50" />

      <CompareListingMessage />
      </ModalBox>
    // </Modal>
  );
};
export default CompareError;
