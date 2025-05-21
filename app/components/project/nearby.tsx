// "use client";
// import React, { useState, useCallback, useRef } from "react";
// import { LuTrain, LuSearch } from "react-icons/lu";
// import { Text, Tabs, TextInput, Loader, ScrollArea } from "@mantine/core";

// import {
//   GoogleMap,
//   Marker,
//   useJsApiLoader,
//   useGoogleMap,
//   DirectionsRenderer,
//   InfoWindow,
//   DirectionsService,
// } from "@react-google-maps/api";
// import { clsx } from "clsx";
// import axios from "axios";
// import { useQuery } from "react-query";
// import { IoLocationSharp } from "react-icons/io5";
// import Loading from "../atoms/Loader";
// import {
//   Coordinates,
//   calculateDistance,
//   calculateTime,
// } from "@/app/utils/maps";
// import { useDebouncedState } from "@mantine/hooks";
// import { nearbyLocationIcon } from "@/app/images/commonSvgs";

// interface Area {
//   name: string;
//   Icon?: any;
//   lat?: number;
//   lng?: number;
//   projName?: string;
// }

// const Nearby: React.FC<{ lat: string; lang: string; projName: string }> = ({
//   lat,
//   lang,
//   projName,
// }) => {
//   const origin = { lat: parseFloat(lat), lng: parseFloat(lang) };
//   const [directionsResponse, setDirectionsResponse] = useState<any | null>(
//     null
//   );
//   const [selected, setSelected] = useState<string>("commute");
//   const [selectedLocation, setSelectedLocation] = useState<{
//     lat: number;
//     lng: number;
//     name?: string;
//   }>();
//   const [selectedTravelMode, setSelectedTravelMode] =
//     useState<string>("TRANSIT");
//   const [map, setMap] = useState<any | null>(null);

//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!!,
//   });

//   const onLoad = useCallback((map: any) => {
//     setMap(map);
//   }, []);

//   const onUnmount = useCallback(() => {
//     setMap(null);
//   }, []);

//   const mapContainerStyle: React.CSSProperties = {
//     width: "100%",
//     height: "100%",
//   };
//   // console.log(selectedLocation);

//   const showLocationOnMap = useCallback(
//     (location: { position: { lat: number; lng: number }; name: string }) => {
//       setSelectedLocation({
//         lat: location.position.lat,
//         lng: location.position.lng,
//         name: location.name,
//       });
//       calculateRoute(location);
//     },
//     [map, selectedLocation, selectedTravelMode, selected]
//   );
//   async function calculateRoute(location: {
//     position: { lat: number; lng: number };
//     name: string;
//   }) {
//     if ((!map && !selectedLocation) || !selectedTravelMode) return;
//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: {
//           lat: parseFloat(lat),
//           lng: parseFloat(lang),
//         }, // Default center
//         destination: {
//           lat: location?.position?.lat ?? 0,
//           lng: location.position?.lng ?? 0,
//         },
//         // @ts-ignore
//         travelMode: selectedTravelMode,
//       },
//       (result, status) => {
//         console.log(result);
//         if (status === "OK" && result) {
//           console.log("Directions response:", result);
//           setDirectionsResponse(result);
//         } else {
//           console.error(`Directions request failed: ${status}`);
//         }
//       }
//     );
//   }

//   const fetchNearbyPlaces = async () => {
//     const response = await fetch(
//       `/api/hello?lt=${parseFloat(lat)}&lng=${parseFloat(
//         lang
//       )}&type=${selected}&travelType=${selectedTravelMode}`
//       // {
//       //   cache: "force-cache",
//       // }
//     );
//     return await response.json();
//   };

//   const { data, isLoading } = useQuery({
//     queryKey: ["nearbyPlaces" + selected + selectedTravelMode],
//     queryFn: fetchNearbyPlaces,
//   });
//   const handleLocationListClick = (type: string) => {
//     setSelectedTravelMode(type);
//   };

//   return (
//     <div
//       className="w-[90%] scroll-mt-[90px] mx-auto mt-[5%] mb-[5%] "
//       id="nearBy"
//     >
//       <h2 className="text-[24px] lg:text-[32px] font-semibold mb-[12px]">
//         <span className="!text-green-600">{projName} </span>
//         <span className="">Near BY LOCATIONS</span>
//       </h2>
//       <p className="text-[#4D6677] text-2xl italic font-medium leading-[normal] tracking-[0.96px] mt-2 mb-8  ">
//         Explore near by convenient amenities, entertainment, and essential
//         services
//       </p>

//       <div className="flex gap-6 mb-5 mt-1 w-full flex-wrap ">
//         {areas.map((area) => {
//           return (
//             <button
//               onClick={() => {
//                 setSelected(area.name);
//                 setDirectionsResponse(null);
//               }}
//               className={clsx(
//                 "text-[#4D6677] text-xl not-italic font-medium flex items-center gap-[5px] leading-[normal] capitalize",
//                 selected === area.name && "!text-green-600 font-semibold"
//               )}
//               key={area.name}
//             >
//               {area.Icon} {area.name}
//             </button>
//           );
//         })}
//       </div>

