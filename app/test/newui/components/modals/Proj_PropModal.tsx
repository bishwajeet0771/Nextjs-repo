"use client";
import React, {
  // useCallback,
  useEffect,
  // useMemo,
  useRef,
  // useState,
} from "react";
import { useAtom } from "jotai";
import { mobileSearchPageMapModalReducerAtom } from "@/app/store/search/map";
import Close from "@/app/components/project/button/close";
import useProjectCardData from "../../useProjectCardData";
import ProjectContent from "./ProjectContent";

const Dialog: React.FC = () => {
  const [modalState, dispatch] = useAtom(mobileSearchPageMapModalReducerAtom);
  const { title, id, opened, type } = modalState;
  const isOpen = opened;
  const { data: nearbyData, isLoading } = useProjectCardData({
    id: id ?? "",
    isOpen: isOpen,
    conType: type ?? "",
    pType: "proj",
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const onClose = () => dispatch({ type: "close" });
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        dispatch({ type: "close" });
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-3">
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full"
        ref={dialogRef}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Close close={onClose} />
        </div>
        {isLoading ? (
          <div>Loading..</div>
        ) : (
          <ProjectContent data={nearbyData} />
        )}
      </div>
    </div>
  );
};

export default Dialog;
