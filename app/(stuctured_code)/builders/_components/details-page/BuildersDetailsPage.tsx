import SectionSkeleton from "@/app/components/atoms/skeleton/section";
import React from "react";
import TopProfileBlock from "./BuilderPageTopProfileBlock";
import ProjectDetails from "./BuilderPageAboutProjectDetailsAndAddress";
import ManagementBlock from "./management-section/BuilderPageManagementSection";
import BuilderCarousel from "./BuilderPageCarousel";
import Reqcallback from "./Reqcallback";
import ProjectDrawer from "@/app/components/project/Drawer";
import Disclamer from "./disclamer/BuilderPageDisclamer";
import dynamic from "next/dynamic";

const LoginPopup = dynamic(
  () => import("@/app/components/project/modals/LoginPop"),
  {
    loading: () => <SectionSkeleton />,
    ssr: false,
  }
);
type Props = { data: any; id: string };

export default function BuilderDetailsPage({ data, id }: Props) {
  const refURls = data?.data?.sourceBuilderUrl?.split(",");
  console.log(data)
  return (
    <div className="flex flex-col justify-start items-center w-full mt-[70px]  ">
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}${data?.data?.pathname}`}
      />
      {data && (
        <>
          <TopProfileBlock {...data.data} />
          <div className="flex flex-col justify-start items-start w-[95%] ">
            <ProjectDetails {...data.data} id={id} />
            <ManagementBlock {...data.data} />
          </div>
          <div className="w-full m-auto sm:w-[95%]">
            <BuilderCarousel
              type="proj"
              id={id}
              title={`Projects `}
              projName={`  ${data?.data?.userName}`}
              content={`See other Projects by ${data?.data?.userName}`}
              data={data?.data?.builderProjects}
              location={
                data?.data?.projectAvailableCities &&
                Object.keys(data?.data?.projectAvailableCities).length <= 1
                  ? data.data.cityName
                  : ""
              }
              cityID={`  ${data?.data?.city}`}
              builderName={data?.data?.userName}
            />
            {refURls && refURls.length > 0 && <Disclamer refUrls={refURls} />}
          </div>
          {/* <Reqcallback builderName={data.data?.userName} /> */}
          <Reqcallback />

          <ProjectDrawer projName={data?.data?.userName} />
          <LoginPopup />
        </>
      )}
    </div>
  );
}