//       <div className="border border-[#92B2C8] grid grid-cols-1 md:grid-cols-[2fr_3fr] rounded-xl overflow-hidden shadow-lg md:h-[620px]">
//         <section className="bg-white">
//           <div id="tabs">
//             <Tabs defaultValue="public">
//               <div className="bg-blue-50 px-5 py-4">
//                 <p className="text-[#001F35] text-[22px]  font-medium leading-[normal]">
//                   Select how you want to travel
//                 </p>
//                 <Tabs.List>
//                   <Tabs.Tab
//                     className={`  not-italic leading-[normal] no-underline capitalize ${
//                       selectedTravelMode == "TRANSIT"
//                         ? "!text-[#148B16] font-[700] underline"
//                         : "!text-[#737579] no-underline font-[500]"
//                     } `}
//                     value="public"
//                     onClick={() => setSelectedTravelMode("TRANSIT")}
//                   >
//                     Public Transport
//                   </Tabs.Tab>
//                   <Tabs.Tab
//                     className={`  not-italic leading-[normal] no-underline capitalize ${
//                       selectedTravelMode == "DRIVING"
//                         ? "!text-[#148B16] font-[700] underline"
//                         : "!text-[#737579] no-underline font-[500]"
//                     } `}
//                     value="drive"
//                     onClick={() => setSelectedTravelMode("DRIVING")}
//                   >
//                     Drive
//                   </Tabs.Tab>
//                   <Tabs.Tab
//                     className={`  not-italic leading-[normal] no-underline capitalize ${
//                       selectedTravelMode == "WALKING"
//                         ? "!text-[#148B16] font-[700] underline"
//                         : "!text-[#737579] no-underline font-[500]"
//                     } `}
//                     value="walk"
//                     onClick={() => setSelectedTravelMode("WALKING")}
//                   >
//                     Walk
//                   </Tabs.Tab>
//                 </Tabs.List>
//               </div>

//               <div className="px-4 pb-3">
//                 {/* Search Section */}
//                 <SearchSection setSelectedLocation={showLocationOnMap} />

//                 <Tabs.Panel value="public">
//                   <div id="location-listing" className="grid gap-2 h-auto ">
//                     {isLoading ? (
//                       <Loading />
//                     ) : (
//                       <ScrollArea h={"auto"} mah={400}>
//                         {data && Object.values(data).length > 0 ? (
//                           Object.values(data).map(
//                             (location: any, index: number) => (
//                               <LocationList
//                                 type="public"
//                                 {...location}
//                                 key={index}
//                                 lat={lat}
//                                 lng={lang}
//                                 onClick={setSelectedLocation}
//                                 setDirection={showLocationOnMap}
//                                 onChangeTravelMode={handleLocationListClick}
//                                 showLocationOnMap={showLocationOnMap}
//                               />
//                             )
//                           )
//                         ) : (
//                           <p>No locations found.</p>
//                         )}
//                       </ScrollArea>
//                     )}
//                   </div>
//                 </Tabs.Panel>
//                 <Tabs.Panel value="drive">
//                   <div id="location-listing" className="grid gap-2 ">
//                     {isLoading ? (
//                       <Loading />
//                     ) : (
//                       <ScrollArea h={"auto"} mah={400}>
//                         {data && Object.values(data).length > 0 ? (
//                           Object.values(data).map(
//                             (location: any, index: number) => (
//                               <LocationList
//                                 type="public"
//                                 {...location}
//                                 key={index}
//                                 lat={lat}
//                                 lng={lang}
//                                 onClick={setSelectedLocation}
//                                 setDirection={showLocationOnMap}
//                                 onChangeTravelMode={handleLocationListClick}
//                                 showLocationOnMap={showLocationOnMap}
//                               />
//                             )
//                           )
//                         ) : (
//                           <p>No locations found.</p>
//                         )}
//                       </ScrollArea>
//                     )}
//                   </div>
//                 </Tabs.Panel>
//                 <Tabs.Panel value="walk">
//                   <div id="location-listing" className="grid gap-2">
//                     {isLoading ? (
//                       <Loading />
//                     ) : (
//                       <ScrollArea h={"auto"} mah={400}>
//                         {data && Object.values(data).length > 0 ? (
//                           Object.values(data).map(
//                             (location: any, index: number) => (
//                               <LocationList
//                                 type="public"
//                                 {...location}
//                                 key={index}
//                                 lat={lat}
//                                 lng={lang}
//                                 onClick={setSelectedLocation}
//                                 setDirection={showLocationOnMap}
//                                 onChangeTravelMode={handleLocationListClick}
//                                 showLocationOnMap={showLocationOnMap}
//                               />
//                             )
//                           )
//                         ) : (
//                           <p>No locations found.</p>
//                         )}
//                       </ScrollArea>
//                     )}
//                   </div>
//                 </Tabs.Panel>
//               </div>
//             </Tabs>
//           </div>
//         </section>
//         <section>
//           {isLoaded && (
//             <GoogleMap
//               key={selectedTravelMode}
//               mapContainerStyle={mapContainerStyle}
//               center={origin}
//               zoom={15}
//               onLoad={onLoad}
//               onUnmount={onUnmount}
//             >
//               {origin && !directionsResponse && (
//                 <div className="relative">
//                   <Marker
//                     position={origin}
//                     icon={{
//                       url: "/mapIcon.svg",
//                     }}
//                   >
//                     <InfoWindow position={origin}>
//                       <div className=" ">
//                         <p className="text-[#00487C] text-[10px] italic font-medium leading-[normal]">
//                           Project you are exploring
//                         </p>
//                         <p className="text-[#006A02] text-sm not-italic font-semibold leading-[normal]">
//                           {projName}
//                         </p>
//                       </div>
//                     </InfoWindow>
//                   </Marker>
//                   {data && Object.values(data).length > 0 && (
//                     <>
//                       {Object.values(data).map((item: any, index: any) => (
//                         <Marker
//                           key={index}
//                           position={{
//                             lat: item?.geometry?.location?.lat,
//                             lng: item?.geometry?.location?.lng,
//                           }}
//                         />
//                       ))}
//                     </>
//                   )}
//                 </div>
//               )}
//               {directionsResponse && (
//                 <>
//                   <DirectionsRenderer
//                     options={{
//                       directions: directionsResponse,
//                     }}
//                   />
//                   <InfoWindow
//                     position={
//                       directionsResponse.routes[0].legs[0].start_location
//                     }
//                     // onCloseClick={() => setInfoWindowPosition(null)}
//                   >
//                     <div className=" ">
//                       <p className="text-[#00487C] text-[15px] italic font-medium leading-[normal]">
//                         Project you are exploring
//                       </p>
//                       <p className="text-[#006A02] text-sm not-italic font-semibold leading-[normal]">
//                         {projName}
//                       </p>
//                     </div>
//                   </InfoWindow>
//                   <InfoWindow
//                     position={directionsResponse.routes[0].legs[0].end_location}
//                   >
//                     <p className="text-[#00487C] text-[17px] italic font-medium leading-[normal]">
//                       {selectedLocation?.name}
//                     </p>
//                   </InfoWindow>
//                 </>
//               )}
//             </GoogleMap>
//           )}
//         </section>
//       </div>
//       {data && Object.values(data).length > 0 && (
//         <div className="mt-8 ">
//           <h1 className="text-[#303030] text-xl not-italic font-medium leading-[normal] tracking-[0.8px] capitalize">
//             {selected} Nearby
//           </h1>
//           <div className="flex gap-2 mt-3 flex-wrap">
//             {Object.values(data).map((item: any, index: any) => (
//               <MapCard
//                 key={index}
//                 {...item}
//                 showLocationOnMap={showLocationOnMap}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Nearby;

