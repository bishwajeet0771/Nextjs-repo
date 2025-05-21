import React from "react";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { LatLngTuple } from "leaflet";
import * as L from "leaflet";
import Image from "next/image";
interface CustomMarkerProps {
  location: LatLngTuple;
  iconType: "Hotel" | "Default";
}

const CustomMarker: React.FC<CustomMarkerProps> = (props) => {
  const HotelIcon = L.icon({
    iconUrl: "https://img2.pic.in.th/pic/icons8-hotel-64.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <Marker
      position={props.location}
      icon={props.iconType === "Hotel" ? HotelIcon : undefined}
    >
      <Popup maxWidth={200} minWidth={200}>
        <Image
          src="https://ak-d.tripcdn.com/images/220a0r000000gwne24089_R_960_660_R5_D.jpg"
          width={500}
          height={500}
          alt="Wrong with images"
        />
        <div className="my-2">
          <div className="flex items-center justify-between">
            <div className="font-bold text-sm">The Scene Condo</div>
            <div className="">123</div>
          </div>
          <div className="overflow-x-scroll mt-1">
            <div className="">Booking Now (132)</div>
            <div className="text-xs mt-1">Price: 9000</div>
            <div className="text-xs mt-1">
              40 THAVEEWONG ROAD, PATONG, KATHU
            </div>
            <div className="text-xs mt-1">
              RESERVATIONS-BLISSPATONG@HOMMHOTELS.COM
            </div>
            <div className="text-xs mt-1">
              0x05CD35f8D7011b42Ef579cCab9D6982cDd9f24cd
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
