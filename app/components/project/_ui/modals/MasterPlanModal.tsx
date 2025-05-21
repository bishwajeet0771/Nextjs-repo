"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
// import { GrPowerReset } from "react-icons/gr";
import { FiX, FiShare2, FiDownload, FiZoomIn, FiZoomOut } from "react-icons/fi";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { newIcons, PopupOpenSvg } from "@/app/images/commonSvgs";
import { imageUrlParser } from "@/app/utils/image";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { useSession } from "next-auth/react";
import {
  allowBackButton,
  preventBackButton,
} from "@/app/components/molecules/popups/req";

interface ZoomableMasterplanModalProps {
  imageUrl: string;
  // altText: string;
  title: string;
}

export default function FullScreenMasterPlanModal({
  imageUrl = "/placeholder.svg?height=1080&width=1920",
  // altText = "Masterplan",
  title = "Project Masterplan 2023",
}: ZoomableMasterplanModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, { open: LoginOpen }] = usePopShortList();
  const { data: session } = useSession();

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
    preventBackButton();
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setIsOpen(false);
    allowBackButton();
  };

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       closeModal();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

  const handleShare = () => {
    navigator.share({ title: title, url: imageUrlParser(imageUrl, "M") });
    /* openSharePopup({
      opened: true,
      title: title,
      url: imageUrlParser(imageUrl,"M"),

    }); */
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "masterplan.webp";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleDownloadMasterplan = async () => {
    if (session) {
      handleDownload();
    } else {
      LoginOpen(handleDownload, {
        type: "master-plan",
        link: imageUrl,
      });
    }
  };

  const handleShearMasterplan = async () => {
    if (session) {
      handleShare();
    } else {
      LoginOpen(handleShare, {
        type: "master-plan",
        link: imageUrl,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      preventBackButton();
      const onPopState = () => closeModal();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
      };

      window.addEventListener("popstate", onPopState);
      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("popstate", onPopState);
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [isOpen]);

  return (
    <div>
      <div className="relative max-h-[300px] min-h-[300px] sm:max-h-[600px]: sm:min-h-[600px]">
        <picture>
          <source media="(max-width: 460px)" srcSet={imageUrl.split(",")[1]} />
          <source media="(max-width: 768px)" srcSet={imageUrl.split(",")[2]} />
          <source media="(min-width: 1200px)" srcSet={imageUrl.split(",")[3]} />
          <Image
            alt={`${title} Master Plan`}
            src={imageUrl.split(",")[3]}
            fill
            className="cursor-pointer max-h-[600px] object-contain shadow-[0px_4px_30px_0px_rgba(0,0,0,0.25)] rounded-[14px] border-[0.5px] border-solid border-[#D2CDCD] py-4"
            onClick={openModal}
            unoptimized
            title={`${title} Master Plan`}
          />
        </picture>
        <button
          name="Click to open the master plan image" 
          title="Click to open the master plan image"
          aria-label="Click to open the master plan image"
          onClick={openModal}
        >
          <span className="sm:bg-[#F4FBFF] p-[10px] rounded-[29px] gap-[12px] flex justify-end items-center  cursor-pointer absolute bottom-2 right-1 sm:right-4 z-1 mb-  [20px] sm:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.40)]">
            <span className="text-[#0073C6] hidden sm:block sm:text-[14px] xl:text-xl not-italic font-semibold leading-[normal] underline capitalize">
              Click on image to open master plan
            </span>
            <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]  " />
          </span>{" "}
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black">
          {/* Header */}
          <div className="absolute top-0 left-0 z-[100] right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black to-transparent text-white">
            <h2 className="text-xl font-bold">
              Master Plan <span className="hidden sm:inline-flex">of</span>{" "}
              <span className="hidden sm:inline-flex">{title}</span>{" "}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShearMasterplan}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Share"
                name="Share" title="Share"
              >
                <FiShare2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownloadMasterplan}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Download"
                name="Download" title="Download"
              >
                <FiDownload className="w-5 h-5" />
              </button>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Close modal"
                name="Close modal" title="Close modal"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Media Preview */}
          <div className="absolute inset-0 flex items-center justify-center">
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute top-16 left-4 md:top-16  z-10 flex space-x-2 md:space-x-4">
                    <button
                      onClick={() => zoomIn()}
                      className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors bg-black"
                      aria-label="Zoom in"
                      name="Zoom in" title="Zoom in"
                    >
                      <FiZoomIn className="w-5 h-5" color="white" />
                    </button>
                    <button
                      onClick={() => zoomOut()}
                      className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors bg-black"
                      aria-label="Zoom out"
                      name="Zoom out" title="Zoom out"
                    >
                      <FiZoomOut className="w-5 h-5" color="white" />
                    </button>
                    <button
                      onClick={() => resetTransform()}
                      className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors bg-black"
                      aria-label="Reset zoom"
                      name="Reset zoom" title="Reset zoom"
                    >
                      {newIcons.get("resetIconWhite")}
                    </button>
                  </div>
                  <TransformComponent
                    wrapperStyle={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                    contentStyle={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={imageUrl}
                      alt={"ALT TEXT"}
                      layout="fill"
                      objectFit="contain"
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      )}
    </div>
  );
}