// const MapCard = ({
//   name,
//   distance,
//   showLocationOnMap,
//   geometry,
//   duration,
// }: any) => {
//   return (
//     <div
//       className="flex flex-col items-start gap-3 px-2 py-3.5 cursor-pointer shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[10px] border-[0.5px] border-solid border-[#D9D9D9] bg-[#fcfcfc] min-w-[385px] max-w-[385px]"
//       onClick={() =>
//         showLocationOnMap({
//           position: { lat: geometry.location.lat, lng: geometry.location.lng },
//           name: name,
//         })
//       }
//     >
//       <div className="">
//         <p className="text-black text-base not-italic font-medium leading-[normal] capitalize">
//           {name}
//         </p>
//         <div className="flex gap-1 text-sm mt-[14px]">
//           <span className="flex items-center min-w-[70px]">
//             {nearbyLocationIcon}
//             <span className="ml-[4px] text-[#005DA0] text-base not-italic font-medium leading-[normal] ]">
//               {distance?.text ?? "N/A"}
//             </span>{" "}
//             <span className=" px-2 text-black text-base not-italic font-medium leading-[normal] capitalize">
//               |
//             </span>
//             <span className="text-black text-base not-italic font-medium leading-[normal] capitalize">
//               {duration?.text ?? "N/A"}
//             </span>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LocationList: React.FC<{
//   name: string;
//   geometry: Coordinates;
//   vicinity: string;
//   lat: number;
//   lng: number;
//   type: "public" | "drive" | "walk";
//   onClick: (location: any) => void;
//   onChangeTravelMode: (mode: string) => void; // New prop for changing travel mode
//   showLocationOnMap: (location: any) => void;
//   distance: any;
//   duration: any;
// }> = ({ name, geometry, vicinity, distance, duration, showLocationOnMap }) => {
//   const handleClick = () => {
//     showLocationOnMap({
//       position: {
//         lat: geometry.location.lat,
//         lng: geometry.location.lng,
//       },
//       name,
//     });
//   };

//   return (
//     <div
//       className="p-2 bg-gray-50 border rounded-lg cursor-pointer mt-[12px] max-w-[640px]"
//       onClick={handleClick}
//     >
//       <div className="flex items-center justify-between">
//         <h6 className="text-black text-lg not-italic font-medium leading-[normal] capitalize">
//           {name}
//         </h6>
//         <div className="flex gap-1 text-sm">
//           <span className="flex items-center">
//             {nearbyLocationIcon}
//             <span className="ml-[4px] text-[#005DA0] text-lg not-italic font-medium leading-[normal] ">
//               {distance?.text ?? "N/A"}
//             </span>
//           </span>
//           <span>|</span>
//           <span className="text-[#001F35] text-lg not-italic font-medium leading-[normal]">
//             {duration?.text ?? "N/A"}
//           </span>
//         </div>
//       </div>
//       <p className="flex items-center gap-1 text-[#565D70] text-lg not-italic font-normal leading-[normal] lowercase">
//         <LuTrain size={15} />
//         Via public transport
//       </p>
//       <p className="text-gray-600 mt-1">{vicinity}</p>
//     </div>
//   );
// };

