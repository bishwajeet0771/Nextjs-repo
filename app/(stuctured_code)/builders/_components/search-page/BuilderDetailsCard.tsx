import BuilderLink from "@/app/utils/linkRouters/Builder";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

type Props = {
  userId: number;
  userName: string;
  companyName: string;
  cityName: string; // This might be a string of cities separated by commas
  builderLogo: string;
  builderDescription: string;
  newProject: number;
  onGoingProject: number;
  completedProject: number;
  isTab: boolean;
  isMobile: boolean;
  builderCity: string;
  branchCities: string;
};

export default function BuilderDetailsCard({
  userId,
  companyName,
  cityName,
  builderLogo,
  builderDescription,
  newProject,
  onGoingProject,
  completedProject,
  userName,
  isTab,
  isMobile,
  // builderCity,
  branchCities,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<{
    type: "description" | "cities" | null;
    action: boolean;
  }>({
    type: null,
    action: false,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = (type: "description" | "cities" | null) =>
    setIsModalOpen((prevState) => ({
      type,
      action: !prevState.action,
    }));

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen({ type: null, action: false });
    }
  };

  useEffect(() => {
    if (isModalOpen.action) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen.action]);

  let newBranchCities = branchCities.replaceAll("null,", "");

  // console.log(completedProject);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative hover:shadow border border-blue-200 hover:border-blue-500">
     <div className="px-2 pb-4 sm:pb-4 sm:px-5 pt-0 sm:pt-4">
  {/* Logo and Name - wrapped in link */}
  <BuilderLink routeParams={{ city: cityName, slug: userName }}>
    <div className="flex flex-row md:flex-row items-center mb-0 cursor-pointer">
      <div className="w-20 h-20 md:w-24 md:h-24 mb-0 md:mb-0 md:mr-4 flex items-center justify-center">
        <Image
          width={200}
          height={200}
          quality={100}
          src={builderLogo}
          alt={`${companyName} logo`}
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />
      </div>
      <h2 className="text-base ml-2 sm:ml-0 sm:text-2xl font-extrabold text-blue-900 text-left">
        {userName}
      </h2>
    </div>
  </BuilderLink>

  {/* Info section (text only, no nested links) */}
  <div className="space-y-1 md:space-y-3">
    <p className="text-sm md:text-base text-black">
      <span className="font-semibold text-[#0073C6]">Operating in:</span>{" "}
      {newBranchCities.substring(0, isMobile ? 53 : isTab ? 120 : 80)}
      {newBranchCities.length > 80 && (
        <>
          ...
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleModal("cities");
            }}
            className="text-[#0073C6] font-semibold ml-2"
          >
            Read more
          </span>
        </>
      )}
    </p>
    <p className="text-sm md:text-base text-black">
      <span className="font-semibold text-[#0073C6]">Company Name:</span>{" "}
      {companyName}
    </p>
    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
      {builderDescription.substring(0, isMobile ? 110 : isTab ? 180 : 150)}
      {builderDescription.length > 150 && (
        <>
          ...
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleModal("description");
            }}
            className="text-[#0073C6] font-semibold ml-2"
          >
            Read more
          </span>
        </>
      )}
    </p>
  </div>

  {/* Project Summary (can include BuilderLink, so it must NOT be nested inside another link) */}
  {(completedProject > 0 || newProject > 0 || onGoingProject > 0) && (
    <div className="flex py-2 px-2 sm:px-4 bg-blue-50 rounded-lg shadow-sm border border-gray-200 mt-2 flex-wrap">
      <div className="mt-0 text-sm sm:text-base font-semibold text-blue-900 text-nowrap mr-2">
        Projects Summary:{" "}
      </div>
      <div className="flex sm:justify-between items-center gap-x-2 flex-wrap">
        {newProject > 0 ? (
          <BuilderLink
            routeParams={{
              type: "projStatus",
              statusId: 108,
              id: userId,
              slug: userName,
            }}
            className="text-center text-sm sm:text-base underline cursor-pointer"
          >
            <span className="font-semibold text-[#0073C6]"> New:</span>
            <span className="text-gray-700 font-medium ml-1">{newProject},</span>
          </BuilderLink>
        ) : (
          <span className="text-center text-sm sm:text-base">
            <span className="font-semibold text-[#0073C6]"> New:</span>
            <span className="text-gray-700 font-medium ml-1">{newProject},</span>
          </span>
        )}
        {onGoingProject > 0 ? (
          <BuilderLink
            routeParams={{
              type: "projStatus",
              statusId: 106,
              id: userId,
              slug: userName,
            }}
            className="text-center text-sm sm:text-base underline cursor-pointer"
          >
            <span className="font-semibold text-[#0073C6]"> Ongoing:</span>
            <span className="text-gray-700 font-medium ml-1">{onGoingProject},</span>
          </BuilderLink>
        ) : (
          <span className="text-center text-sm sm:text-base">
            <span className="font-semibold text-[#0073C6]"> Ongoing:</span>
            <span className="text-gray-700 font-medium ml-1">{onGoingProject},</span>
          </span>
        )}
        {completedProject > 0 ? (
          <BuilderLink
            routeParams={{
              type: "projStatus",
              statusId: 107,
              id: userId,
              slug: userName,
            }}
            className="text-center text-sm sm:text-base underline cursor-pointer"
          >
            <span className="font-semibold text-[#0073C6]"> Completed:</span>
            <span className="text-gray-700 font-medium ml-1">
              {completedProject}
            </span>
          </BuilderLink>
        ) : (
          <span className="text-center text-sm sm:text-base">
            <span className="font-semibold text-[#0073C6]"> Completed:</span>
            <span className="text-gray-700 font-medium ml-1">
              {completedProject}
            </span>
          </span>
        )}
      </div>
    </div>
  )}

  {/* Action Buttons (safe outside main link) */}
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-4">
    <BuilderLink
      routeParams={{
        type: "project",
        slug: userName,
        id: userId,
      }}
      className="w-full sm:w-auto bg-gradient-to-r from-[#0073C6] to-[#0073C6] text-white font-semibold text-sm md:text-base px-4 py-1.5 rounded-lg hover:bg-[#0073C6] transition duration-300 shadow-md"
    >
      See Projects
    </BuilderLink>
    <BuilderLink
      routeParams={{
        city: cityName,
        slug: userName,
      }}
      className="w-full sm:w-auto bg-white text-[#0073C6] font-semibold text-sm md:text-base px-4 py-1.5 rounded-lg hover:bg-blue-50 transition duration-300 border-2 border-[#0073C6] shadow-md"
    >
      Explore Builder
    </BuilderLink>
  </div>
</div>

   

      {/* Modal/Overlay Component */}
      {isModalOpen.action && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] max-h-[90%] overflow-y-auto"
          >
            <button
              onClick={() => toggleModal(null)}
              className="absolute top-5 right-2 bg-red-500 text-white rounded-full w-[30px] h-[30px] hover:bg-red-600 transition"
            >
              ✕
            </button>

            {isModalOpen.type === "description" ? (
              <>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  {/* {companyName} - Full Description */}
                  Company Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {builderDescription}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Operating in Cities
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {newBranchCities}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
