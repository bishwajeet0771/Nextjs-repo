import Script from "next/script";
import { Product, WithContext } from "schema-dts";

const generatePropertyJsonLd = (data: any) => {
  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product", // Using Product type for real estate context
    name: data.name,
    description: data.description,
    image: data.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: data.price,
      itemCondition: "https://schema.org/NewCondition", // Adjust as needed, e.g., "https://schema.org/UsedCondition"
      availability: "https://schema.org/InStock",
      url: data.url,
    },
  };

  return jsonLd;
};

const PropertyJsonLdScript = ({ data }: any) => {
  const jsonLd = generatePropertyJsonLd(data);

  return (
    <Script
    id="productionScript1"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default PropertyJsonLdScript;
