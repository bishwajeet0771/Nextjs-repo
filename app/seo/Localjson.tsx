import {
  LocalBusiness,
  WithContext,
  PostalAddress,
  ContactPoint,
} from "schema-dts";

interface LocalBusinessData {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    telephone: string;
    email: string;
  };
  openingHours: string[];
  image: string | string[];
  url: string;
  description: string;
  sameAs?: string[];
  geo?: {
    latitude: string;
    longitude: string;
  };
  priceRange?: string;
  servesCuisine?: string | string[];
  menu?: string;
  acceptsReservations?: boolean;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    ratingCount: number;
  };
  reviews?: {
    "@type": "Review";
    author: {
      "@type": "Person";
      name: string;
    };
    datePublished: string;
    reviewBody: string;
    reviewRating?: {
      "@type": "Rating";
      ratingValue: number;
    };
  }[];
}

const generateLocalBusinessJsonLd = (
  // eslint-disable-next-line no-unused-vars
  data: LocalBusinessData
): WithContext<LocalBusiness> => {
  const jsonLd: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "GET RIGHT PROPERTY",
    url: "https://www.getrightproperty.com/",
    description:
      "Your premier real estate partner in Bengaluru, offering expert guidance for buying, selling, and renting properties.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Office No 15, 3rd Floor, Gamma Block, Sigma Soft Tech Park",
      addressLocality: "Whitefield",
      addressRegion: "KA",
      postalCode: "560066",
      addressCountry: "IN",
    } as PostalAddress,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 8884440963",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "ta", "te", "kn", "ml", "hi", "bn"],
    } as ContactPoint,
    openingHours: ["Mo-Sa 09:00-18:00"],
    image: [
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-full.webp",
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
    ],
    sameAs: [
      "https://www.facebook.com/getrightproperty",
      "https://twitter.com/getrightproperty",
      "https://www.linkedin.com/company/getrightproperty",
      // Add other social media profiles if available
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.9699", // Example latitude for Bengaluru - replace with actual if known
      longitude: "77.7497", // Example longitude for Bengaluru - replace with actual if known
    },
  };

  return jsonLd;
};

interface LocalBusinessJsonLdScriptProps {
  data?: LocalBusinessData; // Making data optional and providing default values
}

const LocalBusinessJsonLdScript: React.FC<LocalBusinessJsonLdScriptProps> = ({
  data,
}) => {
  const localBusinessData: LocalBusinessData = {
    name: "GET RIGHT PROPERTY",
    address: {
      streetAddress:
        "Office No 15, 3rd Floor, Gamma Block, Sigma Soft Tech Park",
      addressLocality: "Whitefield",
      addressRegion: "KA",
      postalCode: "560066",
      addressCountry: "IN",
    },
    contactPoint: {
      telephone: "+91 8884440963", // Added the missing telephone here
      email: "info@getrightproperty.com", // Added a placeholder email - replace with actual
    },
    openingHours: ["Mo-Sa 09:00-18:00"],
    image: [
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-full.webp",
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
    ],
    url: "https://www.getrightproperty.com/",
    description:
      "Your premier real estate partner in Bengaluru, offering expert guidance for buying, selling, and renting properties.",
    sameAs: [
      "https://www.facebook.com/getrightproperty",
      "https://twitter.com/getrightproperty",
      "https://www.linkedin.com/company/getrightproperty",
    ],
  };

  const jsonLd = generateLocalBusinessJsonLd(data || localBusinessData);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default LocalBusinessJsonLdScript;
