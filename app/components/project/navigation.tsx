/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { TOPIC_IDS, topics } from "@/app/data/projectDetails";
import useRatings from "@/app/hooks/useRatings";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { projectReqDataAtom } from "@/app/store/project/project.req";
import { Main } from "@/app/validations/types/project";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { atom, useAtom } from "jotai";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
export const isScrollingAtom = atom(false);
export const stickyAtom = atom(false);
export const currentBlockAtom = atom("overview");
export default function Navigation({
  isBrochure,
  detailsData,
  slug,
  scrollId,
}: {
  isBrochure: boolean;
  detailsData: Main;
  slug: string;
  scrollId?: string;
}) {
  const isNearBy = Object.keys(detailsData.nearByLocations).length > 0;
  const isTab = useMediaQuery("(max-width: 1600px)");
  const { data } = useRatings(slug);
  const [projectReqData] = useAtom(projectReqDataAtom);
  const [currentBlock, setCurrentBlock] = useAtom(currentBlockAtom);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useAtom(stickyAtom);
  const [isScrolling, setIsScrolling] = useAtom(isScrollingAtom);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [leftScroll, setLeftScroll] = useState(0);
  const [, { open }] = useReqCallPopup();

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
      setLastScrollY(currentScrollY);
      if (!isScrolling) {
        const sections = topics.map((topic) =>
          document.getElementById(topic.id)
        );
        const sectionTops = sections.map(
          (section) => section?.getBoundingClientRect().top ?? 0
        );
        const windowHeight = window.innerHeight;
        let closestSectionIndex = -1;
        let closestSectionDistance = Number.MAX_VALUE;
        for (let i = 0; i < sections.length; i++) {
          const distance = Math.abs(sectionTops[i] - 0.5 * windowHeight);
          if (distance < closestSectionDistance) {
            closestSectionDistance = distance;
            closestSectionIndex = i;
          }
        }
        if (closestSectionIndex !== -1) {
          setCurrentBlock(sections[closestSectionIndex]?.id ?? "");
        }
        if (currentScrollY > (isTab ? 600 : 800)) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
        if (scrollDirection === "down" && window.scrollY > 900) {
          handleArrowClick("R", 100);
        } else {
          handleArrowClick("L", -100);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling, lastScrollY, isTab, setCurrentBlock, setIsSticky]);
  function handleArrowClick(side: "R" | "L", value?: number): void {
    const scrollAmount = side === "R" ? value ?? 400 : value ?? -400;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollAmount;
      setLeftScroll((scrollContainerRef.current.scrollLeft += scrollAmount));
    }
  }
  function scrollToTopic(id: string): void {
    setIsScrolling(true);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
      setCurrentBlock(id);

      // Make the navigation bar sticky if the clicked topic is not "overview"
      if (id !== "overview") {
        setIsSticky(true);
      }
    }
    setTimeout(() => setIsScrolling(false), 3000);
  }
  const conditionsArray = [
    {
      key: TOPIC_IDS.PROJECT_RATINGS,
      condtion:
        data?.status &&
        data?.reviewDataList?.filter((item: any) => item.userReview).length > 0
          ? true
          : false,
    },

    { condtion: true, key: TOPIC_IDS.OVERVIEW },
    { condtion: true, key: TOPIC_IDS.LISTINGS_AVAILABLE },
    { condtion: true, key: TOPIC_IDS.ABOUT },
    { condtion: true, key: TOPIC_IDS.PROPERTY_DETAILS },
    { condtion: true, key: TOPIC_IDS.MASTER_PLAN },
    { condtion: true, key: TOPIC_IDS.PRICE_DETAILS },
    { condtion: true, key: TOPIC_IDS.FLOOR_PLANS },
    { condtion: true, key: TOPIC_IDS.GALLERY },
    {
      condtion: detailsData?.amenityList?.length > 0,
      key: TOPIC_IDS.AMENITIES,
    },
    { condtion: true, key: TOPIC_IDS.LOCATION_MAP },
    { condtion: isNearBy, key: TOPIC_IDS.NEAR_BY },
    { key: TOPIC_IDS.BROCHURE, condtion: isBrochure },
    {
      condtion: detailsData?.specificationList?.length > 0,
      key: TOPIC_IDS.SPECIFICATIONS,
    },
    {
      condtion: detailsData?.highlights?.length > 0,
      key: TOPIC_IDS.HIGHLIGHTS,
    },
    { condtion: true, key: TOPIC_IDS.CUSTOMER_REVIEWS },
    { condtion: detailsData?.banks?.length > 0, key: TOPIC_IDS.BANK_APPROVALS },
    { condtion: true, key: TOPIC_IDS.ABOUT_BUILDER },
    { condtion: true, key: TOPIC_IDS.WHY_BUY },
    { condtion: true, key: TOPIC_IDS.BROCHURE },
    {
      condtion: detailsData.faqs && detailsData.faqs.length > 0,
      key: TOPIC_IDS.FAQ,
    },
    { condtion: projectReqData?.isNearby, key: TOPIC_IDS.SIMILAR_PROJECTS },
    { condtion: true, key: TOPIC_IDS.CONTACT },
  ];
  const { data: userData } = useQuery({
    queryKey: [`builder/${detailsData.builderId}&isBuilderPage=Nproj`],
    enabled: false,
  });

  useEffect(() => {
    if (
      scrollId &&
      conditionsArray.find((condtion) => condtion.key === scrollId)?.condtion
    ) {
      setIsScrolling(true);
      const element = document.getElementById(scrollId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center",
        });
        setIsSticky(true);
      }
      setCurrentBlock(scrollId);
      setTimeout(() => setIsScrolling(false), 3000);
    }
  }, []);

  return (
    <div
      className={clsx(
        "flex justify-center items-center shadow-lg w-full",
        isSticky && "fixed top-[68px] bg-white shadow-md z-[10]"
      )}
    >
      {leftScroll > 0 && (
        <Image
          src="/auth/arrow.svg"
          alt="Scroll Left"
          title="Scroll Left"
          className="rotate-180 cursor-pointer"
          width={40}
          height={40}
          style={{ display: 'block' }} // Prevents small vertical shifts
          onClick={() => handleArrowClick("L")}
        />
      )}

      <div
        className="h-[40px] scroll-smooth w-[100%] bg-[#FCFCFC] shadow-sm flex justify-start items-center scrollbar-hide overflow-x-auto lg:px-14"
        ref={scrollContainerRef}
      >
        {topics.map((topic) => {
          const conditions = conditionsArray.find(
            (item) => item.key === topic.id
          );

          return (
            conditions?.condtion && (
              <div
                key={topic.id}
                className={clsx(
                  `cursor-pointer text-[20px] mr-[36px]  whitespace-nowrap`,
                  currentBlock === topic.id
                    ? "text-[#0073C6] font-[700] decoration-solid underline"
                    : "text-[#242424] font-[500]",
                  (topic.id === "ratings" && data?.status === false) ||
                    (isBrochure === false && topic.id === "brochure")
                    ? "hidden"
                    : ""
                )}
                onClick={() => {
                  if (topic.id === "contact") {
                    open({
                      modal_type: "PROJECT_REQ_CALLBACK",
                      // @ts-ignore
                      postedByName: userData?.data?.userName,
                      reqId: slug,
                      source: "projBanner",
                      title: detailsData.projectName,
                      postedId: detailsData.builderId,
                    });
                    return;
                  }
                  scrollToTopic(topic.id);
                  setCurrentBlock(topic.id);
                }}
              >
                {topic.id === "ratings" && data?.status && (
                  <span>Customer Reviews</span>
                )}
                {topic.id === "brochure" && isBrochure && (
                  <span>{topic.label}</span>
                )}
                {topic.id !== "ratings" &&
                  topic.id !== "brochure" &&
                  topic.label}
              </div>
            )
          );
        })}
      </div>
      <Image
        src="/auth/arrow.svg"
        alt="Scroll Right"
        title="Scroll Right"
        className="cursor-pointer"
        width={40}
        height={40}
        onClick={() => handleArrowClick("R")}
        style={{ display: 'block' }} // Prevents small vertical shifts
      />
    </div>
  );
}
