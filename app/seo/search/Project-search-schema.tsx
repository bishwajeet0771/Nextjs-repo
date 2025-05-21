import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import { PHONE_NUMBER } from "../constants";
import { convertToSchemaDate } from "@/common/utils/dateUtils";

export const generateAllSchemas = (
  property: any,
  properties: any[],
  // eslint-disable-next-line no-unused-vars
  index: number
) => {
  const [launchDate, possassionDate] = [
    convertToSchemaDate(property?.launchDate || "Fri Mar 27 00:00:00 IST 2026"),
    convertToSchemaDate(
      property?.possassionDate || "Fri Mar 27 00:00:00 IST 2026"
    ),
  ];
  if (!property) return [];
  const builderAlreadyExists =
    properties?.findIndex((p, index) => {
      return (
        index < properties.indexOf(property) &&
        p.postedByName === property.postedByName
      );
    }) !== -1;
  const PAGE_URL = `${process.env.NEXT_PUBLIC_URL}${createProjectLinkUrl({
    city: property.city,
    slug: property.projName,
    locality: property.locality,
    projIdEnc: property.projIdEnc,
  })}`;
  const allSizesSchemas = property.coverUrl.split(",").map((url: string) => {
    const OrgName = property.projName?.split(" ")[0];
    return {
      "@type": "ImageObject",
      contentUrl: url,
      license: "https://www.getrightproperty.com/privacy-policy",
      acquireLicensePage: "https://www.getrightproperty.com/privacy-policy",
      creditText: `${property.projName} Cover Image`,
      creator: {
        "@type": "Person",
        name: OrgName,
      },
      copyrightNotice: OrgName,
    };
  });
  const desc = `${property.projName} for sale in ${property.locality}, ${
    property.city
  }. Explore ${property.projName} project offering ${property.bhkNames.join(
    ", "
  )} configurations with prices ranging from ₹${property.minPrice.toLocaleString()} to ₹${property.maxPrice.toLocaleString()}. View Project Details, Price, Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details.`;

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        name: `${property.projName || ""} ${property.propType || ""} ${
          property.locality ? `in ${property.locality}` : ""
        } ${property.city ? `, ${property.city}` : ""}`.trim(),
        description: desc || "",
        url: PAGE_URL,
        datePosted: launchDate || new Date().toISOString(),
        postalCode: property.pincode || "",
        streetAddress: property.address || "",
        image:
          property.coverUrl?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        offers: {
          "@type": "Offer",
          price: property.minPrice || "0",
          priceCurrency: "INR",
          availability:
            property.projstatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
        },
      },
      {
        "@type": "Product",
        name: `${property.projName || ""} ${property.propType || ""} ${
          property.locality ? `in ${property.locality}` : ""
        }`.trim(),
        description: desc || "",
        image:
          property.coverUrl?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        url: PAGE_URL,
        offers: {
          "@type": "Offer",
          price: property.minPrice || "0",
          priceCurrency: "INR",
          availability:
            property.projstatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
          priceValidUntil: possassionDate || "",
        },
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "4.5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Rahul Kumar",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.5",
          reviewCount: "10",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebPage",
        url: PAGE_URL,
        name: property.projName || "",
        description: desc || "",
        datePublished: launchDate || new Date().toISOString(),
        image:
          property.coverUrl?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
      },
      ...(builderAlreadyExists
        ? []
        : [
            {
              "@type": "RealEstateAgent",
              name: property.postedByName || "GetRightProperty",
              image:
                property.builderLogo || "https://getrightproperty.com/logo.png",
              priceRange: property.minPrice || "0",
              telephone: PHONE_NUMBER || "",

              address: {
                "@type": "PostalAddress",
                addressLocality: property.builderCity || "",
                addressRegion: property.state || "",
                addressCountry: "IN",
                postalCode: property.pincode || "N/A",
                streetAddress: property.address || "N/A",
              },
            },
          ]),
      {
        "@type": "Place",
        geo: {
          "@type": "GeoCoordinates",
          latitude: property.lat || "",
          longitude: property.lang || "",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: property.address || "",
          addressLocality: property.locality || "",
          addressRegion: property.state || "",
          postalCode: property.pincode || "",
          addressCountry: "IN",
        },
      },
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `https://getrightproperty.com/search?q={search_term_string}&location=${
            property.locality || ""
          }`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "WebSite",
        url: "https://getrightproperty.com/",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://getrightproperty.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SiteNavigationElement",
        name: ["Home", "Properties", property.projName],
        url: [PAGE_URL],
      },
      {
        "@type": "ViewAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: PAGE_URL,
        },
        name: `View ${property.projName || "Property"} Details`,
        description: `View detailed information about ${
          property.projName || "Property"
        } ${property.propType || ""} ${
          property.locality ? `in ${property.locality}` : ""
        } ${property.city ? `, ${property.city}` : ""}`.trim(),
      },
      {
        "@type": "SellAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: PAGE_URL,
        },
        name: `Buy ${property.bhkNames.join(",") || "Property"} In ${
          property.projName || ""
        } ${property.locality ? `in ${property.locality}` : ""} ${
          property.city ? `, ${property.city}` : ""
        }`.trim(),
        priceSpecification: {
          "@type": "PriceSpecification",
          price: property.minPrice || "0",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "RentAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: PAGE_URL,
        },
        name: `Rent ${property.bhkNames.join(",") || "Property"} In ${
          property.projName || ""
        } ${property.locality ? `in ${property.locality}` : ""} ${
          property.city ? `, ${property.city}` : ""
        }`.trim(),
        priceSpecification: {
          "@type": "PriceSpecification",
          price: property.minRentPrice || property.minPrice || "0",
          priceCurrency: "INR",
        },
      },
      ...allSizesSchemas,
    ],
  };

  return schemas;
};

