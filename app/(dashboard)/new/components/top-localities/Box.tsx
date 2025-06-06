import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = { name: string; id: number; type: string; url: string };

export default function Box({ id, name, url }: Props) {
  return (
    <Link
      rel="noopener noreferrer"
      prefetch={false}
      className="flex flex-col items-center justify-center gap-[18px] text-[#242424]  text-base sm:text-[20px] not-italic font-semibold leading-[normal]"
     /*  href={encodeURIComponent(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/search?sf=localities=${name}%2B${id}-listedBy=All`
      )} */
        href={
          /* `${process.env.NEXT_PUBLIC_BACKEND_URL}/search?sf=${encodeURIComponent(`localities=${name}+${id}-listedBy=All`)}` */
           `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=${encodeURIComponent(`localities=${name}+${id}`)}`
        }
    >
       
      <Image
        src={url}
        alt="box"
        width={180}
        height={180}
        className="h-[80px] w-[80px] sm:h-[140px] xl:h-[180px] min-w-[80px] sm:min-w-[140px] xl:min-w-[180px] sm:max-w-[140px] xl:max-w-[180px] self-stretch border-[color:var(--stroke-blue-gradient,#41D1D4)] shadow-[0px_4px_25px_0px_rgba(194,194,194,0.76)] rounded-full border-[2px] sm:border-[4px] border-solid"
      />
      <p className="flex justify-center items-center gap-[2px] sm:gap-2 text-nowrap capitalize text-[12px] sm:text-[18px] xl:text-[20px] ">
        {config.locationIcon}
        {name}
      </p>
    </Link>
  );
}

const config = {
  locationIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      className="min-h-[14px] min-w-[14px] max-h-[14px] max-w-[14px]    sm:min-h-[20px] sm:min-w-[20px] sm:max-h-[20px] sm:max-w-[20px]    xl:min-h-[24px] xl:min-w-[24px] xl:max-h-[24px] xl:max-w-[24px]"
    >
      <path
        d="M16 18C15.0111 18 14.0444 17.7068 13.2222 17.1574C12.3999 16.6079 11.759 15.8271 11.3806 14.9134C11.0022 13.9998 10.9031 12.9945 11.0961 12.0246C11.289 11.0546 11.7652 10.1637 12.4645 9.46447C13.1637 8.76521 14.0546 8.289 15.0246 8.09608C15.9945 7.90315 16.9998 8.00217 17.9134 8.3806C18.8271 8.75904 19.6079 9.39991 20.1574 10.2222C20.7068 11.0444 21 12.0111 21 13C20.9984 14.3256 20.4711 15.5964 19.5338 16.5338C18.5964 17.4711 17.3256 17.9984 16 18ZM16 10C15.4067 10 14.8266 10.1759 14.3333 10.5056C13.8399 10.8352 13.4554 11.3038 13.2284 11.852C13.0013 12.4001 12.9419 13.0033 13.0576 13.5853C13.1734 14.1672 13.4591 14.7018 13.8787 15.1213C14.2982 15.5409 14.8328 15.8266 15.4147 15.9424C15.9967 16.0581 16.5999 15.9987 17.1481 15.7716C17.6962 15.5446 18.1648 15.1601 18.4944 14.6667C18.8241 14.1734 19 13.5933 19 13C18.9992 12.2046 18.6829 11.442 18.1204 10.8796C17.558 10.3171 16.7954 10.0008 16 10Z"
        fill="black"
      />
      <path
        d="M16 30L7.56401 20.051C7.44679 19.9016 7.33078 19.7513 7.21601 19.6C5.77571 17.7014 4.99733 15.3831 5.00001 13C5.00001 10.0826 6.15893 7.28473 8.22183 5.22183C10.2847 3.15893 13.0826 2 16 2C18.9174 2 21.7153 3.15893 23.7782 5.22183C25.8411 7.28473 27 10.0826 27 13C27.0023 15.382 26.2243 17.6991 24.785 19.597L24.784 19.6C24.784 19.6 24.484 19.994 24.439 20.047L16 30ZM8.81301 18.395C8.81301 18.395 9.04601 18.703 9.09901 18.769L16 26.908L22.91 18.758C22.954 18.703 23.188 18.393 23.189 18.392C24.3662 16.8411 25.0024 14.947 25 13C25 10.6131 24.0518 8.32387 22.364 6.63604C20.6761 4.94821 18.387 4 16 4C13.6131 4 11.3239 4.94821 9.63605 6.63604C7.94822 8.32387 7.00001 10.6131 7.00001 13C6.99754 14.9483 7.63445 16.8436 8.81301 18.395Z"
        fill="black"
      />
    </svg>
  ),
};
