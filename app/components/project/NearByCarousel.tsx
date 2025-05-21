"use client";
import useNearby from "@/app/hooks/useNearby";
import React from "react";
import ProjectCarousel from "./ProjectCard";
import useBuilder from "@/app/hooks/useBuilder";
import { capitalizeWords } from "@/app/utils/letters";
// import { boolean } from "yup";

export default function NearByCarousel({
  projName,
  lat,
  lng,
  projId,
  builderId,
  company,
  nearBy,
}: {
  projName: string;
  lat: string;
  lng: string;
  projId?: string;
  builderId?: number;
  company: string;
  slug?: string;
  nearBy?: {
    title: string;
  };
}) {
  const { data, mutate } = useNearby({ lat, lng, projId, builderId, company });
  const { data: builderData } = useBuilder({
    id: builderId ?? 1109,
    y: "N",
    type: "proj",
  });

  const builderQueryNameAndId = encodeURIComponent(`${builderData?.data?.userName }+${builderId}`);
  /* const cityIdmaking=cityID.trim()
  const cityQueryNameAndID=encodeURIComponent(`${location}+${cityIdmaking}`); */
  return (
    <div
      className="flex flex-col justify-start items-start w-full  mt-[4%] sm:mt-0 xl:pt-less-screen-spacing scroll-mt-28"
      id="similar-projects"
    >
      <ProjectCarousel
        type="proj"
        title="Other Projects By"
        content="See what builder has posted"
        projName={capitalizeWords(builderData?.data?.userName ?? "")}
        data={
          data != undefined && data.builderProj != undefined
            ? data.builderProj
            : []
        }
        builderLinkActive={false}
        mutate={mutate}
        builderName={builderData?.data?.userName ?? ""}
        ct="builder"
        id="similar-projects"
        url={`/search?sf=builderIds=${builderQueryNameAndId}`}
      />
      <ProjectCarousel
        type="proj"
        builderLinkActive
        title={nearBy?.title ?? "Near By Projects Of"}
        projName={projName}
        content="See what other customers also viewed"
        data={
          data != undefined && data.nearbyProj != undefined
            ? data.nearbyProj
            : []
        }
        mutate={mutate}
        builderName={builderData?.data?.companyName}
        ct="proj"
        id="other-projects"
        url={`/search?sf=lat=${lat}-lng=${lng}`}
      />
    </div>
  );
}
