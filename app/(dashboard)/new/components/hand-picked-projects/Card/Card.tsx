import React from "react";
import { BackgroundImage} from "@mantine/core";
// import Button from "@/app/components/atoms/buttons/variansts";
import { formatCurrency } from "@/app/utils/numbers";
import { formatDate } from "@/app/utils/date";
import Image from "next/image";
// import { ShareIcon } from "@/app/images/HomePageIcons";
import ViewAllButton from "./ViewButton";
import ShareBtn from "./ShareBtn";
import ReqBtn from "./ReqBtn";
import Shortlist from "./Shortlist";
// import { useMediaQuery } from "@mantine/hooks";

type Props = { item: any };

export default function Card({ item }: Props) {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/abc/banglore/whitefield/${item.projIdEnc}`;
  return (
    <div className="w-[310px] sm:w-[881.143px] h-[450px] sm:h-[514px] shrink-0 relative">
      <BackgroundImage src={item.coverUrl} radius="sm" h={"100%"}>
        <div className="p-6">
          <Image
            width={100}
            height={100}
            src="https://im.proptiger.com/3/100683/13/sumadhura-infracon-23973255.jpeg?width=800&height=620"
            alt="logo icons"
            className="w-[100px] h-[100px] object-cover"
          />
        </div>
        <div className="absolute right-0 top-0 sm:w-[560px] h-[450px] sm:h-[514px] shrink-0  bg-gradient-to-l from-[#00121F] via-[rgba(59,70,98,0.86)] to-[rgba(86,93,112,0.04)] text-right p-7 flex flex-col justify-end sm:justify-between">
          <div>
            <p className="text-white text-[22px] sm:text-[32px] not-italic font-extrabold leading-[normal] tracking-[0.64px] flex justify-end items-center">
              <div className="absolute sm:static top-5 right-1  inline-flex  gap-3 mr-6">
                <Shortlist
                  reqId={item.projIdEnc}
                  shortListed={item.shortListed}
                />
                <ShareBtn url={url} />
              </div>{" "}
              {formatCurrency(item.minPrice)} - {formatCurrency(item.maxPrice)}
            </p>
            <p className="text-white text-[18px] sm:text-[26px] not-italic font-bold leading-[normal] tracking-[0.52px] mt-3 text-nowrap">
              {item.projName}
            </p>
            <p className="text-white  text-[14px] sm:text-xl not-italic font-bold leading-[normal] tracking-[0.4px] mt-1 sm:mt-6">
              {item.propTypes?.join(", ")}
            </p>
          </div>
          <div className="flex flex-col items-end gap-[9px] sm:gap-[19px]">
            <div className="space-y-2">
              <p className="flex justify-center items-center gap-2 rounded py-1 px-2 bg-[#000000b0] text-white text-base not-italic font-semibold leading-[normal] capitalize max-w-fit self-end ml-auto mt-1 sm:mt-0">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/homepage/unit.webp`}
                  alt=""
                  width={16}
                  height={16}
                />{" "}
                201 units
              </p>
              <p className="flex justify-center items-center gap-1 rounded py-1 px-2 bg-[#000000b0] text-white text-base not-italic font-semibold leading-[normal] capitalize">
                Project Land Area: {item.landArea} Acres
              </p>
            </div>
            <div>
              <p className="text-white sm:text-[22px] not-italic font-bold leading-[normal] tracking-[0.44px]">
                Start Date: {formatDate(item.launchDate)}
              </p>
              <p className="text-white sm:text-[22px] not-italic font-bold leading-[normal] tracking-[0.44px] mt-1">
                End Date: {formatDate(item.possassionDate)}
              </p>
            </div>
            <div className="sm:flex flex-col items-end space-x-2 sm:space-x-0 gap-3">
              <ViewAllButton name={item.projName} url={url} />
              <ReqBtn
                builderName={item.builderName}
                projName={item.projName}
                reqId={item.projIdEnc}
                builderId={item.builderId}
              />
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
}

// const config = {
//   heart: (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="33"
//       height="32"
//       viewBox="0 0 33 32"
//       fill="none"
//     >
//       <path
//         d="M32.75 16C32.75 24.6913 25.4819 31.75 16.5 31.75C7.51807 31.75 0.25 24.6913 0.25 16C0.25 7.30871 7.51807 0.25 16.5 0.25C25.4819 0.25 32.75 7.30871 32.75 16Z"
//         fill="#ECF0F3"
//         stroke="#A7C4DA"
//         strokeWidth="0.5"
//       />
//       <path
//         d="M21.3584 8C18.1041 8 16.5 11.1515 16.5 11.1515C16.5 11.1515 14.8959 8 11.6416 8C8.99691 8 6.90258 10.1736 6.87551 12.7671C6.82037 18.1508 11.2231 21.9794 16.0489 25.1969C16.1819 25.2858 16.3391 25.3333 16.5 25.3333C16.6609 25.3333 16.8181 25.2858 16.9512 25.1969C21.7764 21.9794 26.1791 18.1508 26.1245 12.7671C26.0974 10.1736 24.0031 8 21.3584 8Z"
//         stroke="#4D6677"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   ),
//   share: (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="23"
//       viewBox="0 0 24 23"
//       fill="none"
//     >
//       <path
//         d="M9.26432 11.6668C9.26432 12.293 9.00779 12.8935 8.55116 13.3363C8.09453 13.7791 7.4752 14.0279 6.82943 14.0279C6.18365 14.0279 5.56433 13.7791 5.1077 13.3363C4.65106 12.8935 4.39453 12.293 4.39453 11.6668C4.39453 11.0406 4.65106 10.44 5.1077 9.99722C5.56433 9.55442 6.18365 9.30566 6.82943 9.30566C7.4752 9.30566 8.09453 9.55442 8.55116 9.99722C9.00779 10.44 9.26432 11.0406 9.26432 11.6668Z"
//         stroke="#616D75"
//         strokeWidth="1.5"
//       />
//       <path
//         d="M14.1354 6.47229L9.26562 9.77785M14.1354 16.8612L9.26562 13.5556"
//         stroke="#616D75"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       />
//       <path
//         d="M19.0026 17.8056C19.0026 18.4318 18.7461 19.0324 18.2894 19.4752C17.8328 19.918 17.2135 20.1667 16.5677 20.1667C15.9219 20.1667 15.3026 19.918 14.846 19.4752C14.3893 19.0324 14.1328 18.4318 14.1328 17.8056C14.1328 17.1794 14.3893 16.5789 14.846 16.1361C15.3026 15.6933 15.9219 15.4445 16.5677 15.4445C17.2135 15.4445 17.8328 15.6933 18.2894 16.1361C18.7461 16.5789 19.0026 17.1794 19.0026 17.8056ZM19.0026 5.52786C19.0026 6.15406 18.7461 6.75462 18.2894 7.19742C17.8328 7.64021 17.2135 7.88897 16.5677 7.88897C15.9219 7.88897 15.3026 7.64021 14.846 7.19742C14.3893 6.75462 14.1328 6.15406 14.1328 5.52786C14.1328 4.90165 14.3893 4.3011 14.846 3.8583C15.3026 3.41551 15.9219 3.16675 16.5677 3.16675C17.2135 3.16675 17.8328 3.41551 18.2894 3.8583C18.7461 4.3011 19.0026 4.90165 19.0026 5.52786Z"
//         stroke="#616D75"
//         strokeWidth="1.5"
//       />
//     </svg>
//   ),
// };
