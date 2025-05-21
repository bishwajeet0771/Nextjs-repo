import { AmenityList } from "@/app/validations/types/project";
import React from "react";
import PropertyHeading from "../property/heading";
import SubHeading from "./headings/SubHeading";
import AmenitiesDisplay from "./_ui/Amenities";

export default function Amenties({
  data,
  type,
  projName,
  amenitiesFromDB,
}: {
  data: AmenityList[];
  type?: string;
  projName: string;
  amenitiesFromDB: any;
}) {
  return (
    <div
      className="w-[95%] sm:w-[90%] xl:w-[90%] relative scroll-mt-[130px]  bg-white sm:pt-10 mb-[3%] "
      id="amenities"
    >
      <div className=" mx-auto ">
        {type === "prop" ? (
          <PropertyHeading
            title="Amenities"
            desc="Experience the ultimate in comfort with our amenities"
            className="mb-[10px] sm:mb-[8px]"
          />
        ) : (
          <>
            {" "}
            <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[12px] capitalize break-words text-wrap w-[78%]">
              <strong>
                <span className="text-[#001F35]">Amenities Of{" "}</span>
                <span className="text-green-800">{projName}</span>
              </strong>
            </h2>
            <SubHeading
              text="Experience the ultimate in comfort with our amenities"
              className="text-[13px] sm:text-[16px] xl:text-2xl  text-[#344273]  italic font-semibold leading-[normal] mb-4 sm:mb-2"
            />
            
          </>
        )}

        <div className="flex flex-wrap sm:mt-4">
          {data && data?.length > 0 && (
            <AmenitiesDisplay data={data} amenitiesData={amenitiesFromDB} />
          )}
        </div>
      </div>
    </div>
  );
}

// {data?.map((each, ind) => {
//   if(amenitiesGroupList.get(each.id) != null){
//   return (
//     <div
//       key={ind}
//       className="flex items-center rounded-[10px] shadow-md border-solid border-[1px] border-[#a5bfd8] px-2.5 py-0.5 w-fit text-[#001F35] font-[500] text-[18px] lg:text-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FFF] text-secondary-foreground hover:bg-gray-100/80"
//     >
//       {amenitiesGroupList.get(each.id)}
//       {each.name}
//     </div>
//   )
// }
// })}

{
  /* <div
  key={ind}
  className="customAmenitiesItemsCon"
>
  <div
    id={`displayningAmenityBox_${eachOne.cid}`}
    key={eachOne.cid}
  >
    <span>{group}</span> <span>|</span>{" "}
    <span>{eachOne.constDesc}</span>
  </div>
</div> */
}
