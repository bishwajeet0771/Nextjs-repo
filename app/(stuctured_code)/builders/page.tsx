import React from "react";
import BuildersDirectory from "./_components/search-page/CitiesBuilder";
import { getCitiesBuilder } from "./services/builder-client.service";

type Props = {};

export default async function Page({}: Props) {
  const builderData = await getCitiesBuilder({
    page: 0,
    sort: 0,
  });
  return <BuildersDirectory initialData={builderData} />;
}
