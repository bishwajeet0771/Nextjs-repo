/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  handleChange?: any;
  hideCrossIcon?: boolean;
  containerClassStyle?: string;
};

function ModalBox({
  children,
  isOpen,
  handleChange,
  containerClassStyle,
  hideCrossIcon,
}: Props) {
  const onClosePopup = () => {
    document.body.style.overflow = "unset";
    handleChange(false);
    window.history.back();
  };

  const onMainConClick = (e: any) => {
    var baxEl = document.getElementById("modalPopupInnerCon");
    if (baxEl && !baxEl.contains(e.target)) {
      onClosePopup();
    }
  };

  // useEffect(()=>{
  //     if (isOpen) {
  //         document.body.style.overflow = "hidden"
  //         window.history.pushState(null, "", window.location.href);
  //         const handlePopState = () => {
  //           document.body.style.overflow = "unset";
  //           window.history.back();
  //           handleChange(false);
  //         };

  //         window.addEventListener("popstate", handlePopState);
  //         return () => window.removeEventListener("popstate", handlePopState);
  //     }
  //     else{
  //         document.body.style.overflow = "unset";
  //         window.history.back();
  //     }
  // }, [isOpen]);

  useEffect(() => {
    const handleClose = () => {
      document.body.style.overflow = "unset";
      handleChange(false);
      window.history.back();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.history.pushState(null, "", window.location.href);

      const onPopState = () => handleClose();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleClose();
      };

      window.addEventListener("popstate", onPopState);
      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("popstate", onPopState);
        window.removeEventListener("keydown", onKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
      console.log("scroll ddd");
      window.history.back();
    }
  }, [isOpen]);

  return (
    <div
      className="fixed w-full min-h-[calc(100vh-70px)] flex justify-center items-center overflow-hidden left-0 top-[66px] bg-black/30 !z-[1000]"
      onClick={(e) => onMainConClick(e)}
    >
      <div
        id="modalPopupInnerCon"
        className={`relative bg-white flex flex-col overflow-y-auto shrink-0 z-[3] overflow-x-hidden max-h-[80%] h-full w-[94%] p-[2%] pt-[32px] rounded-[4px] justify-center items-center ${
          containerClassStyle ? containerClassStyle : ""
        }`}
      >
        {hideCrossIcon !== true && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClosePopup();
            }}
            className="p-[4px] hover:bg-gray-100 rounded-full absolute top-0 right-0"
          >
            <MdClose className="w-6 h-6" />
          </button>
        )}

        <div className="w-full rounded-[4px]">{children}</div>
      </div>
    </div>
  );
}

export default ModalBox;
