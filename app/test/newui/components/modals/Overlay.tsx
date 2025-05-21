import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { overlayAtom } from "../../store/overlay";
import { IoIosCloseCircle } from "react-icons/io";
import useProjectCardData from "../../useProjectCardData";
import LocationCard from "./overly_items/LocationList";
import OtherChargesList from "./overly_items/OtherChargesListOverlay";
import PropertyHighlights from "./overly_items/PropertyHightilights";

const Overlay: React.FC = () => {
  const [overlayState, dispatch] = useAtom(overlayAtom);
  const { isOpen, content, title, id, conType, pType, lat, lang, propId } =
    overlayState;
  const { data: amenitiesFromDB, isLoading } = useProjectCardData({
    id: id ?? "",
    isOpen,
    conType,
    pType: pType ?? "",
    lat,
    lang,
    propId,
  });
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        dispatch({ type: "CLOSE" });
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  const renderAmenities = () => {
    if (isLoading) return <div>Loading...</div>;
    if (!amenitiesFromDB) return <div>No amenities available</div>;

    return amenitiesFromDB
      .toString()
      .split(",")
      .map(
        (item: string) =>
          item !== " " && (
            <span
              key={`amenity_${item}`}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
            >
              {item}
            </span>
          )
      );
  };
  const renderContent = () => {
    switch (conType) {
      case "amenities":
        return <div className="flex flex-wrap gap-2">{renderAmenities()}</div>;
      case "nearby":
        return (
          <p>
            {isLoading ? "Loading..." : <LocationCard data={amenitiesFromDB} />}
          </p>
        );
      case "readmore":
        return (
          <p
            className="prose-p:py-1 prose-no-break"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      case "bhk":
        return (
          <div className="flex flex-wrap gap-2">
            {Array.isArray(content) ? (
              content.map((item) => (
                <span
                  key={`bhk_${item}`}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
                >
                  {item}
                </span>
              ))
            ) : (
              <div>No BHK data available</div>
            )}
          </div>
        );
      case "otherCharges":
        return <OtherChargesList />;
      case "hightlights":
        return <PropertyHighlights />;
      case "none":
      default:
        return <div>{content}</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg shadow-lg max-w-[90%] w-full max-h-[200px] overflow-y-auto"
        ref={overlayRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-3 py-0.5 font-bold flex justify-between items-start">
          <h1 className="text-xs sm:text-lg">{title}</h1>
          <IoIosCloseCircle
            // size={26}
            color="#0073C6"
            className="cursor-pointer flex justify-center items-center xl:min-h-[26px] xl:min-w-[26px] xl:max-h-[26px] xl:max-w-[26px] min-h-[20px] min-w-[20px] max-h-[20px] max-w-[20px] "
            onClick={() => dispatch({ type: "CLOSE" })}
          />
        </div>
        <div className="p-1 border-t">
          <div className="px-2 text-xs sm:text-base">{renderContent()}</div>
          <div className="flex justify-end p-2">
            <button
              className="bg-blue-500 text-white py-1 px-2 sm:px-4 sm:py-2 rounded hover:bg-blue-600 focus:outline-none text-xs sm:text-base"
              onClick={() => dispatch({ type: "CLOSE" })}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
