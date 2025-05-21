import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  const url = createProjectLinkUrl({
    city: "Bengaluru",
    locality: "AECS Layout",
    projIdEnc: "a4730855bf19cbae8597612360eb4c4c",
    slug: "Rohan Mihira Apartment",
  });

  return <div className="mt-[30%]">{JSON.stringify(url)}</div>;
}
