"use client";
import React from "react";
import { useAtomValue } from "jotai";
import MainHeading from "../heading";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useQuery } from "react-query";
import RTK_CONFIG from "@/app/config/rtk";
import { getHomePageProjectData } from "@/app/(new_routes_seo)/utils/new-seo-routes/home.api";
import CardsCarousal from "@/common/components/CardsCarousal";
import Card from "./Card";
import styles from "@/app/styles/Carousel.module.css";

type Props = {
  data: any;
  shortIds: any;
  cityId?: string;
};

export default function NewAddedProjects({ data, shortIds, cityId }: Props) {
  const globalState = useAtomValue(homeSearchFiltersAtom);
  const isEnabled =
    !!globalState.city && globalState.city?.split("+")[1] != cityId;
  const { data: newlyAddedProjects, isLoading } = useQuery({
    queryKey: ["home-page-projects-data" + globalState.city?.split("+")[1]],
    queryFn: () =>
      getHomePageProjectData(globalState.city?.split("+")[1] ?? ""),
    enabled: isEnabled,
    ...RTK_CONFIG,
  });

  const cardsData = isEnabled ? newlyAddedProjects?.featured ?? [] : data;

  return isLoading ? (
    <div> Loading...</div>
  ) : (
    (isEnabled
      ? newlyAddedProjects?.status && newlyAddedProjects["featured"]?.length
      : data?.length) > 0 && (
      <div className="mt-[40px] sm:mt-[60px] w-[95%] m-auto">
        <MainHeading
          title="Featured Projects"
          content="Premier Real Estate Projects Awaiting You"
          url="/search?sf=city=Bengaluru%2B9-cg=S-listedBy=All"
        />

        {/* <CardCarousel
          data={isEnabled ? newlyAddedProjects["featured"] : data}
          shortIds={shortIds}
        /> */}

        <CardsCarousal
          key="featuredProjectsCon"
          allCards={cardsData?.map((item: any, index: number) => (
            <Card
              key={`home-project-data-${index.toString()}`}
              item={{
                ...item,
                shortListed:
                  shortIds?.projIds &&
                  shortIds?.projIds?.includes(item.projIdEnc)
                    ? "Y"
                    : "N",
              }}
            />
          ))}
          dataLength={cardsData.length}
          scrollSize={631}
          gap={20}
          containerClass={styles.carouselOuterCon}
        />
      </div>
    )
  );
}
