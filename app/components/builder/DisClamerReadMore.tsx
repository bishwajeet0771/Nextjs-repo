"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function DisClamerReadMore({}: Props) {
  const [isReadMore, setReadMore] = useState(false);
  return (
    <p
      className={clsx(
        "text-sm text-gray-700 mb-1 relative",
        !isReadMore && "line-clamp-1"
      )}
    >
      from{" "}
      <Link prefetch={false} rel="noopener noreferrer"
        href="https://www.getrightproperty.com"
        className="text-blue-600 underline"
      >
        Get Right Property
      </Link>{" "}
      Sources of Information: Project details presented on this page are
      collected from public sources including State RERA websites (wherever
      applicable), project websites created by builders and authorized channel
      partners and official documentation shared by these authorized advertisers
      (project brochure, price list, payment plans). Get Right Property only
      presents this content in an easy format for user research and user
      education and does not own any content. Users are advised to exercise
      caution and validate facts from the builder/promoter before purchase.
      {!isReadMore && (
        <button
          className="text-blue-600 absolute  top-0 right-0 bg-gray-100 pl-1"
          onClick={() => setReadMore(true)}
        >
          Read More...
        </button>
      )}
      {isReadMore && (
        <>
          {" "}
          Get Right Property does not guarantee the accuracy, completeness, or
          reliability of the information provided. The information on this
          website is subject to change without notice. Get Right Property
          assumes no responsibility for any errors or omissions in the content
          provided. Users are encouraged to independently verify all information
          before making any decisions based on the content presented here.
          <button
            className="text-blue-600 ml-2"
            onClick={() => setReadMore(false)}
          >
            Read Less
          </button>
        </>
      )}
    </p>
  );
}