// const SearchSection = ({ setSelectedLocation }: any) => {
//   const getSearchResults = async (input: string) => {
//     const res = await axios.get(`/api/googlesearch?input=${input}`);
//     return res.data;
//   };
//   const [value, setValue] = useDebouncedState("", 500);
//   const { data, isLoading } = useQuery({
//     queryKey: ["search", value],
//     queryFn: () => getSearchResults(value),
//     enabled: !!value,
//   });
//   // console.log(data);
//   const handleSearchClick = async (id: number, name: string) => {
//     const res = await axios.get(`/api/latlong?id=${id}`);
//     setSelectedLocation({
//       position: {
//         lat: res.data.location.lat,
//         lng: res.data.location.lng,
//       },
//       name: name,
//     });
//     setValue("");
//   };
//   return (
//     <div id="search" className="my-4">
//       <p className="text-[#212C33] text-lg not-italic font-medium leading-[normal] mb-1">
//         Add a location to calculate your travel time
//       </p>
//       <TextInput
//         size="sm"
//         leftSection={<LuSearch />}
//         placeholder="Enter location"
//         onChange={(e) => setValue(e.target.value)}
//       />
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <>
//           <div className="mt-2">
//             {data?.autocompleteRes?.predictions?.map(
//               (result: any, index: number) => {
//                 console.log(result);
//                 return (
//                   <div
//                     key={index}
//                     className="flex items-center my-1 cursor-pointer"
//                     onClick={() =>
//                       handleSearchClick(
//                         result.place_id,
//                         result.structured_formatting.main_text
//                       )
//                     }
//                   >
//                     <IoLocationSharp className="text-gray-500" />
//                     <span className="ml-2">{result.description}</span>
//                   </div>
//                 );
//               }
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// //stroke="#148B16" for selected

