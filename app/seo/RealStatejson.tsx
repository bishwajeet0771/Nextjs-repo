import Script from "next/script";
import { RealEstateListing, WithContext } from "schema-dts";

const realEstateListingSchema: WithContext<RealEstateListing> = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  name: "Beautiful Family Home in Suburb",
  description:
    "A charming 4-bedroom, 3-bathroom family home located in a quiet suburban neighborhood with excellent schools and amenities.",
  offers: {
    "@type": "Offer",
    price: "350000",
    priceCurrency: "USD",
    itemCondition: "NewCondition",
  },
};

export default function RealStateJSONLD() {
  return (
    <Script
      id="realEstateScript1"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(realEstateListingSchema),
      }}
    />
  );
}