export const ProjectSeachSchema = ({
  properties,
  pageUrl,
}: {
  properties: any;
  pageUrl: string;
}) => {
  if (!Array.isArray(properties)) return null;
  let PAGE_IMAGE = "";
  const results = properties
    .map((property: any, index: number) => {
      if (!PAGE_IMAGE) {
        PAGE_IMAGE = property.coverUrl?.split(",")[0];
      }
      return generateAllSchemas(property, properties, index);
    })
    .filter(Boolean);

  if (!results.length) return null;
  const pagetitle = cleanHeading(pageUrl);
  const address = pagetitle.split("In")[1];
  return (
    <>
      <script
        id="projSearchScript1"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(results),
        }}
      />
      <script
        id="projSearchScript2"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Property Listings - ${pagetitle}`,
            description: `Browse through our curated list of properties in ${pagetitle}`,
            numberOfItems: properties.length,
            itemListElement: properties.map((property, index) => {
              const desc = `${property.projName} for sale in ${
                property.locality
              }, ${property.city}. Explore ${
                property.projName
              } project offering ${property.bhkNames.join(
                ", "
              )} configurations with prices ranging from ₹${property.minPrice.toLocaleString()} to ₹${property.maxPrice.toLocaleString()}. View Project Details, Price, Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details.`;

              return {
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Apartment",
                  name: property.projName,
                  description: desc || "",
                  image:
                    property.coverUrl?.split(",")[0] ||
                    "https://getrightproperty.com/default-property.jpg",
                  url: createProjectLinkUrl({
                    city: property.city,
                    slug: property.projName,
                    locality: property.locality,
                    projIdEnc: property.projIdEnc,
                  }),
                  offers: {
                    "@type": "Offer",
                    price: property.minPrice || "0",
                    priceCurrency: "INR",
                  },
                },
              };
            }),
          }),
        }}
      />
      <script
        id="projSearchScript3"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@type": "Apartment",
            name: `Luxury ${pagetitle}`,
            description:
              "A luxurious apartment with modern amenities and stunning views.",
            address: {
              "@type": "PostalAddress",
              addressLocality: address,
              addressRegion: "Bengaluru",
              addressCountry: "IN",
            },
            amenities: [
              "Gym",
              "Swimming Pool",
              "24/7 Security",
              "Parking",
              "Garden",
            ],
            image: "https://example.com/image.jpg",
            url: pageUrl,
          }),
        }}
      />
      <script
        id="projSearchScript4"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            name: pagetitle,
            url: pageUrl,
            primaryImageOfPage: PAGE_IMAGE,
            description: `Search results for ${pagetitle}`,
            isFamilyFriendly: true,
            keywords: pagetitle,
            reviewedBy: {
              "@type": "Organization",
              name: "Get Right Property",
            },
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Nearby Schools",
                description:
                  "Information about schools located in proximity to the property, including their ratings and distance.",
              },
              {
                "@type": "PropertyValue",
                name: "Public Transport",
                description:
                  "Details about the availability of public transport options near the property, including bus and metro stations.",
              },
              {
                "@type": "PropertyValue",
                name: "Shopping Centers",
                description:
                  "List of shopping centers and malls nearby, highlighting convenience for residents.",
              },
              {
                "@type": "PropertyValue",
                name: "Healthcare Facilities",
                description:
                  "Information about nearby hospitals and clinics, ensuring residents have access to healthcare.",
              },
              {
                "@type": "PropertyValue",
                name: "Parks and Recreation",
                description:
                  "Details about parks and recreational areas nearby, promoting a healthy lifestyle.",
              },
            ],
            mainEntity: {
              "@type": "SearchAction",
              query: pagetitle,
              location: {
                "@type": "City",
                name: "Bengaluru",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Whitefield",
                  addressRegion: "Karnataka",
                  addressCountry: "IN",
                },
              },
            },
          }),
        }}
      />
      <script
        id="projSearchScript5"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "Real Estate Properties Dataset",
            description:
              "A dataset containing various real estate properties available in Bangalore, including details such as price, location, and amenities.",
            creator: {
              "@type": "Organization",
              name: "Getrightproperty",
              url: "https://www.getrightproperty.com",
            },
            dateCreated: new Date().toISOString(),
            distribution: {
              "@type": "DataDownload",
              contentUrl: pageUrl,
              encodingFormat: "application/json",
            },
            includedInDataCatalog: {
              "@type": "DataCatalog",
              name: "Real Estate Listings Catalog",
              url: "https://www.getrightproperty.com/catalog",
            },
            license: "https://creativecommons.org/licenses/by/4.0/",
            variableMeasured: [
              {
                "@type": "PropertyValue",
                name: "Location",
                description: address,
              },
              {
                "@type": "PropertyValue",
                name: "Amenities",
                description:
                  "List of amenities available with the property, including Gym, Swimming Pool, Club House, Children’s Play Area, Security, Power Backup, Car Parking, and more.",
              },
              {
                "@type": "PropertyValue",
                name: "Price Range",
                description:
                  "The price range of properties available, from ₹500000 to ₹600000000.",
              },
              {
                "@type": "PropertyValue",
                name: "Floor Size",
                description:
                  "The floor size of properties ranges from Super Built-Up Area.",
              },
              {
                "@type": "PropertyValue",
                name: "Number of Rooms",
                description: "Properties available with 1 to 6 rooms.",
              },
              {
                "@type": "PropertyValue",
                name: "Number of Bathrooms",
                description: "Properties available with 1 to 6 bathrooms.",
              },
              {
                "@type": "PropertyValue",
                name: "Parking Availability",
                description:
                  "Properties with parking space ranging from 0 to 6 vehicles.",
              },
              {
                "@type": "PropertyValue",
                name: "Furnishing Status",
                description:
                  "Properties available as Unfurnished, Semi-Furnished, and Fully Furnished.",
              },
              {
                "@type": "PropertyValue",
                name: "Property Status",
                description:
                  "Properties categorized as Under Construction or Ready to Move.",
              },
              {
                "@type": "PropertyValue",
                name: "Property Type",
                description:
                  "Available property types include Apartment, Villa, Plot, and Independent House.",
              },
            ],
          }),
        }}
      />
      <script
        id="projSearchScript6"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Available Properties in Bangalore - ${pagetitle}`,

            description: `Discover an extensive collection of available properties in Bangalore, including a diverse range of real estate options such as luxurious apartments, elegant villas, and prime commercial spaces. Whether you're looking for a cozy home or an investment opportunity, our listings cater to all your needs.`,
            mainEntity: [
              {
                "@type": "Apartment",
                name: pagetitle,
                description: `Introducing a stunning ${pagetitle}, a spacious 2 BHK apartment flat located in the vibrant area of Whitefield, Bengaluru. This property offers modern amenities, a comfortable living experience, and is situated close to essential services and entertainment options.`,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: address,
                  addressLocality: "Bengaluru",
                  addressRegion: "Karnataka",
                  addressCountry: "IN",
                },
                image: PAGE_IMAGE,
                url: pageUrl,
                additionalType: "https://schema.org/RealEstateListing",
              },
            ],
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Nearby Schools",
                description:
                  "Information about schools located in proximity to the property, including their ratings and distance.",
              },
              {
                "@type": "PropertyValue",
                name: "Public Transport",
                description:
                  "Details about the availability of public transport options near the property, including bus and metro stations.",
              },
              {
                "@type": "PropertyValue",
                name: "Shopping Centers",
                description:
                  "List of shopping centers and malls nearby, highlighting convenience for residents.",
              },
              {
                "@type": "PropertyValue",
                name: "Healthcare Facilities",
                description:
                  "Information about nearby hospitals and clinics, ensuring residents have access to healthcare.",
              },
              {
                "@type": "PropertyValue",
                name: "Parks and Recreation",
                description:
                  "Details about parks and recreational areas nearby, promoting a healthy lifestyle.",
              },
            ],
          }),
        }}
      />

      <script
        id="projSearchScript7"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the purpose of this page?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `The purpose of this page is to provide detailed information about the property titled ${pagetitle}, including its features, pricing, and availability.`,
                },
              },
              {
                "@type": "Question",
                name: "What is the address of the property?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `The address of the property is${address}.`,
                },
              },
              {
                "@type": "Question",
                name: "What documents do I need to buy a property?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The essential documents needed are sale deed, property tax receipts, encumbrance certificate, approved building plan, and completion certificate. Additional documents may be required based on the property type and location.",
                },
              },
              {
                "@type": "Question",
                name: "How can I find the best property prices in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GetRightProperty helps you find the best property prices in Bangalore by comparing prices across different localities, providing market analysis, and connecting you with verified sellers. Our extensive database includes both ready-to-move and under-construction properties.",
                },
              },
              {
                "@type": "Question",
                name: "What are the benefits of using GetRightProperty for property search?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GetRightProperty offers verified listings, transparent pricing, expert guidance, and a hassle-free property search experience. We provide detailed property information, high-quality images, and direct contact with property owners and agents.",
                },
              },
              {
                "@type": "Question",
                name: "Which are the top investment areas in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Popular investment areas in Bangalore include Whitefield, Electronic City, Sarjapur Road, and Hebbal. These areas offer good appreciation potential, infrastructure development, and proximity to IT hubs. GetRightProperty can help you find the best properties in these locations.",
                },
              },
              {
                "@type": "Question",
                name: "What price ranges are available for properties in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Property prices in Bangalore vary by location and type. Apartments range from ₹40 lakhs to ₹5 crores, while villas start from ₹1 crore. GetRightProperty offers options across all budget ranges with transparent pricing and negotiation assistance.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
};

function cleanHeading(url: string) {
  const ids =
    url
      .replace(/^\//, "")
      .split(process.env.NEXTAUTH_URL ?? "")[1]
      ?.split("-") ?? [];
  const cleaned = ids
    .join(" ")
    .replace(/\b\d*(B|C|G|L|P|CG|SCG|RCG|PJ|")\b/g, "")
    .replace(/\s+/g, " ")
    .replace("/", "")
    .trim();

  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