// export const areas: Area[] = [
//   {
//     name: "commute",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="34"
//         height="34"
//         viewBox="0 0 34 34"
//         fill="none"
//       >
//         <path
//           d="M11.3337 9.9169V9.93107M22.667 21.2502V21.2644M15.34 13.9232C16.1327 13.1308 16.6725 12.1211 16.8913 11.0218C17.1101 9.92256 16.998 8.78309 16.5691 7.74755C16.1403 6.712 15.414 5.82688 14.4821 5.20415C13.5502 4.58141 12.4545 4.24902 11.3337 4.24902C10.2128 4.24902 9.11717 4.58141 8.18525 5.20415C7.25334 5.82688 6.52703 6.712 6.09818 7.74755C5.66933 8.78309 5.55722 9.92256 5.776 11.0218C5.99479 12.1211 6.53466 13.1308 7.32733 13.9232L11.3337 17.931L15.34 13.9232ZM26.6733 25.2566C27.466 24.4641 28.0059 23.4544 28.2247 22.3552C28.4434 21.2559 28.3313 20.1164 27.9025 19.0809C27.4736 18.0453 26.7473 17.1602 25.8154 16.5375C24.8835 15.9147 23.7878 15.5824 22.667 15.5824C21.5462 15.5824 20.4505 15.9147 19.5186 16.5375C18.5867 17.1602 17.8604 18.0453 17.4315 19.0809C17.0027 20.1164 16.8905 21.2559 17.1093 22.3552C17.3281 23.4544 17.868 24.4641 18.6607 25.2566L22.667 29.2643L26.6733 25.2566Z"
//           stroke="#4D6677"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "Train",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <g clipPath="url(#clip0_2966_54674)">
//           <path
//             d="M4.5 15H11.5M10.5 14L12 15.5M5.5 14L4 15.5M10.75 2H10C10 1.86739 9.94732 1.74021 9.85355 1.64645C9.75979 1.55268 9.63261 1.5 9.5 1.5H6.5C6.36739 1.5 6.24021 1.55268 6.14645 1.64645C6.05268 1.74021 6 1.86739 6 2H5.25C4.78628 2.00132 4.34192 2.18612 4.01402 2.51402C3.68612 2.84192 3.50132 3.28628 3.5 3.75V11.4688C3.5 12.5719 8 13.5 8 13.5C8 13.5 12.5 12.5719 12.5 11.4688V3.75C12.5 3.28587 12.3156 2.84075 11.9874 2.51256C11.6592 2.18437 11.2141 2 10.75 2ZM8 11.5C7.70333 11.5 7.41332 11.412 7.16664 11.2472C6.91997 11.0824 6.72771 10.8481 6.61418 10.574C6.50065 10.2999 6.47094 9.99834 6.52882 9.70736C6.5867 9.41639 6.72956 9.14912 6.93934 8.93934C7.14912 8.72956 7.41639 8.5867 7.70736 8.52882C7.99834 8.47094 8.29994 8.50065 8.57403 8.61418C8.84811 8.72771 9.08238 8.91997 9.2472 9.16665C9.41203 9.41332 9.5 9.70333 9.5 10C9.5 10.3978 9.34196 10.7794 9.06066 11.0607C8.77936 11.342 8.39782 11.5 8 11.5ZM11 6.5C11 6.63261 10.9473 6.75979 10.8536 6.85355C10.7598 6.94732 10.6326 7 10.5 7H5.5C5.36739 7 5.24021 6.94732 5.14645 6.85355C5.05268 6.75979 5 6.63261 5 6.5V4.5C5 4.36739 5.05268 4.24021 5.14645 4.14645C5.24021 4.05268 5.36739 4 5.5 4H10.5C10.6326 4 10.7598 4.05268 10.8536 4.14645C10.9473 4.24021 11 4.36739 11 4.5V6.5Z"
//             stroke="#4D6677"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </g>
//         <defs>
//           <clipPath id="clip0_2966_54674">
//             <rect
//               width="16"
//               height="16"
//               fill="white"
//               transform="translate(0 0.5)"
//             />
//           </clipPath>
//         </defs>
//       </svg>
//     ),
//   },
//   {
//     name: "Bus",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <path
//           d="M11.5 2.5H4.5C3.96957 2.5 3.46086 2.71071 3.08579 3.08579C2.71071 3.46086 2.5 3.96957 2.5 4.5V13.5C2.5 13.7652 2.60536 14.0196 2.79289 14.2071C2.98043 14.3946 3.23478 14.5 3.5 14.5H5C5.26522 14.5 5.51957 14.3946 5.70711 14.2071C5.89464 14.0196 6 13.7652 6 13.5V12.5H10V13.5C10 13.7652 10.1054 14.0196 10.2929 14.2071C10.4804 14.3946 10.7348 14.5 11 14.5H12.5C12.7652 14.5 13.0196 14.3946 13.2071 14.2071C13.3946 14.0196 13.5 13.7652 13.5 13.5V4.5C13.5 3.96957 13.2893 3.46086 12.9142 3.08579C12.5391 2.71071 12.0304 2.5 11.5 2.5ZM3.5 11.5V8H12.5V11.5H3.5ZM3.5 5.5H12.5V7H3.5V5.5ZM4.5 3.5H11.5C11.7652 3.5 12.0196 3.60536 12.2071 3.79289C12.3946 3.98043 12.5 4.23478 12.5 4.5H3.5C3.5 4.23478 3.60536 3.98043 3.79289 3.79289C3.98043 3.60536 4.23478 3.5 4.5 3.5ZM5 13.5H3.5V12.5H5V13.5ZM11 13.5V12.5H12.5V13.5H11ZM6.5 9.75C6.5 9.89834 6.45601 10.0433 6.3736 10.1667C6.29119 10.29 6.17406 10.3861 6.03701 10.4429C5.89997 10.4997 5.74917 10.5145 5.60368 10.4856C5.4582 10.4567 5.32456 10.3852 5.21967 10.2803C5.11478 10.1754 5.04335 10.0418 5.01441 9.89632C4.98547 9.75083 5.00032 9.60003 5.05709 9.46299C5.11386 9.32594 5.20999 9.20881 5.33332 9.1264C5.45666 9.04399 5.60166 9 5.75 9C5.94891 9 6.13968 9.07902 6.28033 9.21967C6.42098 9.36032 6.5 9.55109 6.5 9.75ZM11 9.75C11 9.89834 10.956 10.0433 10.8736 10.1667C10.7912 10.29 10.6741 10.3861 10.537 10.4429C10.4 10.4997 10.2492 10.5145 10.1037 10.4856C9.9582 10.4567 9.82456 10.3852 9.71967 10.2803C9.61478 10.1754 9.54335 10.0418 9.51441 9.89632C9.48547 9.75083 9.50033 9.60003 9.55709 9.46299C9.61386 9.32594 9.70999 9.20881 9.83332 9.1264C9.95666 9.04399 10.1017 9 10.25 9C10.4489 9 10.6397 9.07902 10.7803 9.21967C10.921 9.36032 11 9.55109 11 9.75ZM15.5 5.5V7C15.5 7.13261 15.4473 7.25979 15.3536 7.35355C15.2598 7.44732 15.1326 7.5 15 7.5C14.8674 7.5 14.7402 7.44732 14.6464 7.35355C14.5527 7.25979 14.5 7.13261 14.5 7V5.5C14.5 5.36739 14.5527 5.24021 14.6464 5.14645C14.7402 5.05268 14.8674 5 15 5C15.1326 5 15.2598 5.05268 15.3536 5.14645C15.4473 5.24021 15.5 5.36739 15.5 5.5ZM1.5 5.5V7C1.5 7.13261 1.44732 7.25979 1.35355 7.35355C1.25979 7.44732 1.13261 7.5 1 7.5C0.867392 7.5 0.740215 7.44732 0.646447 7.35355C0.552678 7.25979 0.5 7.13261 0.5 7V5.5C0.5 5.36739 0.552678 5.24021 0.646447 5.14645C0.740215 5.05268 0.867392 5 1 5C1.13261 5 1.25979 5.05268 1.35355 5.14645C1.44732 5.24021 1.5 5.36739 1.5 5.5Z"
//           fill="#4D6677"
//         />
//       </svg>
//     ),
//   },

