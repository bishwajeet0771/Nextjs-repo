"use client";

import Link from "next/link";

type Props = {
  url: string;
  name:string
};
const ViewAllButton: React.FC<Props> = ({ url, name }) => {
  return (
    <Link
    aria-label={`View details for ${name}`}
      href={url}
      className="inline-flex h-[24px] sm:h-auto max-w-fit justify-center text-[12px] items-center gap-2.5 rounded !p-[4px] !sm:p-[6px] bg-[#41d1d44d] text-white xl:text-[14px] not-italic font-bold leading-[normal] tracking-[0.4px]"
    >
      View Details
    </Link>
  );
};
export default ViewAllButton;
