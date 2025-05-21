"use client";
import {
  AgreementDuration,
  AvailableFor,
  Balcony,
  Bathrooms,
  BedRooms,
  // Block,
  Car,
  // CarParkingIcon,
  CloseBike,
  CornorIcon,
  // EndDate,
  FlatIcon,
  Furnishing,
  // IdIcon,
  Marble,
  NoticeMonth,
  OpenBike,
  OpenSides,
  Others,
  OwnerShip,
  ParkingIcon,
  PetFreindly,
  PlotConstruction,
  // PropertyAvailable,
  // SecurityIcon,
  StartDate,
  Status,
  // TotalLandArea,
  // TowerIcon,
  WallIcons,
} from "@/app/images/commonSvgs";
// import { BiFoodTag } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";
import React from "react";
import RoomBasicDetails from "./RoomBasicDetails";
import PropertyHeading from "./heading";
import { Main } from "@/app/validations/property";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import { generatePropertyDetails } from "@/app/data/property";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
const style = {
  card: "mr-[4%] mb-[1%]  p-[2%] md:p-[1%] bg-white mt-2 md:mt-1 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8] ",
  heading: {
    h1: "text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[8px] xl:mb-[10px] capitalize",
    p: "inline-flex  gap-2 sm:gap-[26px]  w-[90%] items-center sm:mb-[20px] xl:mb-[15px] text-[14px] sm:text-[20px] xl:text-[24px] font-[500] text-[#233333] break-words ",
  },
};
export default function RoomDetails({ data }: { data: Main }) {
  const newTitle = `${data?.bhkName ?? ""} ${data?.propTypeName} For
  ${data?.cg === "S" ? " Sale" : " Rent"} In
  ${data?.ltName} at ${data.propName}`;
  return (
    <div
      className="scroll-mt-[220px] sm:mt-[50px] m-auto w-[95%] md:w-[90%]  sm:mb-5 sm:block"
      id="propertyDetails"
    >
      <PropertyHeading
        title="Listing details"
        desc={`Check the details For ${newTitle}`}
        className="mb-[10px] xl:mb-[8px]"
      />
      <UnitBlock data={data} />

      {data.propTypeName !== "Plot" && <RoomSection data={data} />}

      <Parking {...data} />
      <OtherDetails {...data} />
    </div>
  );
}
const RoomSection = ({ data }: { data: Main }) => {
  return (
    <div className=" mb-[3%]  shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] p-4 xl:pl-[53px] xl:py-[39px]">
      <h3 className={style.heading.h1}>Room Details</h3>

      <p className={style.heading.p}>
        See the rooms that are available in this property
      </p>

      <div
        className={
          "flex justify-start items-start flex-wrap w-[90%] md:w-full md:m-auto  "
        }
      >
        {" "}
        <RoomBasicDetails
          key="launchDate"
          icon={<BedRooms />}
          title="Bedrooms"
          value={parseInt(data?.bhkName?.split(" ")[0])}
          className={style.card}
        />
        <RoomBasicDetails
          key="landArea"
          icon={<Balcony />}
          title="Balcony"
          value={data.nobl}
          className={style.card}
        />
        <RoomBasicDetails
          key="bathrooms"
          icon={<Bathrooms />}
          title="Bathroom"
          value={data.nobt}
          className={style.card}
        />
        <RoomBasicDetails
          icon={<Others />}
          title="Other rooms"
          value={data.otherRooms}
          className={style.card}
        />
      </div>
    </div>
  );
};
const Parking = ({ noocp, noobp, noccp, nocbp }: any) => {
  const isAvail =
    [noocp, noobp, noccp, nocbp].filter((i) => i !== undefined).length > 0;
  return (
    isAvail && (
      <div className=" mb-[3%] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] p-4 xl:px-[53px] xl:py-[39px]">
        <h3 className={style.heading.h1}>Parking Details</h3>

        <p className={style.heading.p}>
          Check out the parking details for the listings
        </p>

        <div className="flex justify-start items-start flex-wrap   ">
          <RoomBasicDetails
            key="ocr"
            icon={<Car />}
            title="Open Car Parking"
            value={noocp}
            className={style.card}
          />
          <RoomBasicDetails
            key="possessionDate"
            icon={<ParkingIcon />}
            title="Covered Car Parking"
            value={noccp}
            className={style.card}
          />
          <RoomBasicDetails
            key="landArea"
            icon={<OpenBike />}
            title="Open Bike Parking"
            value={noobp}
            className={style.card}
          />
          <RoomBasicDetails
            icon={<CloseBike />}
            title="Covered Bike Parking"
            value={nocbp}
            className={style.card}
          />
        </div>
      </div>
    )
  );
};
const OtherDetails = ({
  ownershipName,
  possassionDate,
  ageofBuilding,
  availableFrom,
  flooringType,
  availablityStatus,
  agrementduration,
  cg,
  noticemonth,
  propTypeName,
  approvedByName,
  ispetFriendly,
  availavleFor,
  agreementType,
  noOfOpenSide,
  furnshName,
  isCornerPlot,
  cunstructionStatus,
  cunstructionType,
  boundryWallEnclose,
  foodAllowedType,
}: Main) => {
  return (
    <div className=" shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] p-4 xl:pl-[53px] md:pt-[24px] ">
      <h3 className={style.heading.h1}>Other Details</h3>

      <p className={style.heading.p}>
        {propTypeName !== "Plot"
          ? "Check the other details like availability of listing ,...etc"
          : "See the other details for plot"}
      </p>

      <div className="flex justify-start items-start flex-wrap   w-full">
        {cg === "R" && (
          <RoomBasicDetails
            icon={<NoticeMonth />}
            title="Notice Month"
            value={noticemonth}
            className={style.card}
          />
        )}

        <RoomBasicDetails
          icon={<OwnerShip />}
          title="Ownership"
          value={ownershipName}
          className={style.card}
        />

        {propTypeName === "Plot" && (
          <RoomBasicDetails
            icon={<OpenSides />}
            title="Open Sides"
            value={noOfOpenSide}
            className={style.card}
          />
        )}
        {propTypeName !== "Plot" && (
          <>
            <RoomBasicDetails
              icon={
                <PetFreindly className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
              }
              title="Pet Friendly"
              value={
                ispetFriendly === 1
                  ? `Pets Are Allowed`
                  : `Pets Are Not Allowed`
              }
              className={style.card}
            />
            <RoomBasicDetails
              icon={
                <Status className="md:h-[32px] md:w-[32px] h-[24px] w-[24px]" />
              }
              title="Availability Status"
              value={
                availablityStatus == "R"
                  ? "Ready to Move"
                  : "Under Construction"
              }
              className={style.card}
            />
          </>
        )}

        <RoomBasicDetails
          icon={<StartDate />}
          title="Available From"
          value={formatDateDDMMYYYY(availableFrom)}
          className={style.card}
        />

        {availablityStatus === "R" && propTypeName !== "Plot" ? (
          <RoomBasicDetails
            icon={<FlatIcon />}
            title="Age of Property"
            value={ageofBuilding}
            className={style.card}
          />
        ) : (
          <RoomBasicDetails
            icon={<StartDate />}
            title="Possession Date"
            value={formatDateDDMMYYYY(possassionDate)}
            className={style.card}
          />
        )}

        {/* {propTypeName !== "Plot" && isUsed === "Y" && (
        <RoomBasicDetails
            icon={<FlatIcon />}
            title="New Building"
            value="Yes"
            className={style.card}
        />
        )} */}

        <RoomBasicDetails
          icon={<Marble />}
          title="Type of Flooring"
          value={flooringType}
          className={style.card}
        />
        {cg === "R" && (
          <>
            <RoomBasicDetails
              icon={<AgreementDuration />}
              title="Agreement Duration"
              value={agrementduration}
              className={style.card}
            />
            <RoomBasicDetails
              icon={<AgreementDuration />}
              title="Agreement Type"
              value={agreementType}
              className={style.card}
            />
            <RoomBasicDetails
              icon={<AvailableFor />}
              title="Available for"
              value={availavleFor}
              className={style.card}
            />

            <RoomBasicDetails
              icon={<GiKnifeFork size={26} color="#00487C" />}
              title="Food Preferences"
              value={foodAllowedType === "Y" ? "Veg Only" : "Anything"}
              className={style.card}
            />
          </>
        )}
        {propTypeName === "Plot" && approvedByName && (
          <RoomBasicDetails
            icon={<Marble />}
            title="Approved Authority"
            value={
              approvedByName?.length > 1
                ? approvedByName?.join(", ")
                : approvedByName[0]
            }
            className={style.card}
          />
        )}
        <RoomBasicDetails
          icon={<Furnishing />}
          title="Furnishing"
          value={furnshName}
          className={style.card}
        />
        {propTypeName === "Plot" && (
          <>
            <RoomBasicDetails
              icon={<CornorIcon />}
              title="Property on"
              value={isCornerPlot && "Corner Plot"}
              className={style.card}
            />
            <RoomBasicDetails
              icon={<PlotConstruction />}
              title="Plot Undergone any Construction"
              value={`${cunstructionStatus ? "Yes" : "No"} ${
                cunstructionType ? `, ${cunstructionType}` : ""
              }`}
              className={style.card}
            />

            <RoomBasicDetails
              icon={<WallIcons />}
              title="Plot Enclosed with wall"
              value={boundryWallEnclose ? "Yes" : "No"}
              className={style.card}
            />
          </>
        )}
      </div>
    </div>
  );
};
const UnitBlock = ({ data }: { data: Main }) => {
  const dto = generatePropertyDetails(
    data,
    data.propTypeName,
    data.cg,
    data.availablityStatus
  );

  return (
    dto.length > 0 && (
      <div className=" mb-[3%] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] p-4 xl:pl-[53px] xl:py-[39px]">
        <h3 className={style.heading.h1}>Unit Details</h3>

        <p className={style.heading.p}>
          {data.propTypeName !== "Plot"
            ? "Unit Details Including BHK, Phase, Tower,...etc"
            : "Unit Details Including Unit Number, Phase, ...etc"}
        </p>

        <div className="flex justify-start items-start flex-wrap   ">
          {dto.map(({ value, Icon, title }) => (
            <RoomBasicDetails
              key={title}
              icon={<Icon />}
              title={title}
              value={value}
              className="mr-[3%] mb-[1%] p-[1%] bg-white mt-4 border shadow-[0px_4px_20px_0px_#F0F6FF] rounded-[10px] border-solid border-[#92B2C8]"
            />
          ))}
        </div>
      </div>
    )
  );
};
// const PlotBlock = ({ data }: { data: Main }) => {
//   return (
//     <div
//       className="w-[90%] mb-[3%] shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[31px] border-2 border-solid border-[#EEF7FE] bg-[#F9FAFA] px-[53px] py-[39px]"
//       id="propertyDetails "
//     >
//       <h1 className={style.heading.h1}>Plot Details</h1>

//       <p className={style.heading.p}>
//         See the Plot details that are available in This property
//       </p>

//       <div className={"flex justify-start items-start flex-wrap w-[100%]  "}>
//         <RoomBasicDetails
//           icon={<CornorIcon />}
//           title="Property on"
//           value={data.isCornerPlot && "Corner Plot"}
//           className={style.card}
//         />
//         <RoomBasicDetails
//           icon={<PlotConstruction />}
//           title="Plot Undergone any Construction"
//           value={`${data.cunstructionStatus ? "Yes" : "No"} ${
//             data.cunstructionType ? `, ${data.cunstructionType}` : ""
//           }`}
//           className={style.card}
//         />

//         <RoomBasicDetails
//           icon={<WallIcons />}
//           title="Plot Enclosed with wall"
//           value={data.boundryWallEnclose ? "Yes" : "No"}
//           className={style.card}
//         />
//       </div>
//     </div>
//   );
// };
