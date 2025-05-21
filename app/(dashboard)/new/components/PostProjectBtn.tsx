"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function PostProjectBtn({}: Props) {
  const { data: session } = useSession();
  const url = session
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/post-your-project`
    : `/login`;

  return (
    session?.user.userType === "B" && (
      <Link
        rel="noopener noreferrer"
        // className="inline-flex justify-center items-center gap-1.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] text-white text-xl not-italic font-bold leading-[normal] px-2.5 py-1.5 bg-[#0073c6] pr-8 relative"
        className="inline-flex justify-center items-center gap-1.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] text-white text-[12px] sm:text-[16px] not-italic font-bold leading-[normal] px-2.5 py-1.5 bg-[#0073c6] relative pr-8"
        href={url}
        prefetch={false}
      >
        Post Project{" "}
        <Image
        
          src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/homepage/free.svg`}
          width={36}
          height={36}
          alt="post your Project"
          className="absolute h-[31px] sm:h-[36] right-0 text-[16px]  "
          unoptimized
          title="post your Project"
        />
      </Link>
    )
  );
}
