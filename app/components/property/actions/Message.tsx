import { listingProps } from "@/app/data/projectDetails";
// import useDynamicProj from "@/app/hooks/project/useDynamic";
import useDynamicProp from "@/app/hooks/property/useDyanamic";
// import { useShortlistAndCompare } from "@/app/hooks/storage";
import clsx from "clsx";
import Link from "next/link";
// import { useParams } from "next/navigation";
import React from "react";

export default function Message({ cg, propTypeName }: any) {
  const { data } = useDynamicProp({
    cg,
    propId: listingProps[propTypeName.trim() as keyof typeof listingProps],
  });
  const dynamicText = `${
    (data?.shortListed && data?.compareAdded && "Shortlisted and Compared") ||
    (data?.compareAdded && "Compared") ||
    (data?.shortListed && "Shortlisted") ||
    "Message"
  }`;

  const url = `${
    (data?.shortListed && data?.compareAdded && "/your-profile/shortlisted") ||
    (data?.compareAdded && "/your-profile/compare") ||
    (data?.shortListed && "/your-profile/shortlisted")
  }`;

  // inline-flex items-center mt-4  gap-2 p-1.5 rounded-lg bg-[#fff5c3]  sm:-bottom-5  sm:right-0 w-full md:min-w-fit sm:mt-1

  return (
    (data?.compareAdded || data?.shortListed) && (
      <div className="">
        <div
          className={clsx(
            "flex items-center gap-2 p-1.5 rounded-lg bg-[#fff5c3] sm:bottom-5 sm:right-0 w-full md:min-w-fit mt-0 xl:mt-4 ",
            data?.compareAdded && data?.shortListed && "md:min-w-fit"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="min-w-[24px]"
          >
            <path
              d="M12.0006 17V15M12.0006 15C12.3516 15 12.6965 14.9075 13.0005 14.732C13.3045 14.5565 13.557 14.304 13.7326 14M12.0006 15C11.6495 15 11.3046 14.9075 11.0006 14.732C10.6966 14.5565 10.4441 14.304 10.2686 14"
              stroke="#FE9800"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14.5005 19.4999H9.50047M14.5005 19.4999C14.5005 18.7869 14.5005 18.4299 14.5385 18.1929C14.6615 17.4299 14.6825 17.3809 15.1695 16.7809C15.3205 16.5949 15.8805 16.0929 17.0015 15.0889C17.7886 14.3862 18.4182 13.525 18.8489 12.5617C19.2796 11.5985 19.5016 10.555 19.5005 9.4999C19.5017 8.64832 19.3573 7.8028 19.0735 6.9999M14.5005 19.4999C14.5005 20.4349 14.5005 20.9019 14.2995 21.2499C14.1678 21.4779 13.9785 21.6672 13.7505 21.7989C13.4025 21.9999 12.9355 21.9999 12.0005 21.9999C11.0655 21.9999 10.5985 21.9999 10.2505 21.7989C10.0225 21.6672 9.83311 21.4779 9.70147 21.2499C9.50047 20.9019 9.50047 20.4349 9.50047 19.4999M9.50047 19.4999C9.50047 18.7869 9.50047 18.4299 9.46247 18.1929C9.33947 17.4299 9.31847 17.3809 8.83147 16.7809C8.68047 16.5949 8.11947 16.0929 6.99947 15.0889C5.6159 13.8525 4.73979 12.147 4.54048 10.3022C4.34117 8.4574 4.8328 6.6042 5.92035 5.10078C7.0079 3.59736 8.61416 2.55046 10.4287 2.16243C12.2432 1.77439 14.1371 2.07277 15.7445 2.9999"
              stroke="#FE9800"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>{" "}
          <span className="text-[#242424] text-[12px] sm:text-base xl:text-lg not-italic font-medium leading-[normal] sm:text-nowrap ">
            Please check your{" "}
            <Link
              rel="noopener noreferrer"
              href={url}
              className="!text-[#0073C6] text-[12px] sm:text-base xl:text-lg  italic font-semibold leading-[normal] !underline"
            >
              Dashboard
            </Link>
            {"   "}
            for {dynamicText} Property
          </span>
        </div>
      </div>
    )
  );
}
