/* eslint-disable no-unused-vars */
import Script from "next/script";
import { VideoObject, WithContext } from "schema-dts";

const generateFAQJsonLd = (data: any) => {
  const jsonLd: WithContext<VideoObject> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
  };
  return jsonLd;
};

const VideoJsonLdScript = (data: any) => {
  const jsonLd = generateFAQJsonLd(data);
  return (
    <Script
    id="videoScript1"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default VideoJsonLdScript;