//   {
//     name: "Hospital",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <path
//           d="M10.5 5.5H8.5V3.5H7.5V5.5H5.5V6.5H7.5V8.5H8.5V6.5H10.5V5.5Z"
//           fill="#4D6677"
//         />
//         <path
//           d="M14 5.5H13V2.5C12.9997 2.23486 12.8943 1.98066 12.7068 1.79319C12.5193 1.60571 12.2651 1.50026 12 1.5H4C3.73486 1.50026 3.48066 1.60571 3.29319 1.79319C3.10571 1.98066 3.00026 2.23486 3 2.5V5.5H2C1.73486 5.50026 1.48066 5.60571 1.29319 5.79319C1.10571 5.98066 1.00026 6.23486 1 6.5V15.5H15V6.5C14.9997 6.23486 14.8943 5.98066 14.7068 5.79319C14.5193 5.60571 14.2651 5.50026 14 5.5ZM7 14.5V11.5H9V14.5H7ZM10 14.5V11C10 10.8674 9.94732 10.7402 9.85355 10.6464C9.75979 10.5527 9.63261 10.5 9.5 10.5H6.5C6.36739 10.5 6.24021 10.5527 6.14645 10.6464C6.05268 10.7402 6 10.8674 6 11V14.5H2V6.5H4V2.5H12V6.5H14V14.5H10Z"
//           fill="#4D6677"
//         />
//       </svg>
//     ),
//   },

//   {
//     name: "School",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <g clipPath="url(#clip0_2966_54687)">
//           <path
//             d="M8 5.3L12.2667 7.43333V15.9667H3.73333V7.43333L8 5.3ZM8 5.3V0.5M0 15.9667H16M1.6 15.9667V9.56667H3.73333M14.4 15.9667V9.56667H12.2667M6.93333 15.9667V12.7667H9.06667V15.9667M8 1.03333H11.2V3.16667H8M8 10.6333C7.7171 10.6333 7.44579 10.521 7.24575 10.3209C7.04571 10.1209 6.93333 9.84956 6.93333 9.56667C6.93333 9.28377 7.04571 9.01246 7.24575 8.81242C7.44579 8.61238 7.7171 8.5 8 8.5C8.2829 8.5 8.55421 8.61238 8.75425 8.81242C8.95429 9.01246 9.06667 9.28377 9.06667 9.56667C9.06667 9.84956 8.95429 10.1209 8.75425 10.3209C8.55421 10.521 8.2829 10.6333 8 10.6333Z"
//             stroke="#4D6677"
//             strokeWidth="2"
//           />
//         </g>
//         <defs>
//           <clipPath id="clip0_2966_54687">
//             <rect
//               width="16"
//               height="16"
//               fill="white"
//               transform="translate(0 0.5)"
//             />
//           </clipPath>
//         </defs>
//       </svg>
//     ),
//   },

//   {
//     name: "Market",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <path
//           d="M14.544 6.74267L13.4147 2.79C13.3908 2.70643 13.3403 2.63292 13.2709 2.5806C13.2015 2.52827 13.117 2.49998 13.03 2.5H10.332L10.6487 6.30267C10.6535 6.36381 10.6728 6.42293 10.705 6.47511C10.7373 6.52729 10.7815 6.57102 10.834 6.60267C11.094 6.758 11.602 7.04467 11.9987 7.16667C12.676 7.37533 13.6654 7.3 14.2294 7.23067C14.2842 7.22358 14.3368 7.20461 14.3836 7.17509C14.4303 7.14556 14.47 7.1062 14.5 7.05973C14.53 7.01327 14.5494 6.96082 14.557 6.90606C14.5646 6.8513 14.5602 6.79554 14.544 6.74267Z"
//           stroke="#4D6677"
//           strokeWidth="2"
//         />
//         <path
//           d="M9.3332 7.16667C9.71187 7.05 10.1919 6.784 10.4599 6.62533C10.5223 6.58815 10.573 6.53405 10.6061 6.46929C10.6391 6.40452 10.6531 6.33174 10.6465 6.25933L10.3332 2.5H5.66654L5.3532 6.25933C5.34649 6.33184 5.36046 6.40477 5.3935 6.46967C5.42654 6.53456 5.47729 6.58877 5.53987 6.626C5.80787 6.784 6.28787 7.05 6.66654 7.16667C7.66187 7.47333 8.33787 7.47333 9.3332 7.16667Z"
//           stroke="#4D6677"
//           strokeWidth="2"
//         />
//         <path
//           d="M2.58306 2.79L1.45372 6.74333C1.43778 6.79612 1.43352 6.85174 1.44124 6.90634C1.44895 6.96094 1.46845 7.01321 1.49839 7.05951C1.52833 7.10582 1.56799 7.14505 1.61462 7.17449C1.66124 7.20393 1.71371 7.22287 1.76839 7.23C2.33173 7.3 3.32173 7.37467 3.99906 7.16667C4.39573 7.04467 4.90439 6.758 5.16373 6.60333C5.21635 6.57162 5.26063 6.52779 5.29287 6.47548C5.32511 6.42318 5.34437 6.36393 5.34906 6.30267L5.66573 2.5H2.96773C2.88081 2.49998 2.79625 2.52827 2.72684 2.5806C2.65743 2.63292 2.60696 2.70643 2.58306 2.79Z"
//           stroke="#4D6677"
//           strokeWidth="2"
//         />
//         <path
//           d="M2 7.1665V13.1665C2 13.5201 2.14048 13.8593 2.39052 14.1093C2.64057 14.3594 2.97971 14.4998 3.33333 14.4998H12.6667C13.0203 14.4998 13.3594 14.3594 13.6095 14.1093C13.8595 13.8593 14 13.5201 14 13.1665V7.1665"
//           stroke="#4D6677"
//           strokeWidth="2"
//         />
//       </svg>
//     ),
//   },

