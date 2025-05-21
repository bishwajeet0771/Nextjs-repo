import Script from "next/script";
import { SiteNavigationElement, WithContext } from "schema-dts";

const generateFAQJsonLd = (data: any) => {
  const jsonLd: WithContext<SiteNavigationElement> = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: data.name,
    description: data.description,
    // duration publishDate size
    thumbnailUrl: `${process.env.NEXT_PUBLIC_PROJECT_URL}/staticmedia-images-icons/grp-logo/Logo-without-background.png`,
    // contentUrl: data.contentUrl,
    // contentSize: data.contentSize,
    // duration: "PT2M",
    // regionsAllowed: "ALL",
  };
  return jsonLd;
};

const BreadJsonLdScript = (data: any) => {
  const jsonLd = generateFAQJsonLd(data);
  return (
    <Script
    id="BreadCrumbsScript5"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default BreadJsonLdScript;
