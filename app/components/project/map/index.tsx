/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useCallback, useMemo, Fragment } from "react";
import { Coordinates } from "@/app/utils/maps";
import { useMediaQuery } from "@mantine/hooks";
import { nearbyLocationIcon } from "@/app/images/commonSvgs";
import dynamic from "next/dynamic";
import MapSkeleton from "../../maps/Skeleton";
import PropertyHeading from "../../property/heading";
import { useSetAtom } from "jotai";
import { isScrollingAtom } from "../navigation";
import CustomScrollArea from "./ScrollPanel";
import { isScrollingAtom as propScrollingAtom } from "../../property/Navigation";
import SubHeading from "../headings/SubHeading";
import { areas } from "./data";
import Image from "next/image";

export interface Area {
  name: string;
  Icon?: any;
  lat?: number;
  lng?: number;
  projName?: string;
  key?: string;
  type?: "proj" | "prop";
}

const LeafMap: React.FC<{
  lat: string;
  lang: string;
  projName: string;
  type?: "proj" | "prop";
  projId?: string;
  mapData: any;
}> = ({ lat, lang, projName, type, mapData }) => {
  //console.log(projName)
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/maps"), {
        loading: () => <MapSkeleton />,
        ssr: false,
      }),
    []
  );
  
  const [selected, setSelected] = useState<string>(Object.keys(mapData)[0]);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
  }>();

  const showLocationOnMap = useCallback(
    (location: { position: { lat: number; lng: number }; name: string }) => {
      setSelectedLocation({
        lat: location.position.lat,
        lng: location.position.lng,
        name: location.name,
      });
    },
    []
  );
  const [showMap, setShowMap] = useState(false);

  const isMobile = useMediaQuery(`(max-width: 750px)`);

  const LocationHeader = ({
    projName,
    type,
  }: {
    projName: string;
    type?: "proj" | "prop";
  }) => {
    return (
      <div>
        {type === "prop" ? (
          <PropertyHeading
            title={
              <Fragment>
                Location Map Of{" "}
                <span className="text-green-800">{projName}</span>
              </Fragment>
            }
            desc="Explore nearby convenient amenities, entertainment, and essential services"
            className="sm:mb-[18px]"
          />
        ) : (
          <div>
            <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[12px] capitalize break-words ">
              <strong>
                <span className="text-[#001F35]">Location Map Of </span>
                <span className="text-green-800">{projName}</span>
              </strong>
            </h2>
            <SubHeading
              text="Explore nearby convenient amenities, entertainment, and essential services"
              className="mt-2 mb-4 sm:mb-8"
            />
          </div>
        )}
      </div>
    );
  };

  const downData =
    mapData && mapData[selected] && mapData[selected].length > 0
      ? mapData[selected]
      : [];
  return (
    <div
      className="w-full scroll-mt-[170px] mx-auto mb-[3%] sm:mb-0 sm:pt-less-screen-spacing"
      id="location-map"
    >
      <div className="w-[95%] sm:w-[90%] mx-auto scroll-mt-[200px]">
        <LocationHeader projName={projName} type={type} />
      </div>

      {!showMap ? (
        <div
          //id="location-map"
          className="h-[291px] sm:h-[486px] xl:h-[700px] max-w-full w-full relative "
        >
          <div
            //  onClick={() => setShowMap(true)}
            className="absolute inset-0 cursor-pointer bg-gray-100 opacity-80 w-[95%] sm:w-[90%] mx-auto rounded-lg mb-2 sm-mb-0"
          >
            <picture>
              <source
                media="(max-width: 460px)"
                srcSet={`https://media.getrightproperty.com/staticmedia-images-icons/project-detail/phone-default-map.webp`}
              />
              <source
                media="(max-width: 768px)"
                srcSet={`https://media.getrightproperty.com/staticmedia-images-icons/project-detail/default-map-laptop.webp`}
              />
              <source
                media="(min-width: 1200px)"
                srcSet={`https://media.getrightproperty.com/staticmedia-images-icons/project-detail/desktop-default-map.webp`}
              />

              {/* <Image
                alt={projName}
                title={projName}
                src={`https://media.getrightproperty.com/staticmedia-images-icons/project-detail/desktop-default-map.webp`}
                fill
                className={`bg-gray-`}
                unoptimized
              /> */}

              <img
                alt={projName}
                title={projName}
                src={`https://media.getrightproperty.com/staticmedia-images-icons/project-detail/desktop-default-map.webp`} // fallback image
                width={1820}
                height={700}
                className={`h-full bg-gray-`}
                loading="lazy"
              />
            </picture>
          </div>
          <div
            onClick={() => setShowMap(true)}
            className="absolute inset-0 flex items-center justify-center"
          >
            <button
              aria-label="Click to View Location Details" name="Click to View Location Details" title="Click to View Location Details"
              onClick={() => setShowMap(true)}
              className="z-8 px-6 py-3 text-white rounded-lg bg-btnPrimary shadow-lg hover:bg-btnPrimary transition-colors"
            >
              <span className="text-lg font-semibold">
                Click to View Location Details
              </span>
            </button>
          </div>
        </div>
      ) : Object.keys(mapData).length > 0 ? (
        <div
          className="w-full scroll-mt-[170px] mx-auto mb-[3%] sm:mb-0 sm:pt-less-screen-spacing"
          id="location-map"
        >
          <div className="flex gap-6 mb-5 mt-1 flex-wrap w-[95%] ml-0 md:ml-4">
            <CustomScrollArea
              areas={areas}
              selected={selected}
              setSelected={setSelected}
              data={mapData}
            />
          </div>
          {/* max-h-[calc(100% - 60px)] md:max-h-[calc(100% - 54px)] */}
          <div className="border border-[#92B2C8] flex flex-col-reverse md:grid grid-cols-1 md:grid-cols-[2fr_3fr] rounded-xl overflow-hidden shadow-lg md:h-[456px] xl:h-[620px] w-[95%] sm:w-[90%] mx-auto">
            <section className="bg-white">
              <div className="overflow-y-auto overflow-x-hidden scroll-smooth h-full max-h-[600px] md:max-h-[456px] xl:max-h-[600px]  ">
                <div className="bg-blue-50 p-2 sm:px-3 sm:py-2 xl:px-5 xl:py-4 sticky top-0 left-0 w-full min-w-[385px] ">
                  <p className="text-[#001F35] text-[16px] xl:text-[22px] font-medium leading-[normal]  ">
                    Explore Your Surroundings, Everywhere Nearby!
                  </p>
                </div>
                <div
                  id="location-listing"
                  className={`grid gap-2 px-[10px] pb-[${
                    isMobile ? 10 : 50
                  }px] `}
                >
                  {mapData[selected] && mapData[selected].length > 0 ? (
                    mapData[selected]
                      .map((location: any) => ({
                        ...location,
                        distance: location.distance,
                      }))
                      .sort(
                        (a: any, b: any) =>
                          Number(a.time?.split(" ")[0]) -
                          Number(b.time?.split(" ")[0])
                      )
                      .map((location: any) => (
                        <LocationList
                          type="public"
                          {...location}
                          key={location.lat}
                          origin={{
                            lat: Number(lat),
                            lng: Number(lang),
                          }}
                          isMobile={isMobile}
                          isProj={type}
                          onClick={setSelectedLocation}
                          setDirection={showLocationOnMap}
                          showLocationOnMap={showLocationOnMap}
                        />
                      ))
                  ) : (
                    <p>No locations found.</p>
                  )}
                </div>
              </div>
            </section>

            <section>
              <Map
                key="leaflet2SearchPageMap"
                data={mapData && mapData[selected] ? mapData[selected] : []}
                selectedLocation={selectedLocation}
                projName={projName}
                lat={lat}
                lang={lang}
                selected={selected}
                setSelectedLocation={setSelectedLocation}
                type="proj"
              />
            </section>
          </div>

          {mapData[selected] && mapData[selected].length > 0 && (
            <div className="mt-8 w-[90%] mx-auto hidden sm:block">
              <h2
                className="sm:text-[22px] xl:text-[28px] font-bold mb-[12px] capitalize break-words scroll-mt-[180px]"
                id="near-by-projects"
              >
                <strong>
                  <span className="text-[#001F35]">Nearby</span>{" "}
                  <span className="text-green-800 ml-1">{projName} </span>
                </strong>
              </h2>
              <div className="flex gap-2 mt-3 flex-wrap sm:gap-x-[2.5] xl:gap-x-5">
                {downData.map((item: any) => (
                  <MapCard
                    key={item.lat}
                    {...item}
                    origin={{
                      lat: Number(lat),
                      lng: Number(lang),
                    }}
                    type={type}
                    showLocationOnMap={showLocationOnMap}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          id="location-map"
          className="w-[95%] md:w-[90%] scroll-mt-[180px] sm:mt-[20px] xl:mt-[50px] justify-center"
        >
          <div className="flex justify-between w-[90%]">
            {type === "prop" ? (
              <PropertyHeading
                title=""
                desc=""
                className="mb-[40px]"
                projName={`Location Map Of  ${projName}`}
              />
            ) : (
              <div>
                <h2 className="sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[12px] capitalize break-words sm:text-nowrap">
                  <span>Location Map Of Project </span>
                  <span className="text-[#148B16] ">{projName} </span>
                </h2>
              </div>
            )}
          </div>
          <Map
            // key="leaflet3SearchPageMap"
            data={mapData && mapData[selected] ? mapData[selected] : []}
            selectedLocation={selectedLocation}
            projName={projName}
            lat={lat}
            lang={lang}
            selected={selected}
            setSelectedLocation={setSelectedLocation}
            type="proj"
          />
        </div>
      )}
    </div>
  );
};

export default LeafMap;

const MapCard = ({
  name,
  showLocationOnMap,
  lat,
  lang,
  distance,
  time,
  type,
}: any) => {
  const setIsScrolling = useSetAtom(
    type === "prop" ? propScrollingAtom : isScrollingAtom
  );

  const handleClick = () => {
    showLocationOnMap({
      position: {
        lat,
        lng: lang,
      },
      name,
    });
    scrollToTopic("location-map");
  };

  const scrollToTopic = (id: string): void => {
    setIsScrolling(true);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
    setTimeout(() => setIsScrolling(false), 3000);
  };

  return (
    <div
      className="flex flex-col items-start gap-2 px-3 py-3 cursor-pointer shadow-sm rounded-lg border border-[#E5E7EB] bg-white w-full max-w-[300px] transition-all hover:shadow-md hover:border-[#D1D5DB] mb-2"
      onClick={handleClick}
    >
      <h3 className="text-black text-lg font-semibold leading-tight capitalize w-full truncate">
        {name}
      </h3>
      <div className="flex items-center justify-start w-full text-base text-gray-700">
        <div className="flex items-center gap-1">
          {nearbyLocationIcon}
          <span className="ml-1 text-[#005DA0] font-medium">
            {distance ?? "N/A"}
          </span>
        </div>
        <span className="mx-2">|</span>
        <span className="font-medium">{time ?? "N/A"}</span>
      </div>
    </div>
  );
};

const LocationList: React.FC<{
  name: string;
  geometry: Coordinates;
  vicinity: string;
  lat: number;
  lang: number;
  type: "public" | "drive" | "walk";
  onClick: (location: any) => void;
  onChangeTravelMode: (mode: string) => void;
  showLocationOnMap: (location: any) => void;
  distance: any;
  duration: any;
  rating?: number;
  origin: {
    lat: number;
    lng: number;
  };
  time: string;
  isProj: "proj" | "prop";
  isMobile: boolean;
}> = ({
  name,
  showLocationOnMap,
  lat,
  lang,
  distance,
  time,
  isProj,
  isMobile,
}) => {
  const setIsScrolling = useSetAtom(
    isProj === "prop" ? propScrollingAtom : isScrollingAtom
  );
  const scrollToTopic = (id: string): void => {
    setIsScrolling(true);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
    setTimeout(() => setIsScrolling(false), 3000);
  };
  const handleClick = () => {
    showLocationOnMap({
      position: {
        lat,
        lng: lang,
      },
      name,
    });
    if (isMobile) {
      scrollToTopic("near-by-projects");
    }
  };

  return (
    <div
      className="bg-gray-50 border rounded-lg cursor-pointer mt-[12px] md:max-w-[640px] py-2 xl:py-3 px-2"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between sm:flex-wrap">
        <h3 className="text-black text-[12px] sm:text-[16px] xl:text-lg not-italic font-medium leading-[normal] max-w-[60%] capitalize w-[70%]">
          {name}
        </h3>
        <div className="flex gap-1 text-sm">
          <span className="flex items-center">
            {nearbyLocationIcon}
            <span className="ml-[4px] text-[#005DA0] text-[12px] sm:text-[16px] xl:text-lg not-italic font-medium leading-[normal] text-nowrap">
              {distance ?? "N/A"}
            </span>
            <span className="mx-2">|</span>
            <span className="text-[#001F35] text-[12px] sm:text-[16px] xl:text-lg not-italic font-medium leading-[normal] text-nowrap">
              {time ?? "N/A"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
