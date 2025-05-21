import Button from "@/app/elements/button";
// import { GradientLocation, SearchMapIcon } from "@/app/images/commonSvgs";
import selectedSearchAtom from "@/app/store/search/map";
import { useSetAtom } from "jotai";
import React from "react";
import HeartButton from "../Center/HeartButton";
// import { searchShareAtom } from "../../../SharePopup";
import { useMediaQuery } from "@mantine/hooks";
import ProjData from "../Center/ProjData";
import { ShareIcon } from "@/app/images/HomePageIcons";
import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import useSearchFilters from "@/app/hooks/search";

type Props = any;

export default function TopRightSection({
  agentListing,
  ownerListing,
  projName,
  lat,
  lang,
  onAddingCompare,
  Com,
  Sh,
  onAddingShortList,
  projIdEnc,
  type,
  data,
  propIdEnc,
  postedDate,
  propName,
  bhkName,
  city,
  locality,
  phaseName,
}: Props) {
  const setSelected = useSetAtom(selectedSearchAtom);
  // const [sharePopupData, setSharePopup] = useAtom(searchShareAtom);
  const { filters } = useSearchFilters();

  // const url =
  //   type === "proj"
  //     ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/abc/banglore/whitefield/${projIdEnc}`
  //     : `${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/whitefield/${propIdEnc}`;
  const isMobile = useMediaQuery("(max-width: 1600px)");
  const projOrPropName = type === "proj" ? projName : propName;
  const handleClick = () => {
    // Get the div by ID and scroll to it
    const element = document.getElementById("mobileMap");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const url = generateListingLinkUrl({
    bhkUnitType: bhkName ? bhkName : "",
    city: city ? city : "",
    propIdEnc: type == "proj" ? projIdEnc : propIdEnc,
    category: filters.cg === "S" ? "for-sale" : "for-rent",
    locality: locality ? locality : "",
    phase: phaseName ? phaseName : "",
    projName: projName ? projName : projName,
  });

  // console.log("card 2");
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="m-[2px]  md:mr-3 md:my-2 flex md:gap-[0.5px] mx-2 max-h-full justify-between items-start flex-row xl:flex-col xl:items-end"
    >
      {isMobile && (
        <>
          <ProjData type={type} {...data} />
          <div className="flex flex-col justify-between">
            <div className="flex flex-row md:flex-col gap-3 sm:gap-1 xl:gap-3  items-end">
              <div className="gap-2 xl:gap-1 flex flex-row items-center align-middle ">
                <HeartButton
                  shortListed={Sh}
                  onAddingShortList={onAddingShortList}
                />
                <button
                name="share Project"
                  className="gap-2 xl:gap-1 flex flex-row items-center align-middle  "
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.share({
                      title:
                        type !== "proj" ? "Share Listing" : "Share Project",
                      url: url,
                    });
                  }}
                  // onClick={() =>
                  //   setSharePopup({
                  //     ...sharePopupData,
                  //     opened: true,
                  //     url,
                  //     ...(type !== "proj" && { title: "Share Listing" }),
                  //   })
                  // }
                >
                  <ShareIcon />
                </button>
              </div>
              <button
                className="max-w-fit px-[1px] py-[1px]  rounded  text-[#242424] text-sm not-italic font-semibold my-1  md:mb-1  gradient"
                onClick={() => {
                  handleClick();
                  setSelected({
                    agentListing,
                    ownerListing,
                    projOrPropName,
                    lat,
                    lang,
                    type,
                    reqId: type === "proj" ? projIdEnc : propIdEnc,
                    propType: data?.propTypeName,
                  });
                }}
              >
                <div className="px-[1px] py-[1px] inline-flex justify-center items-center bg-[#F0F9FF] gap-0.5 rounded">
                  {" "}
                  <span className="hidden md:flex">View on Map</span>{" "}
                  {/* <SearchMapIcon className="w-4 h-4" /> */}
                </div>
              </button>
            </div>

            <div className="flex items-end flex-col justify-between md:gap-2">
              <Button
                onChange={() => onAddingCompare()}
                title={Com ? "Remove Compare" : " Add to Compare"}
                buttonClass="inline-flex justify-center items-center gap-1 xl:gap-2.5 rounded p-0.5 border-[0.5px] border-solid border-[#00A8CD] text-[#00A8CD] text-[12px]       sm:text-[12px] xl:text-xs not-italic font-semibold ml-auto"
              />{" "}
              <p className="text-[#242424] text-[12px] sm:text-[12px] xl:text-sm  not-italic font-normal">
                Posted: <span className="font-bold">{timeAgo(postedDate)}</span>
              </p>
            </div>
          </div>
        </>
      )}
      {!isMobile && (
        <>
          <div className="flex  flex-col justify-center  h-auto items-end">
            <div className="space-x-2 flex flex-row justify-center">
              <HeartButton
                shortListed={Sh}
                onAddingShortList={onAddingShortList}
              />
              <button
                className="space-x-2 flex flex-row justify-center"
                onClick={() =>
                  navigator.share({
                    title: type !== "proj" ? "Share Listing" : "Share Project",
                    url: url,
                  })
                }
                // onClick={() =>
                //   setSharePopup({
                //     ...sharePopupData,
                //     opened: true,
                //     url,
                //     ...(type !== "proj" && { title: "Share Listing" }),
                //   })
                // }
              >
                {config.shareIcon}
              </button>
            </div>
            <button
              className="max-w-fit px-[1px] py-[1px] rounded text-[#242424] text-sm not-italic font-semibold my-2 md:mb-1 gradient"
              onClick={
                () =>
                  navigator.share({
                    text: "shear",
                    url: url,
                  })

                // setSelected({
                //   agentListing,
                //   ownerListing,
                //   projOrPropName,
                //   lat,
                //   lang,
                //   type,
                //   reqId: type === "proj" ? projIdEnc : propIdEnc,
                // })
              }
            >
              {" "}
              <div className="px-[1px] py-[1px] inline-flex justify-center items-center bg-[#F0F9FF] gap-0.5 rounded">
                {" "}
                {/* View on Map <SearchMapIcon className="w-4 h-4" /> */}
              </div>
            </button>
          </div>

          <div className="flex  items-end flex-col gap-2">
            <Button
              onChange={() => onAddingCompare()}
              title={Com ? "Remove  Compare" : "Add to Compare"}
              buttonClass="inline-flex justify-center items-center gap-2.5 rounded p-0.5 border-[0.5px] border-solid border-[#00A8CD] text-[#00A8CD] text-xs not-italic font-semibold ml-auto"
            />{" "}
            <p className="text-[#242424] xl:text-nowrap text-wrap text-sm not-italic font-normal">
              Posted: <span className="font-bold">{timeAgo(postedDate)}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

const config = {
  shareIcon: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="13"
        cy="13"
        r="12.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        strokeWidth="0.5"
      />
      <path
        d="M11.2391 13.5434C11.2391 14.0522 11.037 14.5401 10.6773 14.8999C10.3175 15.2597 9.82954 15.4618 9.32075 15.4618C8.81195 15.4618 8.324 15.2597 7.96423 14.8999C7.60446 14.5401 7.40234 14.0522 7.40234 13.5434C7.40234 13.0346 7.60446 12.5467 7.96423 12.1869C8.324 11.8271 8.81195 11.625 9.32075 11.625C9.82954 11.625 10.3175 11.8271 10.6773 12.1869C11.037 12.5467 11.2391 13.0346 11.2391 13.5434Z"
        stroke="#616D75"
        strokeWidth="1.5"
      />
      <path
        d="M15.0751 9.32227L11.2383 12.008M15.0751 17.7632L11.2383 15.0775"
        stroke="#616D75"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.911 18.5308C18.911 19.0396 18.7089 19.5276 18.3491 19.8873C17.9894 20.2471 17.5014 20.4492 16.9926 20.4492C16.4838 20.4492 15.9959 20.2471 15.6361 19.8873C15.2763 19.5276 15.0742 19.0396 15.0742 18.5308C15.0742 18.022 15.2763 17.5341 15.6361 17.1743C15.9959 16.8145 16.4838 16.6124 16.9926 16.6124C17.5014 16.6124 17.9894 16.8145 18.3491 17.1743C18.7089 17.5341 18.911 18.022 18.911 18.5308ZM18.911 8.55512C18.911 9.06391 18.7089 9.55187 18.3491 9.91164C17.9894 10.2714 17.5014 10.4735 16.9926 10.4735C16.4838 10.4735 15.9959 10.2714 15.6361 9.91164C15.2763 9.55187 15.0742 9.06391 15.0742 8.55512C15.0742 8.04633 15.2763 7.55838 15.6361 7.19861C15.9959 6.83884 16.4838 6.63672 16.9926 6.63672C17.5014 6.63672 17.9894 6.83884 18.3491 7.19861C18.7089 7.55838 18.911 8.04633 18.911 8.55512Z"
        stroke="#616D75"
        strokeWidth="1.5"
      />
    </svg>
  ),
};
function parseDateString(dateString: string): Date {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // eslint-disable-next-line no-unused-vars
  const [_, monthStr, day, time, , year] = dateString.split(" ");
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const month = months.indexOf(monthStr);
  return new Date(Number(year), month, Number(day), hours, minutes, seconds);
}

function timeAgo(dateString: string): string {
  const date = parseDateString(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  if (interval === 1) {
    return interval + " year ago";
  }

  const months = Math.floor(seconds / 2628000);
  if (months > 1) {
    return months + " months ago";
  }
  if (months === 1) {
    return months + " month ago";
  }

  const days = Math.floor(seconds / 86400);
  if (days > 1) {
    return days + " days ago";
  }
  if (days === 1) {
    return days + " day ago";
  }

  const hours = Math.floor(seconds / 3600);
  if (hours > 1) {
    return hours + " hours ago";
  }
  if (hours === 1) {
    return hours + " hour ago";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes > 1) {
    return minutes + " minutes ago";
  }
  if (minutes === 1) {
    return minutes + " minute ago";
  }

  return "just now";
}
