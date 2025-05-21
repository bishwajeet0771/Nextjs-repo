import React from "react";
import DisClamerReadMore from "./BuilderPageDisClamerReadMore";

type Props = {
  refUrls: string[];
};

export default function BuilderPageDisclamer({ refUrls }: Props) {
  return (
    <div className="bg-gray-100 p-6 mt-12 rounded-lg shadow-md">
      <h2 className="sm:text-xl font-semibold text-[#0073C6] mb-1">
        Disclaimer
      </h2>
      <p className="text-xs sm:text-sm text-gray-700 mb-1">
        The material and information contained herein are for general
        informational purposes only and do not constitute an
        endorsement/warranty/representation/offer.
      </p>
      <h3 className=" sm:text-lg font-semibold text-[#0073C6] mb-1">
        Sources of Information:
      </h3>
      <DisClamerReadMore />
      <div className="flex  space-x-1 flex-wrap">
        {refUrls.map((url: string, index) => {
          return (
            <div
              key={url}
              className="text-xs   hover:text-blue-800 transition duration-200"
            >
              {url} {refUrls.length - 1 !== index && ","}
            </div>
          );
        })}
      </div>
      <p className="text-[13px] text-black  mt-1">
        A Get Right Property website
        <br />
        Copyright © 2024 RPCLAN PROPERTY SERVICES PRIVATE LIMITED All rights
        reserved.
      </p>
    </div>
  );
}
