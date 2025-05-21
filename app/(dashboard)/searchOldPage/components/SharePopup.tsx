"use client";
import S from "@/app/styles/Share.module.css";
import {
  EmailIcon,
  FacbookIcon,
  PinIcon,
  // ShearIcon,
  Telegram,
  WhatsAppIcon,
} from "@/app/images/commonSvgs";
import { CopyButton, Modal, em } from "@mantine/core";
import { useClipboard, useMediaQuery } from "@mantine/hooks";
import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookShareCount,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { usePathname } from "next/navigation";
// import clsx from "clsx";
import Close from "@/app/components/project/button/close";
import { atom, useAtom } from "jotai";
export const searchShareAtom = atom({
  opened: false,
  url: "",
  title: "",
});
export default function SharePopup({
  title = "Share Project",
  // url,
  // className,
  titleText,
}: {
  title?: string;
  url?: string;
  className?: string;
  titleText?: string;
}) {
  const clipboard = useClipboard({ timeout: 700 });
  const pathname = usePathname();
  const [shareAtomData, setShareAtomData] = useAtom(searchShareAtom);
  const CopiedUrl = shareAtomData.url
    ? shareAtomData.url
    : `${process.env.NEXT_PUBLIC_PROJECT_URL}/${pathname}`;
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const onClose = () =>
    setShareAtomData({ ...shareAtomData, opened: false, title: "" });
  return (
    <Modal
      opened={shareAtomData.opened}
      onClose={onClose}
      centered
      size={isMobile ? "100%" : "40%"}
      classNames={{
        close: S.close,
        content: S.body,
        overlay: S.overlay,
        header: S.header,
        body: S.remove_padding,
      }}
    >
      <div className="p-5 ">
        <div className="flex justify-between">
          <h3 className="text-[#202020] text-xl xl:text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px] ">
            {(shareAtomData.title || titleText) ?? title}
          </h3>
          <Close className="" close={onClose} />
        </div>

        <p className="text-[#565D70]  text-[14px] xl:text-xl not-italic font-semibold leading-[normal] tracking-[0.8px] my-2 xl:my-5">
          Share this link via
        </p>
        <div className="flex space-x-4  xl:mb-4">
          <Share shareUrl={CopiedUrl} />
        </div>
        <p className="text-[13px]  xl:text-sm font-medium mb-2">or Copy Link</p>
        <div className="flex items-center justify-between border rounded-md p-1 xl:p-2">
          <span
            className="text-black text-[14px]  xl:text-base not-italic font-medium leading-[normal] truncate cursor-pointer"
            onClick={() => clipboard.copy(CopiedUrl)}
          >
            {CopiedUrl}
          </span>
          <CopyButton value={CopiedUrl}>
            {() => (
              <button
                className={`${
                  clipboard.copied ? "!bg-[#148B16]" : "!bg-[#0073C6]"
                } flex justify-center items-center gap-1 shadow-[0px_4px_20px_0px_rgba(112,144,176,0.08)] p-1   xl:p-2 rounded-[5px] text-white text-sm xl:text-xl not-italic font-semibold leading-[normal] min-w-fit`}
                // color={clipboard.copied ? "teal" : "#0073C6"}
                onClick={() => clipboard.copy(CopiedUrl)}
              >
                <PinIcon /> {clipboard.copied ? "Copied" : "Copy"}
              </button>
            )}
          </CopyButton>
        </div>
      </div>
    </Modal>
  );
}

const Share = ({ shareUrl }: { shareUrl: string }) => {
  const title = "Share with friends";
  return (
    <div className=" space-x-5 xl:space-x-10 inline-flex mb-4 mt-1">
      <div className="Demo__some-network">
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="Demo__some-network__share-button"
          windowWidth={1200}
          windowHeight={700}
        >
          {WhatsAppIcon}
          <p className="  text-[12px]  xl:text-[16px] xl:mt-1   ">Whatsapp</p>
        </WhatsappShareButton>
      </div>
      <div className="Demo__some-network">
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
          windowWidth={1200}
          windowHeight={700}
        >
          {Telegram}
          <p className="  text-[12px]  xl:text-[16px] xl:mt-1   ">Telegram</p>
        </TelegramShareButton>
      </div>
      <div className="Demo__some-network">
        <FacebookShareButton
          url={shareUrl}
          className="Demo__some-network__share-button"
          windowWidth={1200}
          windowHeight={700}
        >
          {FacbookIcon}
          <p className="  text-[12px]  xl:text-[16px] xl:mt-1   ">Facebook</p>
        </FacebookShareButton>

        <div>
          <FacebookShareCount
            url={shareUrl}
            className="Demo__some-network__share-count"
          >
            {(count) => count}
          </FacebookShareCount>
        </div>
      </div>
      <div className="Demo__some-network">
        <EmailShareButton
          url={shareUrl}
          subject={title}
          body="body"
          className="Demo__some-network__share-button"
          windowHeight={700}
          windowWidth={1200}
        >
          {EmailIcon}
          <p className="  text-[12px]  xl:text-[16px] xl:mt-1   ">Mail</p>
        </EmailShareButton>
      </div>
    </div>
  );
};
