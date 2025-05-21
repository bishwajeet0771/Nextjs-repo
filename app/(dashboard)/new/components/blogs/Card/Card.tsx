import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  data: any;
};

export default function Card({ data }: Props) {
  const title = data && data.heading ? data.heading : "";
  const pathName = title.toLowerCase().replaceAll(" ", "-");

  return (
    <Link
      rel="noopener noreferrer"
      prefetch={false}
      href={`blog/${pathName}`}
      className="hover:shadow-lg"
    >
      <div className="relative flex xl:min-h-[350px] md:min-h-[280px] min-h-[230px] min-w-[300px] sm:w-[338px] xl:w-[427px] flex-col items-start border shadow-[0px_4px_20px_0px_rgba(0,127,145,0.10)] rounded-t-[4px]  xl:rounded-t-[4px] border-solid border-[#B9CFEB] ">
        <Image
          height={196}
          width={494}
          className="min-h-[118px] max-h-[118px] sm:min-h-[142px] sm:max-h-[142px] xl:min-h-[196px] xl:max-h-[196px] rounded-t-[4px] xl:rounded-t-[4px]"
          src={data?.coverImage}
          alt={title}
        />
        <div className="flex flex-col h-auto gap-[6px] w-full justify-between items-start p-[12px]">
          <h2 className="text-[color:var(--Black,#000)] text-[12px] sm:text-[16px] xl:text-[20px] not-italic leading-[150%] font-bold ">
            {title}
          </h2>
          <span className="text-[color:var(--Black,#000)] text-[12px] sm:text-[16px] xl:text-[18px] not-italic font-normal leading-[150%] mb-auto ">
            {data && data.text ? data.text : ""}
          </span>

          <span className=" absolute bottom-[10px] right-[10px] inline-flex mt-auto gap-1 justify-center items-center text-[color:var(--Secondary-Blue-1,#006EBE)] text-[12px] sm:text-[16px] xl:text-[20px] not-italic font-bold leading-[150%]">
            Read {config.readMoreIcon}
          </span>
        </div>
      </div>
    </Link>
  );
}

const config = {
  readMoreIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className=" w-[13px] h-[13px] sm:w-[24px] sm:h-[24px] "
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9603 11.1419C15.18 11.3615 15.18 11.7176 14.9603 11.9373L9.22541 17.6722C9.00573 17.8918 8.64963 17.8918 8.42996 17.6722L8.16476 17.407C7.94508 17.1873 7.94508 16.8312 8.16476 16.6115L13.2367 11.5396L8.16476 6.46763C7.94508 6.24795 7.94508 5.89185 8.16476 5.67218L8.42996 5.40698C8.64963 5.1873 9.00573 5.1873 9.22541 5.40698L14.9603 11.1419Z"
        fill="black"
      />
    </svg>
  ),
};
