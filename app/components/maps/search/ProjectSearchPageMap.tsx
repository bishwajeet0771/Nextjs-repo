/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
"use client";
import React, { Fragment, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import selectedSearchAtom, { selectedNearByAtom } from "@/app/store/search/map";
import TooltipProj from "./Tooltip";
import TooltipProp from "./ToolltipProp";
import { createCustomIconReactLeafLet, icons } from "@/app/data/map";
import { RecenterIcon } from "@/app/images/commonSvgs";

export const checkLatAndLang = (number: any) => {
  var invalidChars = ["e", "E", "W", "N", "S", "+", "°"];
  if (number === undefined && number === null && number === "") return;
  const finalNumber = number.toString();
  const isIncluded = invalidChars.some((each) => finalNumber.includes(each));
  if (isIncluded) {
    return finalNumber.replace(/[^0-9.]/g, "");
  } else {
    return finalNumber;
  }
};

const RecenterButton = ({}: { center?: any }) => {
  const [selected, setSelectedValue] = useAtom(selectedSearchAtom);
  const { allMarkerRefs } = useAtomValue(selectedNearByAtom);
  const map = useMap();
  const handleRecenter = () => {
    if (!selected?.reqId) return;
    setSelectedValue((prev) => ({
      ...prev,
      reqId: selected?.reqId,
      lat: selected?.lat,
      lang: selected?.lang,
      type: selected?.type,
      propType: selected?.propType,
    }));

    const position: any = [parseFloat(selected.lat), parseFloat(selected.lang)];

    map.setView(position, 100);

    if (!allMarkerRefs) return;
    const refKey = `${selected?.reqId}-${selected?.phaseId}-${
      selected?.propTypeName ? selected?.propTypeName : selected?.propType
    }`;

    const marker = allMarkerRefs.current.get(refKey);
    if (marker) marker.openPopup();
  };

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    isMobile && (
      <button
        onClick={(e: any) => {
          handleRecenter();
          e.stopPropagation();
        }}
        className="absolute top-[10px] right-[10px] cursor-pointer flex justify-center items-center z-[1000] !bg-black rounded-full shadow-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition p-[4px]"
      >
        <RecenterIcon />
      </button>
    )
  );
};

const Map = ({ data, lat, lang, type, styles }: any) => {
  const position: LatLngTuple = [lat, lang];
  return (
    <>
      <MapContainer
        center={position}
        className={
          styles
            ? styles
            : "h-[calc(100vh-75vh)] sm:h-[calc(78vh)] xl:h-[calc(100vh-24vh)] w-full max-w-full "
        }
        scrollWheelZoom
        zoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterButton center={position} />
        {/* @ts-ignore */}
        <MapContent data={data} type={type} />
      </MapContainer>
      {/* <polyline /> */}
    </>
  );
};

export default Map;

