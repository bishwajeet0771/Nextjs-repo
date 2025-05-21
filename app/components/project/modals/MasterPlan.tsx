/* eslint-disable no-unused-vars */
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { Image, Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import Close from "../button/close";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import S from "@/app/styles/ImgCarousel.module.css";
import ZoomInOut from "../actions/ZoomInOut";
import NextImage from "next/image";
import { useDrag } from "@use-gesture/react";
export default function MasterPlanPopup({
  url,
  onDownload,
  projName,
}: {
  url: string;
  onDownload: () => void;
  projName: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: 750px`);
  const bind = useDrag(
    ({ swipe: [swipeX, swipeY] }) => {
      if (swipeY > 0) {
        close();
      } else if (swipeY < 0) {
        close();
      }
    },
    { axis: "y" } // Enable only vertical swipe detection
  );
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        classNames={{
          close: S.close,
          content: S.mContent,
          header: S.header,
          overlay: S.mOverlay,
          inner: S.inner,
        }}
        size={isMobile ? "100%" : "auto"}
        centered={isMobile}
        {...bind()}
      >
        <div className="h-auto scrollbar-hide flex justify-end flex-col items-center ">
          <div className="w-full bg-transparent h-[57px] flex items-center justify-between z-[1000] md:px-10 max-w-[91rem] m-auto">
            <div className="text-white text-[18px] sm:text-2xl not-italic font-bold leading-[normal]">
              Master Plan
            </div>
            <div className="flex justify-center items-center  gap-5">
              <button
                className="flex justify-center items-center gap-1 p-1 xl:p-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#F3F7FF] text-[#0073C6] text-base not-italic font-semibold leading-[normal] tracking-[0.32px] !cursor-pointer"
                onClick={onDownload}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM4 20V15H6V18H18V15H20V20H4Z"
                    fill="#0073C6"
                  />
                </svg>{" "}
                <span className="hidden h-4 w-4 xl:w-full xl:h-auto  items-center  xl:block">
                  Download
                </span>
              </button>
              <SharePopup
                titleText="Share Master Plan"
                title="Share"
                url={imageUrlParser(url || "", "M")}
                className="text-[#0073C6] text-base not-italic font-semibold leading-[normal] tracking-[0.32px]"
              />
              <Close
                className="h-[28px] w-[28px] xl:h-[36px] xl:w-[36px]"
                close={close}
              />
            </div>
          </div>
          <div>
            <TransformWrapper>
              <Content url={url} />
            </TransformWrapper>
          </div>
        </div>
      </Modal>
      <Image
        radius="md"
        src={`${url}`}
        mah={600}
        w="100%"
        fit="contain"
        onClick={open}
        width={600}
        height={600}
        className="cursor-pointer shadow-[0px_4px_30px_0px_rgba(0,0,0,0.25)] rounded-[14px] border-[0.5px] border-solid border-[#D2CDCD] py-4"
        alt={`${projName} Master Plan`}
        component={NextImage}
      />
      <button onClick={open}>
        <span className="sm:bg-[#F4FBFF] p-[10px] rounded-[29px] gap-[12px] flex justify-end items-center  cursor-pointer absolute bottom-7 right-1 sm:right-4 z-1 mb-[20px] sm:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.40)]">
          <span className="text-[#0073C6] hidden sm:block sm:text-[14px] xl:text-xl not-italic font-semibold leading-[normal] underline capitalize">
            Click on image to open master plan
          </span>
          <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]  " />
        </span>{" "}
      </button>
    </>
  );
}

const Content = ({ url }: { url: string }) => {
  return (
    <>
      <TransformComponent>
        {" "}
        <Image
          radius="md"
          m={"auto"}
          // fit="fill"
          src={`${url}`}
          // component={NextImage}
          mah={700}
          // w="100%"
          fit="contain"
          alt="master plan"
          className="cursor-pointer h-[420px] xl:h-[770px] border-[5px] bg-white border-white sm:min-w-[800px] xl:min-w-[1400px] xl:max-h-[770px] object-contain"
          component={NextImage}
          width={600}
          height={600}
        />
      </TransformComponent>
      <ZoomInOut className="right-5 xl:right-48 pb-2" />
    </>
  );
};
