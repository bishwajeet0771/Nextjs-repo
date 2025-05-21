/* eslint-disable react/jsx-boolean-value */
"use client";
// import { useMediaQuery } from "@mantine/hooks";
// import { em } from "@mantine/core";
import { useAtom } from "jotai";
import { readMoreAtom } from "@/app/store/drawer";
// import S from "@/app/styles/Drawer.module.css";
import { AmenityList } from "@/app/validations/types/project";
import { amenitiesGroupList } from "@/app/images/commonSvgs";
import React, { Fragment } from "react";
import Close from "./button/close";
// import { useDrag } from "@use-gesture/react";
import DrawerBox from "../property/pricingbreakup/DrawerBox";
function ProjectDrawer({ projName }: { projName: string }) {
  const [
    { expanded, content, type, title, showProjName, builderName },
    setReadMore,
  ] = useAtom(readMoreAtom);
  const handleReadMoreClick = () => {
    document.body.style.overflow = "unset";
    setReadMore((prev) => ({
      ...prev,
      expanded: false,
      builderName: "",
    }));
  };
  // const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  // const bind = useDrag(
  //   ({ movement: [mx], direction: [dx], memo = mx, cancel }) => {
  //     // If the user is swiping left (negative direction)
  //     if (dx === 1 && mx > 50) {
  //       handleReadMoreClick();
  //       cancel();
  //     }
  //     return memo;
  //   },
  //   { axis: "x", pointer: { touch: true } }
  // );

  return (
    expanded && (
      <DrawerBox
        key="projectDrawer"
        isOpen={expanded}
        title=""
        handleChange={handleReadMoreClick}
        hideHeader={true}
      >
        <div className="mt-4 pr-[10px] pl-[10px] xl:pl-[57px] flex justify-between ">
          <h1 className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[10px] xl:mb-[6px] capitalize">
            {builderName ? "About Builder" : title}{" "}
            {showProjName && (
              <span className="text-[#148B16] font-[700] capitalize">
                {builderName || projName}
              </span>
            )}
          </h1>
          <Close
            close={handleReadMoreClick}
            className="w-[24px] h-[24px] md:w-[35px] md:h-[35px]"
          />
        </div>

        <div className="w-[95%] text-[#233333] text-[16px] xl:text-xl mt-1 pl-[10px] xl:pl-[57px] xl:pb-20 max-h-[calc(100vh-170px)] overflow-y-auto ">
          {type === "content" ? (
            <p
              className="prose-p:py-1 prose-no-break prose-li:list-disc  prose-li:pl-1"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="flex flex-wrap w-full">
              {content.data.map((eachItem: AmenityList) => {
                if (amenitiesGroupList.get(eachItem.id) != null) {
                  const amenitiesFromDB = content.amenitiesFromDB;
                  return (
                    <Fragment key={`aminityCon_${eachItem.id}`}>
                      {amenitiesFromDB != undefined &&
                        amenitiesFromDB != null &&
                        Object.keys(amenitiesFromDB).map((group) => {
                          return (
                            <Fragment key={`aminityGroupCon_${eachItem.id}`}>
                              {amenitiesFromDB != undefined &&
                                amenitiesFromDB != null &&
                                amenitiesFromDB[`${group}`] != undefined &&
                                amenitiesFromDB[`${group}`] != null &&
                                amenitiesFromDB[`${group}`].length != 0 &&
                                amenitiesFromDB[group].map(
                                  (eachOne: any) => {
                                    if (eachOne.cid == eachItem.id) {
                                      return (
                                        <div
                                          key={`aminityBox_${eachItem.id}`}
                                          className="flex items-center gap-[4px] mr-[12px] mb-[12px]  xl:gap-[8px]    sm:mr-[24px] sm:mb-[24px]  px-2.5 py-0.5 w-fit text-[#001F35] font-[500] text-[12px] lg:text-[20px] focus:ring-offset-2 border rounded-[10px] border-solid border-[#b2e0ff] bg-[#FFF] "
                                        >
                                          {amenitiesGroupList.get(eachItem.id)}
                                          {eachOne.constDesc}
                                        </div>
                                      );
                                    }
                                  }
                                )}
                            </Fragment>
                          );
                        })}
                    </Fragment>
                  );
                }
              })}
            </div>
          )}
        </div>
      </DrawerBox>
    )
  );
}

export default ProjectDrawer;

//   <Drawer
//   classNames={{
//     header: S.header,
//     // title: S.title,
//     // close: S.close,
//     // overlay: S.overlay,
//     content: S.content,
//   }}
//   opened={expanded}
//   onClose={handleReadMoreClick}
//   position="right"
//   size={isMobile ? "100%" : "45%"}
//   zIndex={10000}
//   {...bind()}
// >
//   <div className="mt-4 pl-[10px] xl:pl-[57px] flex justify-between ">
//     <h1 className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[10px] xl:mb-[6px] capitalize">
//       {builderName ? "About Builder" : title}{" "}
//       {showProjName && (
//         <span className="text-[#148B16] font-[700] capitalize">
//           {builderName || projName}
//         </span>
//       )}
//     </h1>
//     <Close close={handleReadMoreClick} />
//   </div>

//   <div className="w-[95%] text-[#233333] text-[16px] xl:text-xl mt-1 pl-[10px] xl:pl-[57px] xl:pb-20">
//     {type === "content" ? (
//       <p
//         className="prose-p:py-1 prose-no-break prose-li:list-disc  prose-li:pl-1"
//         dangerouslySetInnerHTML={{ __html: content }}
//       />
//     ) : (
//       <div className="flex flex-wrap w-full">
//         {content.data.map((eachItem: AmenityList, index: number) => {
//           if (amenitiesGroupList.get(eachItem.id) != null) {
//             const amenitiesFromDB = content.amenitiesFromDB;
//             return (
//               <React.Fragment key={`aminityCon_${eachItem.id}`}>
//                 {amenitiesFromDB != undefined &&
//                   amenitiesFromDB != null &&
//                   Object.keys(amenitiesFromDB).map((group, ind) => {
//                     return (
//                       <React.Fragment
//                         key={`aminityGroupCon_${eachItem.id}`}
//                       >
//                         {amenitiesFromDB != undefined &&
//                           amenitiesFromDB != null &&
//                           amenitiesFromDB[`${group}`] != undefined &&
//                           amenitiesFromDB[`${group}`] != null &&
//                           amenitiesFromDB[`${group}`].length != 0 &&
//                           amenitiesFromDB[group].map(
//                             (eachOne: any, index: number) => {
//                               if (eachOne.cid == eachItem.id) {
//                                 return (
//                                   <div
//                                     key={`aminityBox_${eachItem.id}`}
//                                     className="flex items-center gap-[4px] mr-[12px] mb-[12px]  xl:gap-[8px]    sm:mr-[24px] sm:mb-[24px]  px-2.5 py-0.5 w-fit text-[#001F35] font-[500] text-[12px] lg:text-[20px] focus:ring-offset-2 border rounded-[10px] border-solid border-[#b2e0ff] bg-[#FFF] "
//                                   >
//                                     {amenitiesGroupList.get(eachItem.id)}
//                                     {eachOne.constDesc}
//                                   </div>
//                                 );
//                               }
//                             }
//                           )}
//                       </React.Fragment>
//                     );
//                   })}
//               </React.Fragment>
//             );
//           }
//         })}
//       </div>
//     )}
//   </div>
// </Drawer>