const MapContent = ({ data }: any): JSX.Element | null => {
  const MapIcon = L.icon({
    iconUrl: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/map-pointer.png`,
    iconSize: [60, 60],
    iconAnchor: [19, 38],
    popupAnchor: [10, -34],
  });

  const MobileIcon = L.icon({
    iconUrl: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/map-pointer.png`,
    iconSize: [50, 50],
    iconAnchor: [5, 38],
    popupAnchor: [20, -38],
  });

  const [selected, setSelectedValue] = useAtom(selectedSearchAtom);
  const [
    {
      selectedNearbyItem,
      allMarkerRefs,
      data: nearbyData,
      category,
    },
    setSelectedNearby,
  ] = useAtom(selectedNearByAtom);

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const map = useMap();

  // 🔹 Create unique refs for each marker
  const markerRefs = useRef(new window.Map());

  if (allMarkerRefs === null) {
    setSelectedNearby((prev: any) => ({ ...prev, allMarkerRefs: markerRefs }));
  }

  // 🔹 Event handlers for each marker
  const getEventHandlers = (itemId: string, item?: any) => ({
    mouseover: () => {
      const refKey = `${itemId}-${item.phaseId}-${
        item.propTypeName ? item.propTypeName : item.propType
      }`;
      const marker = markerRefs.current.get(refKey);
      if (marker) marker.openPopup();
    },
    mouseout: () => {
      if (itemId !== selected?.reqId) {
        const refKey = `${itemId}-${item.phaseId}-${
          item.propTypeName ? item.propTypeName : item.propType
        }`;
        const marker = markerRefs.current.get(refKey);
        if (marker) marker.closePopup();
      }
    },
    click: () => {
      if (selected?.reqId !== itemId && selected?.phaseId !== item?.phaseId) {
        setSelectedValue((prev) => ({
          ...prev,
          reqId: itemId,
          phaseId: item?.phaseId,
          lat: item?.lat,
          lang: item?.lang,
          projOrPropName: item?.propName ? item?.propName : item?.projName,
        }));
        const refKey = `${itemId}-${item.phaseId}-${
          item.propTypeName ? item.propTypeName : item.propType
        }`;
        const marker = markerRefs.current.get(refKey);
        if (marker) marker.openPopup();
      }
    },
  });

  useEffect(() => {
    // for Recenter Project marker
    if (selected && selected.projOrPropName && selected.lat && selected.lang) {
      const position: any = [
        parseFloat(selected.lat),
        parseFloat(selected.lang),
      ];
      map.setView(position, 100);
      const refKey = `${selected?.reqId}-${selected?.phaseId}-${
        selected?.propTypeName ? selected?.propTypeName : selected?.propType
      }`;

      const marker = markerRefs.current.get(refKey);
      if (marker && !isMobile) marker.openPopup();
    }
  }, [selected, map]);

  useEffect(() => {
    // for Recenter Nearby marker
    if (
      selectedNearbyItem &&
      selectedNearbyItem.lat &&
      selectedNearbyItem.lang
    ) {
      const position: any = [
        parseFloat(checkLatAndLang(selectedNearbyItem.lat)),
        parseFloat(checkLatAndLang(selectedNearbyItem.lang)),
      ];
      map.setView(position, 100);
    }
  }, [map, selectedNearbyItem]);

  useEffect(() => {
    if (
      data &&
      data?.length > 0 &&
      nearbyData &&
      Object.keys(nearbyData).length === 0 &&
      selected === null
    ) {
      const bounds = L.latLngBounds(
        data.map((item: any) => [parseFloat(item?.lat), parseFloat(item?.lang)])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, data, selected, nearbyData]);

  useEffect(() => {
    if (
      nearbyData &&
      Object.keys(nearbyData).length > 0 &&
      Object.keys(selectedNearbyItem).length === 0
    ) {
      const finalCateg =
        category !== "" ? category : Object.keys(nearbyData)[0];
      const nearByData = nearbyData[finalCateg];
      const newData =
        selected !== null ? [...nearByData, selected] : [...nearByData];
      const bounds = L.latLngBounds(
        newData.map((item: any) => [
          parseFloat(checkLatAndLang(item.lat)),
          parseFloat(checkLatAndLang(item.lang)),
        ])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, nearbyData, category, selectedNearbyItem, selected]);

  // useEffect(() => {
  //   if (map) {
  //     // Recenter Project Marker
  //     if (selected?.projOrPropName && selected.lat && selected.lang) {
  //       const position:any = [parseFloat(selected.lat), parseFloat(selected.lang)];
  //       map.setView(position, 100);
  //       markerRefs.current.get(selected.reqId)?.openPopup();
  //       return;
  //     }

  //     // Recenter Nearby Marker
  //     if (selectedNearbyItem?.lat && selectedNearbyItem?.lang) {
  //       const position:any = [
  //         parseFloat(checkLatAndLang(selectedNearbyItem.lat)),
  //         parseFloat(checkLatAndLang(selectedNearbyItem.lang)),
  //       ];
  //       map.setView(position, 100);
  //       return;
  //     }

  //     // Fit bounds for project data
  //     if (data?.length && nearbyData && Object.keys(nearbyData).length === 0 && !selected) {
  //       const bounds = L.latLngBounds(
  //         data.map((item:any) => [parseFloat(item.lat), parseFloat(item.lang)])
  //       );
  //       map.fitBounds(bounds, { padding: [50, 50] });
  //       return;
  //     }

  //     // Fit bounds for nearby data
  //     if (nearbyData && Object.keys(nearbyData).length > 0 && Object.keys(selectedNearbyItem).length === 0) {
  //       const finalCateg = category || Object.keys(nearbyData)[0];
  //       const nearByData = nearbyData[finalCateg] || [];
  //       const newData = selected ? [...nearByData, selected] : nearByData;
  //       const bounds = L.latLngBounds(
  //         newData.map((item:any) => [
  //           parseFloat(checkLatAndLang(item.lat)),
  //           parseFloat(checkLatAndLang(item.lang)),
  //         ])
  //       );
  //       map.fitBounds(bounds, { padding: [50, 50] });
  //     }
  //   }
  // }, [map, selected, selectedNearbyItem, data, nearbyData, category]);

  return (
    data &&
    data?.map((item: any, index: number) => {
      const isProp = !!item?.propIdEnc;
      const itemId = isProp ? item.propIdEnc : item.projIdEnc;
      // const itemPropType = isProp ? item?.propTypeName : item?.propType;

      if (
        (selected &&
          selected?.reqId === itemId &&
          ((selected?.phaseId === item.phaseId &&
            (selected?.propType === item.propType ||
              selected?.propType === item.propTypeName)) ||
            (selected?.phaseId === item.phaseId &&
              (!selected?.propType || !item.propType || !item.propTypeName)) ||
            !selected?.phaseId ||
            !item.phaseId ||
            !selected?.propType ||
            !item.propType ||
            !item.propTypeName)) ||
        selected === null
      ) {
        const phases = !isProp
          ? {
              [item.phaseName]: {
                phaseName: item.phaseName,
                propertyTypes: [
                  {
                    propType: item.propType,
                    minPrice: item.minPrice,
                    maxPrice: item.maxPrice,
                  },
                ],
              },
            }
          : null;

        const refKey = `${itemId}-${item.phaseId}-${
          item.propTypeName ? item.propTypeName : item.propType
        }`;

        return (
          <Fragment key={itemId + "proijMarkerTag" + index.toString()}>
            <Marker
              ref={(el) => {
                if (el) markerRefs.current.set(refKey, el);
              }}
              position={[
                parseFloat(item?.lat || 0),
                parseFloat(item?.lang || 0),
              ]}
              icon={isMobile ? MobileIcon : MapIcon}
              eventHandlers={getEventHandlers(itemId, item)}
            >
              <Popup>
                {!isProp ? (
                  <TooltipProj
                    data={{
                      projName: item.projName,
                      city: item.city,
                      state: item.state,
                      locality: item.locality,
                      postedByName: item.postedByName,
                      phases: Object.values(phases || {}),
                      coverUrl: item.coverUrl,
                      reqId: itemId,
                      type: isProp ? "prop" : "proj",
                    }}
                  />
                ) : (
                  <TooltipProp
                    data={{
                      ...item,
                      reqId: itemId,
                      type: isProp ? "prop" : "proj",
                    }}
                  />
                )}
              </Popup>
            </Marker>
            <NearbyMarkers />
          </Fragment>
        );
      }
    })
  );
};

const NearbyMarkers = ({}) => {
  const [{ category, data, selectedNearbyItem }, setSelectedLocation] =
    useAtom(selectedNearByAtom);

  const isMobile = useMediaQuery("(max-width: 601px)");
  // const map = useMap();

  useEffect(() => {
    if (Object.keys(selectedNearbyItem).length === 0) return;
    const handleClickOutside = (event: any) => {
      if (event.target.closest(".leaflet-container")) {
        setSelectedLocation((prev: any) => ({
          ...prev,
          selectedNearbyItem: {},
        }));
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setSelectedLocation]);

  if (!data || Object.keys(data).length === 0) return;
  const finalCategory = category !== "" ? category : Object.keys(data)[0];
  const selectedNearByData: any = data ? data[finalCategory] : "";
  const Icon: any = createCustomIconReactLeafLet(
    finalCategory as keyof typeof icons
  );

  return (
    selectedNearByData &&
    selectedNearByData.length > 0 &&
    selectedNearByData?.map((item: any, index: number) => {
      return (
        <Marker
          key={item?.lat + "markerTag" + index.toString()}
          position={[
            parseFloat(checkLatAndLang(item?.lat)),
            parseFloat(checkLatAndLang(item?.lang)),
          ]}
          title={item.name}
          icon={Icon}
          zIndexOffset={100}
          eventHandlers={{
            click: () =>
              setSelectedLocation((prev: any) => ({
                ...prev,
                selectedNearbyItem: {
                  lat: checkLatAndLang(item?.lat),
                  lang: checkLatAndLang(item?.lang),
                  name: item?.name,
                },
              })),
          }}
        >
          {!isMobile && (
            <Tooltip
              key={item.lat + "tooltipTag" + index.toString()}
              opacity={1}
              direction="top"
              permanent={selectedNearbyItem?.lat === item?.lat}
              className="min-w-fit z-50"
              offset={isMobile ? [6, -36] : [4, -36]}
            >
              <div className=" ">
                <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                  {item.name}
                </p>
              </div>
            </Tooltip>
          )}

          {selectedNearbyItem?.lat === item?.lat && (
            <Tooltip
              opacity={1}
              direction="top"
              permanent={selectedNearbyItem?.lat === item?.lat}
              key={item.lang + "tooltipTag2" + index.toString()}
              offset={isMobile ? [-7, -40] : [4, -36]}
              className=" min-w-[300px] max-w-[300px] sm:max-w-full text-wrap md:text-n break-words "
            >
              <p className="text-[#00487C] text-[12px] md:text-lg not-italic font-semibold leading-[normal] text-center w-full ">
                {item.name}
              </p>
            </Tooltip>
          )}
        </Marker>
      );
    })
  );
};
