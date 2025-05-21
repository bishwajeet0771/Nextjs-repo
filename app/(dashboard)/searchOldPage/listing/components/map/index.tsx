"use client";

import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  // Popup,
  Tooltip,
  // useMap,
} from "react-leaflet";
// import S from "@/app/styles/Share.module.css";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { LatLngTuple } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import * as L from "leaflet";
import { useMediaQuery } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import {
  // listingSearchAtom,
  mobileSearchPageMapModalReducerAtom,
} from "@/app/store/search/map";
import { BlueMobileMapIcon } from "@/app/data/map";
// import Link from "next/link";

const Map = ({ data }: any) => {
  const value = useAtomValue(mobileSearchPageMapModalReducerAtom);
  const position: LatLngTuple = [
    value?.content.lat || 0,
    value?.content.lang || 0,
  ];
  const MapIcon = L.icon({
    iconUrl: "/searchmarker.png",
    iconSize: [60, 60],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
  const MobileIcon = L.icon({
    iconUrl: "/searchmarker.png",
    iconSize: [30, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <MapContainer
        center={position}
        className="md:h-[740px] h-[400px] w-full "
        scrollWheelZoom
        zoom={10}
      >
        <TileLayer
          attribution='&copy; <Link rel="noopener noreferrer" prefetch={false} href="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[value.content.lat ?? 0, value?.content.lang ?? 0]}
          icon={isMobile ? MobileIcon : MapIcon}
        >
          <Tooltip
            opacity={1}
            permanent
            direction="top"
            offset={[10, -35]}
            className="!bg-transparent !border-none !outline-none"
          >
            <div className=" rounded-2xl">
              <p className="text-[#001F35]  text-[12px] md:text-[15px] not-italic font-bold !m-0">
                3BHK Apartment for Sale <br />{" "}
                <span className="text-[#148B16] text-[14px] md:text-base not-italic font-bold">
                  in Kadugodi, ₹ 2.36 Cr
                </span>
              </p>

              <p className="text-gray-700 text-[12px] md:text-sm not-italic font-semibold">
                Devasthanagalu, Varthur, Karnataka 560087
              </p>

              <p>
                <span />
              </p>
            </div>
          </Tooltip>
          {data &&
            data?.map((item: any) => {
              return (
                <Marker
                  key={item?.lat}
                  position={[parseFloat(item?.lat), parseFloat(item?.lang)]}
                  title={item.name}
                  {...(isMobile && { icon: BlueMobileMapIcon })}
                  zIndexOffset={100}
                >
                  {/* {selectedLocation?.lat === item?.lat && ( */}
                  <Tooltip
                    key={item.lat}
                    opacity={1}
                    direction="top"
                    className="min-w-fit z-50"
                    offset={[-16, -16]}
                  >
                    <div className=" ">
                      <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                        {item.name}
                      </p>
                    </div>
                  </Tooltip>

                  {/* )} */}

                  {/* <Popup className="min-w-fit">
                <p className="text-[#00487C] text-xs sm:text-[17px] italic font-medium leading-[normal]">
                  {item.name}
                </p>
              </Popup> */}
                </Marker>
              );
            })}
        </Marker>
      </MapContainer>
      <polyline />
    </>
  );
};

export default Map;