//   {
//     name: "Restaurant",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <path
//           d="M3.5 1.5C3.63261 1.5 3.75979 1.55268 3.85355 1.64645C3.94732 1.74021 4 1.86739 4 2V5C3.99984 5.31033 4.09593 5.61306 4.27503 5.86649C4.45413 6.11992 4.70742 6.31156 5 6.415V2C5 1.86739 5.05268 1.74021 5.14645 1.64645C5.24021 1.55268 5.36739 1.5 5.5 1.5C5.63261 1.5 5.75979 1.55268 5.85355 1.64645C5.94732 1.74021 6 1.86739 6 2V6.415C6.29258 6.31156 6.54587 6.11992 6.72497 5.86649C6.90407 5.61306 7.00016 5.31033 7 5V2C7 1.86739 7.05268 1.74021 7.14645 1.64645C7.24021 1.55268 7.36739 1.5 7.5 1.5C7.63261 1.5 7.75979 1.55268 7.85355 1.64645C7.94732 1.74021 8 1.86739 8 2V5C8.00012 5.57633 7.80111 6.13499 7.43665 6.58145C7.0722 7.02791 6.56468 7.33473 6 7.45V15C6 15.1326 5.94732 15.2598 5.85355 15.3536C5.75979 15.4473 5.63261 15.5 5.5 15.5C5.36739 15.5 5.24021 15.4473 5.14645 15.3536C5.05268 15.2598 5 15.1326 5 15V7.45C4.43532 7.33473 3.9278 7.02791 3.56335 6.58145C3.19889 6.13499 2.99988 5.57633 3 5V2C3 1.86739 3.05268 1.74021 3.14645 1.64645C3.24021 1.55268 3.36739 1.5 3.5 1.5ZM10.479 2.979C10.638 2.819 10.817 2.696 11 2.615V7.5H10V4C10 3.663 10.174 3.283 10.479 2.979ZM11 8.5V15C11 15.1326 11.0527 15.2598 11.1464 15.3536C11.2402 15.4473 11.3674 15.5 11.5 15.5C11.6326 15.5 11.7598 15.4473 11.8536 15.3536C11.9473 15.2598 12 15.1326 12 15V2C12 1.86739 11.9473 1.74021 11.8536 1.64645C11.7598 1.55268 11.6326 1.5 11.5 1.5C10.837 1.5 10.217 1.826 9.771 2.271C9.326 2.717 9 3.337 9 4V8C9 8.13261 9.05268 8.25979 9.14645 8.35355C9.24021 8.44732 9.36739 8.5 9.5 8.5H11Z"
//           fill="#4D6677"
//         />
//       </svg>
//     ),
//   },

//   {
//     name: "Bank",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <path
//           d="M4.33203 7.1665H2.9987V11.8332H4.33203V7.1665ZM8.33203 7.1665H6.9987V11.8332H8.33203V7.1665ZM13.9987 13.1665H1.33203V14.4998H13.9987V13.1665ZM12.332 7.1665H10.9987V11.8332H12.332V7.1665ZM7.66536 2.67317L11.1387 4.49984H4.19203L7.66536 2.67317ZM7.66536 1.1665L1.33203 4.49984V5.83317H13.9987V4.49984L7.66536 1.1665Z"
//           fill="#4D6677"
//         />
//       </svg>
//     ),
//   },

//   {
//     name: "Clinic",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <path
//           d="M8.4738 2.02848C8.41194 1.96651 8.33847 1.91735 8.25759 1.88381C8.17671 1.85027 8.09002 1.83301 8.00246 1.83301C7.91491 1.83301 7.82821 1.85027 7.74733 1.88381C7.66646 1.91735 7.59299 1.96651 7.53113 2.02848L1.53113 8.02848C1.43792 8.12171 1.37445 8.24049 1.34874 8.36979C1.32303 8.49909 1.33623 8.63311 1.38668 8.75491C1.43712 8.87671 1.52255 8.98082 1.63216 9.05408C1.74176 9.12733 1.87063 9.16645 2.00246 9.16648H2.66913V13.8331C2.66913 14.5685 3.26713 15.1665 4.00246 15.1665H12.0025C12.7378 15.1665 13.3358 14.5685 13.3358 13.8331V9.16648H14.0025C14.1344 9.16677 14.2635 9.12784 14.3733 9.05464C14.4832 8.98144 14.5687 8.87726 14.6192 8.75532C14.6697 8.63339 14.6829 8.49921 14.657 8.36979C14.6311 8.24038 14.5673 8.12158 14.4738 8.02848L8.4738 2.02848ZM12.0031 13.8331H4.00246V7.44248L8.00246 3.44248L12.0025 7.44248V10.4998L12.0031 13.8331Z"
//           fill="#4D6677"
//         />
//         <path
//           d="M8.66536 7.1665H7.33203V9.1665H5.33203V10.4998H7.33203V12.4998H8.66536V10.4998H10.6654V9.1665H8.66536V7.1665Z"
//           fill="#4D6677"
//         />
//       </svg>
//     ),
//   },

