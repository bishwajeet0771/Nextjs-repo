import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import { PHONE_NUMBER } from "../constants";

export const generateAllSchemas = (property: any) => {
  if (!property) return [];
  const allSizesSchemas =
    property?.coverImage?.split(",").map((url: string) => {
      const OrgName = property.postedByName;
      return {
        "@type": "ImageObject",
        contentUrl: url,
        license: "https://www.getrightproperty.com/privacy-policy",
        acquireLicensePage: "https://www.getrightproperty.com/privacy-policy",
        creditText: `${property.postedByName} Cover Image`,
        creator: {
          "@type": "Person",
          name: OrgName,
        },
        copyrightNotice: OrgName,
      };
    }) ?? [];
  const PAGE_URL = generateListingLinkUrl({
    bhkUnitType: property.bhkName
      ? property.bhkName + "-" + property.propTypeName
      : property.propTypeName,
    category: property.category === "Sale" ? "for-sale" : "for-rent",
    city: property.cityName,
    locality: property.localityName,
    propIdEnc: property.propIdEnc,
    phase: property.phaseName,
    projName: property.projIdEnc && property.propName,
  });
  const cardTitle = `${property.bhkName ?? ""} ${property.facing} facing ${
    property.propTypeName
  } for ${property.category} ${property.postedBy} ${property.propName} ${
    property.localityName
  }`;
  const description = `Looking to buy a premium ${
    property.propTypeName
  } for sale in ${property.localityName}, ${property.cityName}? This ${
    property.facing
  }-facing residential ${
    property.propTypeName
  } is a rare opportunity for home buyers and investors searching for a prime property in one of the most sought-after locations of ${
    property.cityName
  }, ${property.stateName}.

  Located in the prestigious project ${property.propName}, ${
    property.phaseName
  }, this ready to move property for sale is ideal for those seeking a secure investment or a dream home in a well-developed locality. Spread across ${
    property.pa || property.sba
  } sq.ft., this ${property.propTypeName} for sale in ${
    property.localityName
  } offers excellent connectivity to schools, hospitals, shopping malls, and IT hubs of ${
    property.cityName
  }.
  
  Priced competitively at ₹${property.price.toLocaleString()}, this verified property listing is offered directly by the ${
    property.postedBy
  }, ensuring a transparent and hassle-free buying process.
  
  Top Features:
  - ${property.facing} Facing ${property.propTypeName} for Sale
  - Located in ${property.localityName}, ${
    property.cityName
  } — A High-Demand Residential Zone
  - Ready to Move Property
  - Perfect for Residential Investment or Custom Home Construction
  - Excellent Location with Great Connectivity
  - Close to Schools, Hospitals, Malls & IT Parks
  
  Possession is available from ${new Date(
    property.availableFrom
  ).toLocaleDateString()}, making it a quick move-in option for buyers.
  
  Invest in the best real estate property in ${
    property.cityName
  }. Explore this premium residential ${property.propTypeName} for sale in ${
    property.localityName
  }, perfect for families, investors, and builders looking for a future-ready location with high returns.
  
  Contact now to schedule a site visit and grab this exclusive property before it's gone!`;

  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        name: `${property.bhkName} ${property.facing} facing ${property.propTypeName} for ${property.category} ${property.postedBy} ${property.propName} ${property.localityName}`.trim(),
        description,
        url: PAGE_URL,
        datePosted: property.postedDate || new Date().toISOString(),
        image:
          property.coverImage?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        offers: {
          "@type": "Offer",
          price: property.price || "0",
          priceCurrency: "INR",
          availability:
            property.propStatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
        },
      },
      {
        "@type": "Product",
        name: cardTitle,
        description,
        image:
          property.coverImage?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        url: PAGE_URL,
        offers: {
          "@type": "Offer",
          price: property.price || "0",
          priceCurrency: "INR",
          availability:
            property.propStatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
          priceValidUntil:
            property.endDate ||
            property.possassionDate ||
            property.availableFrom ||
            "",
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
          ratingValue: "4.8",
          reviewCount: "150",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "RealEstateAgent",
        name: property.postedByName || "GetRightProperty",
        address: {
          "@type": "PostalAddress",
          addressLocality: property.cityName || "",
          addressRegion: property.stateName || "",
          addressCountry: "IN",
        },
        telephone: PHONE_NUMBER,
        streetAddress: "N/A",
      },
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
          addressLocality: property.localityName || "",
          addressRegion: property.stateName || "",
          addressCountry: "IN",
        },
      },
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `https://getrightproperty.com/search?q={search_term_string}&location=${
            property.localityName || ""
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
        "@type": "ViewAction",
        target: PAGE_URL,
        name: "View Property Details",
        description: `View detailed information about ${
          cardTitle || "this property"
        } located in ${property.localityName || property.cityName || ""}`,
        url: PAGE_URL,
        actionStatus: "https://schema.org/PotentialActionStatus",
      },
      {
        "@type": property.category === "Rent" ? "RentAction" : "SellAction",
        object: {
          "@type": "Residence",
          name: cardTitle || "",
          address: {
            "@type": "PostalAddress",
            streetAddress: property.address || "",
            addressLocality: property.localityName || "",
            addressRegion: property.stateName || "",
            addressCountry: "IN",
          },
        },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: property.price || 0,
          priceCurrency: "INR",
        },
      },
      ...allSizesSchemas,
    ],
  };

  return schemas;
};

export const ListingSearchSchema = ({ properties }: any) => {
  if (!Array.isArray(properties)) return null;
  const results = properties
    .map((property: any) => {
      return generateAllSchemas(property);
    })
    .filter(Boolean);
  if (!results.length) return null;
  const uniqueBuilders = Array.from(
    new Set(properties.map((property: any) => property.postedByName))
  ).filter(Boolean);
  const realEstateAgentSchemas = uniqueBuilders.map((builderName: string) => {
    const builderProperty = properties.find(
      (p: any) => p.postedByName === builderName && p.postedBy === "Builder"
    );
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: builderName || "GetRightProperty",
      address: {
        "@type": "PostalAddress",
        addressLocality: builderProperty?.cityName || "",
        addressRegion: builderProperty?.stateName || "",
        addressCountry: "IN",
      },
      telephone: PHONE_NUMBER,
      streetAddress: "N/A",
    };
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(results),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: properties.map((property: any, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "RealEstateListing",
                name: `${property.bhkName} ${property.facing} facing ${property.propTypeName} for ${property.category} ${property.postedBy} ${property.propName} ${property.localityName}`.trim(),
                url: generateListingLinkUrl({
                  bhkUnitType: property.bhkName
                    ? property.bhkName + "-" + property.propTypeName
                    : property.propTypeName,
                  category: property.cg === "S" ? "for-sale" : "for-rent",
                  city: property.cityName,
                  locality: property.localityName,
                  propIdEnc: property.propIdEnc,
                  phase: property.phaseName,
                  projName: property.projIdEnc && property.propName,
                }),
                image:
                  property.coverImage?.split(",")[0] ||
                  "https://getrightproperty.com/default-property.jpg",
                price: property.price || "0",
                priceCurrency: "INR",
              },
            })),
          }),
        }}
      />
      {realEstateAgentSchemas.map((schema, index) => (
        <script
          key={`${index.toString()}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@type": "FAQPage",
            mainEntity: [
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
                name: "How do I verify property ownership?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can verify property ownership by checking the sale deed, property tax receipts, and obtaining an encumbrance certificate from the sub-registrar's office. It's also recommended to conduct a legal title search.",
                },
              },
              {
                "@type": "Question",
                name: "What are the steps involved in property registration?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Property registration involves document verification, payment of stamp duty and registration charges, signing the sale deed in presence of witnesses, and registering at the sub-registrar's office. The process typically takes 1-2 weeks.",
                },
              },
              {
                "@type": "Question",
                name: "How can I check if a property is legally approved?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "To check legal approval, verify the building plan approval, occupancy certificate, and NOCs from relevant authorities. Also ensure the property is free from any legal disputes or encumbrances.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
};
