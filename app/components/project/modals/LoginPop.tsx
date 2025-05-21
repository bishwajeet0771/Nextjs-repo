/* eslint-disable react/jsx-boolean-value */
"use client";
import {
  // useDisclosure,
} from "@mantine/hooks";
// import { Modal } from "@mantine/core";
// import { comparingIcon, tagIcon } from "@/app/images/commonSvgs";
import LoginPop from "@/app/components/molecules/popups/login";
// import S from "@/app/styles/Rating.module.css";

import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import Close from "../button/close";
import { allowBackButton } from "../../molecules/popups/req";
import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";
function LoginPopup() {
  const [opened, { close, data }] = usePopShortList();
  // const isMobile = useMediaQuery(`(max-width: 601px)`);
  // const isTab = useMediaQuery(`(max-width: 1600px)`);
  return (
    // <Modal
    //   opened={opened}
    //   onClose={close}
    //   centered
    //   classNames={{
    //     title: S.title,
    //     root: S.root,
    //     close: S.close,
    //     content: S.content,
    //     overlay: S.overlay,
    //     header: S.headerCustomLoginPopup,
    //     body: S.bodyPadding,
    //   }}
    //   size={isMobile ? "100%" : isTab ? "45%" : "30%"}
    //   zIndex={1000}
    // >
    opened && (
      <ModalBox
        isOpen={opened}
        handleChange={() => {
          document.body.style.overflow = "unset";
          close();
        }}
        containerClassStyle={`w-full md:w-[45%] xl:w-[30%] !rounded-[20px] !p-0 !pl-[10px] !pr-[10px] `}
        // containerClassStyle={` !rounded-[20px] !p-0 !pl-[10px] !pr-[10px] ${isMobile ? "w-[100%]" : session ? isDataSubmitted.isSubmitted ? isTab ? "w-[40%]" : "w-auto" : "w-[58%]" : "w-[35%]"} `}
        hideCrossIcon={true}
      >
        <Close
          className="absolute  right-3 top-3 size-6 cursor-pointer "
          close={() => {
            close();
            allowBackButton();
          }}
        />
        <LoginPop close={close} data={data} />
      </ModalBox>
    )
    // </Modal>
  );
}
export default LoginPopup;