//   {
//     name: "ATM",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <path
//           d="M4.66406 4.8335V3.50016C4.66406 3.32335 4.7343 3.15378 4.85932 3.02876C4.98435 2.90373 5.15392 2.8335 5.33073 2.8335H13.9974C14.1742 2.8335 14.3438 2.90373 14.4688 3.02876C14.5938 3.15378 14.6641 3.32335 14.6641 3.50016V9.50016C14.6641 9.67697 14.5938 9.84654 14.4688 9.97157C14.3438 10.0966 14.1742 10.1668 13.9974 10.1668H13.3307"
//           stroke="#4D6677"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M10.6654 6.8335H1.9987C1.63051 6.8335 1.33203 7.13197 1.33203 7.50016V13.5002C1.33203 13.8684 1.63051 14.1668 1.9987 14.1668H10.6654C11.0336 14.1668 11.332 13.8684 11.332 13.5002V7.50016C11.332 7.13197 11.0336 6.8335 10.6654 6.8335Z"
//           stroke="#4D6677"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//         <path
//           d="M1.33203 9.83366H11.332M11.332 8.16699V12.167M1.33203 8.16699V12.167M3.66536 11.8337H6.33203M8.33203 11.8337H8.9987"
//           stroke="#4D6677"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     ),
//   },

//   {
//     name: "Post Office",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <path
//           d="M1.75 9.16667V9.58333H1.72323L1.75 9.59859V14.5V14.75H2H10H10.25V14.5V12.75H13.0833V14.5V14.75H13.3333H14H14.25V14.5V5.83333C14.25 4.84202 13.9002 3.99113 13.2048 3.29528L13.2047 3.29516C12.5089 2.5998 11.658 2.25 10.6667 2.25H8C7.00868 2.25 6.15779 2.5998 5.46195 3.29516L5.46183 3.29528C4.76647 3.99113 4.41667 4.84202 4.41667 5.83333V8.91667H2H1.75V9.16667ZM10.25 9.58333V9.16667V8.91667H10H5.58333V5.83333C5.58333 5.16683 5.81773 4.60249 6.29344 4.12678C6.76916 3.65106 7.3335 3.41667 8 3.41667H10.6667C11.3332 3.41667 11.8975 3.65106 12.3732 4.12678C12.8489 4.60249 13.0833 5.16683 13.0833 5.83333V11.5833H10.25V9.59859L10.2768 9.58333H10.25ZM5.8762 12.6305L6 12.7011L6.1238 12.6305L9.08333 10.9436V13.5833H2.91667V10.9436L5.8762 12.6305ZM6.75 6.83333V7.08333H7H11.6667H11.9167V6.83333V6.16667V5.91667H11.6667H7H6.75V6.16667V6.83333ZM6 11.4456L3.61011 10.0833H8.38989L6 11.4456Z"
//           fill="#4D6677"
//           stroke="#4D6677"
//           strokeWidth="0.5"
//         />
//       </svg>
//     ),
//   },

//   {
//     name: "Mall",
//     Icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="17"
//         viewBox="0 0 16 17"
//         fill="none"
//       >
//         <path
//           d="M4.8707 14.5765C4.58936 14.5765 4.35225 14.4803 4.15936 14.2878C3.96692 14.0949 3.8707 13.8578 3.8707 13.5765C3.8707 13.2956 3.96692 13.0587 4.15936 12.8658C4.35225 12.6729 4.58936 12.5765 4.8707 12.5765C5.15159 12.5765 5.38848 12.6729 5.58136 12.8658C5.77425 13.0587 5.8707 13.2956 5.8707 13.5765C5.8707 13.8578 5.77425 14.0949 5.58136 14.2878C5.38848 14.4803 5.15159 14.5765 4.8707 14.5765ZM11.1267 14.5765C10.8458 14.5765 10.6089 14.4803 10.416 14.2878C10.2231 14.0949 10.1267 13.8578 10.1267 13.5765C10.1267 13.2956 10.2231 13.0587 10.416 12.8658C10.6089 12.6729 10.8458 12.5765 11.1267 12.5765C11.408 12.5765 11.6451 12.6729 11.838 12.8658C12.0305 13.0587 12.1267 13.2956 12.1267 13.5765C12.1267 13.8578 12.0305 14.0949 11.838 14.2878C11.6451 14.4803 11.408 14.5765 11.1267 14.5765ZM3.91936 4.1665L5.6987 7.90984H10.122C10.1989 7.90984 10.2671 7.89073 10.3267 7.8525C10.3867 7.81384 10.438 7.7605 10.4807 7.6925L12.224 4.52584C12.2756 4.43162 12.28 4.34806 12.2374 4.27517C12.1947 4.20273 12.122 4.1665 12.0194 4.1665H3.91936ZM3.59336 3.49984H12.2734C12.5627 3.49984 12.7805 3.61806 12.9267 3.8545C13.0734 4.0905 13.0811 4.33384 12.95 4.5845L11.0447 8.0565C10.9483 8.21873 10.8229 8.34606 10.6687 8.4385C10.5145 8.5305 10.3449 8.5765 10.16 8.5765H5.3987L4.5887 10.0638C4.52025 10.1661 4.51803 10.2772 4.58203 10.3972C4.64603 10.5172 4.74225 10.5772 4.8707 10.5772H12.1267V11.2438H4.8707C4.48181 11.2438 4.19159 11.0798 4.00003 10.7518C3.80892 10.4238 3.80425 10.0945 3.98603 9.76384L4.9887 7.97717L2.53736 2.83317H1.33203V2.1665H2.96003L3.59336 3.49984Z"
//           fill="#4D6677"
//         />
//       </svg>
//     ),
//   },
// ];

import React from "react";

export default function nearby() {
  return <div>nearby</div>;
}
