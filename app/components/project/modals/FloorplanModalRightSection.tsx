import { projectprops } from "@/app/data/projectDetails";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { propertyDetailsSvgs } from "@/app/images/commonSvgs";
import { selectedFloorAtom } from "@/app/store/floor";
// import { projectReqDataAtom } from "@/app/store/project/project.req";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import clsx from "clsx";
import { useAtomValue } from "jotai";
// import { useQuery } from "react-query";

export const RightSection = ({ propCgId, className, postedData }: any) => {
  const data = useAtomValue(selectedFloorAtom);
  const [, { open }] = useReqCallPopup();
  return (
    <div
      className={clsx(
        "bg-[#F4FBFF]  p-6 rounded-lg w-[100%] xl:mb-[10%] xl:w-full max-w-[342px] sm:max-w-[300px] xl:max-w-[342px] shadow",
        className
      )}
    >
      <div className="space-y-4 sm:space-y-2 xl:space-y-4">
        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.unitType}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Unit Type:
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data?.bhkName}
              </span>
            </p>
          </div>
        )}

        {((data.towerName && propCgId === projectprops.apartment) ||
          propCgId === projectprops.villament) && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.towerName}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Tower:
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.towerName}
              </span>
            </p>
          </div>
        )}

        {data.block &&
          propCgId == projectprops.apartment &&
          propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.block}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Block:
                <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] capitalize">
                  {" "}
                  {data.block}
                </span>
              </p>
            </div>
          )}
        {(propCgId === projectprops.apartment ||
          propCgId === projectprops.villament) &&
          data.aptTypeName && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.unitType}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                {propCgId == projectprops.villament
                  ? "Villament Type"
                  : "Apartment Type"}{" "}
                :
                <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] capitalize">
                  {" "}
                  {data.aptTypeName}
                </span>
              </p>
            </div>
          )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.floor}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              {`${
                propCgId == projectprops.rowHouse ||
                propCgId == projectprops.villa
                  ? "Elevation"
                  : "At Floor"
              }`}
              :
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data?.floor === 0
                  ? "G"
                  : propCgId === projectprops.rowHouse ||
                    propCgId === projectprops.villa
                  ? `${data?.floor}`
                  : data?.floor}
              </span>{" "}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.unitNumber}
          <p className="text-[#4D6677] text-[14px] font-[500]">
            Unit Number:
            <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] capitalize">
              {" "}
              {data.unitNumber}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.facingName}
          <p className="text-[#4D6677] text-[14px] font-[500]">
            {`${propCgId == projectprops.plot ? "Plot Facing" : "Facing"} `}:
            <span className="text-[#303A42] text-[14px] font-[600] ml-[10px] ">
              {" "}
              {data.facingName}
            </span>
          </p>
        </div>

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.superBuildUparea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Super Builtup Area:
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {formatNumberWithSuffix(data.superBuildUparea, false)} sq.ft
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.caretarea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Carpet Area:
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {formatNumberWithSuffix(data.caretarea, false)} sq.ft
              </span>
            </p>
          </div>
        )}

        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament) &&
          data.gardenArea && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.caretarea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Garden Area:
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {data.gardenArea} sq.ft
                </span>
              </p>
            </div>
          )}
        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament) &&
          data?.terraceArea &&
          data.terraceArea !== "null" && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.caretarea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Terrace Area:
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {formatNumberWithSuffix(data.terraceArea, false)} sq.ft
                </span>
              </p>
            </div>
          )}
        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament) &&
          data.parkingArea !== "None" &&
          data.parkingArea && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.parkingArea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Parking Area:
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {formatNumberWithSuffix(data.parkingArea, false)} sq.ft
                </span>
              </p>
            </div>
          )}
        {propCgId == projectprops.villament && data?.totalBalconySize && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.parkingArea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Balcony Size:
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {formatNumberWithSuffix(data.totalBalconySize, false)} sq.ft
              </span>
            </p>
          </div>
        )}
        {(propCgId == projectprops.plot ||
          propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse) && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.plotArea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Plot Area:
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {formatNumberWithSuffix(data.plotArea, false)} sq.ft
              </span>
            </p>
          </div>
        )}
        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.noOfCarParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Car Parking:
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.noOfCarParking ? data.noOfCarParking : "N/A"}
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot &&
          data.parkingType &&
          data.parkingType !== "None" && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.parkingType}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Open/Covered Parking:
                <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                  {data.parkingType} Parking
                </span>
              </p>
            </div>
          )}

        {propCgId != projectprops.plot && data?.totalNumberOfBalcony > 0 && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.totalNumberOfBalcony}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Balconies:
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.totalNumberOfBalcony}
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.totalNumberofBathroom}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Bathroom:
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.totalNumberofBathroom}
              </span>
            </p>
          </div>
        )}

        {propCgId == projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.length}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Length of Plot:
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.length} .ft
              </span>
            </p>
          </div>
        )}

        {propCgId == projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.width}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Breadth of Plot:
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.width} .ft
              </span>
            </p>
          </div>
        )}
        <button
          className="bg-btnPrimary text-white w-full mt-3 py-2 rounded-md font-bold"
          onClick={() => {
            open({
              modal_type: "REQ_QUOTE",
              source: "projCard",
              reqId: data?.projIdEnc,
              postedByName: postedData?.postedByName ?? "",
              postedId: postedData?.postedById ?? 0,
              title: data?.unitNumber,
              projUnitIdEnc: data?.unitIdEnc,
            });
          }}
        >
          Request a Quote
        </button>
      </div>
    </div>
  );
};
