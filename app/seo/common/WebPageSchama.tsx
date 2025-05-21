import React from "react";

type Props = {
  path: string;
};

export default function WebPageSchama({ path }: Props) {
  const websiteSchama = {
    "@type": "WebSite",
    name: "Get Right Property",
    url: "https://www.getrightproperty.com" + path,
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.getrightproperty.com/search?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  const WebPageSchama = {
    "@type": "WebPage",
    name: "Homepage",
    url: "https://www.getrightproperty.com" + path,
    description:
      "Discover properties for sale and rent across India. Get Right Property offers a user-friendly platform to post listings, connect with buyers and sellers, and stay updated with the latest real estate trends.",
    isPartOf: {
      "@type": "WebSite",
      url: "https://www.getrightproperty.com" + path,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchama),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WebPageSchama),
        }}
      />
    </>
  );
}
