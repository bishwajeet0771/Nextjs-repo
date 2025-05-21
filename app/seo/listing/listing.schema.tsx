import { Place } from "schema-dts";
import { DOMAIN, PRICE_CURRENY, PHONE_NUMBER } from "../constants";
import { convertToSchemaDate } from "@/common/utils/dateUtils";

interface ListingSchemaProps {
  nearByLocations: any;
  listing: any;
  faqData: any;
  title: string;
  url: string;
}

export const generateListingSchema = ({
  nearByLocations,
  listing,
  faqData,
  title,
  url,
}: ListingSchemaProps) => {
  const desc = `Searching ${listing.bhkName ?? ""} ${listing.propTypeName} ${
    listing.propName
  }, for ${listing.cg === "S" ? " Sale" : " Rent"} in ${
    listing.ltName
  }, Bangalore. Get a verified search on Get Right property. New Age Property Portal.`;

  const availableFrom = convertToSchemaDate(listing?.availableFrom);
  const nearByLocationsSchema: Place[] = [];
  if (nearByLocations) {
    for (const category in nearByLocations) {
      nearByLocations[category]?.forEach((location: any) => {
        if (location?.name && location?.lat && location?.lang) {
          nearByLocationsSchema.push({
            "@type": "Place",
            name: location.name,
            geo: {
              "@type": "GeoCoordinates",
              latitude: location.lat,
              longitude: location.lang,
            },
            additionalType: "https://schema.org/PropertyValue",
            additionalProperty: {
              "@type": "PropertyValue",
              name: category,
              value: location.distance ?? 0,
            },
          });
        }
      });
    }
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title || "N/A",
        url: url || "N/A",
        description: desc || "N/A",
        mainEntity: {
          "@type": "RealEstateListing",
          url: url || "N/A",
          datePosted: listing?.createdAt || new Date().toISOString(),
          availableFrom: availableFrom,
          description: desc || "N/A",
          name: title || "N/A",
          identifier: listing?.propIdEnc || "N/A",
          price: {
            "@type": "MonetaryAmount",
            currency: "INR",
            value: listing?.price || 0,
          },
          numberOfRooms:
            listing?.propTypeName !== "Plot" ? listing?.nobt || "N/A" : "N/A",
          floorSize:
            listing?.propTypeName !== "Plot"
              ? {
                  "@type": "QuantitativeValue",
                  value: listing?.sba || 0,
                  unitCode: "SqFt",
                }
              : "N/A",
          address: {
            "@type": "PostalAddress",
            streetAddress: listing?.address || "N/A",
            addressLocality: listing?.ltName || "N/A",
            addressRegion: listing?.stateName || "N/A",
            postalCode: listing?.pinCode || "N/A",
            addressCountry: "IN",
          },
          image: listing?.projMedia?.coverImageUrl?.split(",")[0] || "N/A",
          telephone: PHONE_NUMBER || "N/A",
        },
      },
      {
        "@type":
          listing?.propTypeName === "Apartment"
            ? "Apartment"
            : listing?.propTypeName === "Villament"
            ? "House"
            : listing?.propTypeName === "Plot"
            ? "RealEstateListing"
            : listing?.propTypeName === "Villa"
            ? "RealEstateListing"
            : listing?.propTypeName === "Row House"
            ? "RealEstateListing"
            : listing?.propTypeName === "Independent House/Building"
            ? "ResidentialBuilding"
            : "Apartment",
        name: title || "N/A",
        description: desc || "N/A",
        numberOfRooms:
          listing?.propTypeName !== "Plot" ? listing?.nobt || "N/A" : "N/A",
        floorSize:
          listing?.propTypeName !== "Plot"
            ? {
                "@type": "QuantitativeValue",
                value: listing?.sba || 0,
                unitCode: "SqFt",
              }
            : "N/A",
        address: {
          "@type": "PostalAddress",
          streetAddress: listing?.address || "N/A",
          addressLocality: listing?.ltName || "N/A",
          addressRegion: listing?.stateName || "N/A",
          postalCode: listing?.pinCode || "N/A",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: listing?.lat || 0,
          longitude: listing?.lang || 0,
        },
        image: listing?.projMedia?.coverImageUrl?.split(",")[0] || "N/A",
        url: url || "N/A",
        telephone: PHONE_NUMBER || "N/A",
        amenityFeature:
          listing?.propTypeName !== "Plot" && listing?.amenities
            ? listing.amenities.map((amenity: number) => ({
                "@type": "LocationFeatureSpecification",
                name: amenity.toString(),
                value: "true",
              }))
            : "N/A",
        numberOfBathroomsTotal:
          listing?.propTypeName !== "Plot"
            ? listing?.bathRooms || "N/A"
            : "N/A",
        yearBuilt:
          listing?.propTypeName !== "Plot"
            ? listing?.yearBuilt || "N/A"
            : "N/A",
        floorLevel: ["Apartment", "Residential Building"].includes(
          listing?.propTypeName || ""
        )
          ? listing?.floorNo || "N/A"
          : "N/A",
      },
      {
        "@type": "Product",
        name: title || "N/A",
        description: desc || "N/A",
        image: listing?.projMedia?.coverImageUrl?.split(",")[0] || "N/A",
        url: url || "N/A",
        brand: {
          "@type": "Brand",
          name: listing?.postedByName || "N/A",
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
        offers: {
          "@type": "Offer",
          url: url || "N/A",
          price: listing?.price || 0,
          priceCurrency: PRICE_CURRENY || "INR",
          availability: "https://schema.org/InStock",
          availabilityStarts: availableFrom,
          seller: {
            "@type": "Organization",
            name: listing?.postedByName || "N/A",
          },
          priceValidUntil: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          itemCondition:
            listing?.furnishType === "Fully Furnished"
              ? "https://schema.org/UsedCondition"
              : "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: listing?.rating ?? 4.5,
          reviewCount: listing?.reviewCount || 5,
          bestRating: "5",
          worstRating: "1",
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Property Type",
            value: listing?.propTypeName || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Location",
            value: `${listing?.ltName || "N/A"}, ${
              listing?.stateName || "N/A"
            }`,
          },
          {
            "@type": "PropertyValue",
            name: "Area",
            value: listing?.sba || 0,
            unitCode: "SqFt",
          },
          {
            "@type": "PropertyValue",
            name: "Bedrooms",
            value: listing?.nobt || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Bathrooms",
            value: listing?.bathRooms || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Floor Number",
            value: listing?.floorNo || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Furnishing Status",
            value: listing?.furnishType || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Year Built",
            value: listing?.yearBuilt || "N/A",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          ...(faqData?.map((faq: any) => ({
            "@type": "Question",
            name: faq?.faqQuestion || "N/A",
            acceptedAnswer: {
              "@type": "Answer",
              text: faq?.faqAnswer || "N/A",
            },
          })) || []),
          {
            "@type": "Question",
            name: `How can I contact the owner of ${
              listing?.propName || "this property"
            }?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `You can contact the owner of ${
                listing?.propName || "this property"
              } by clicking on the contact button on the property listing page. Our team will connect you with the owner directly.`,
            },
          },
          {
            "@type": "Question",
            name: `What is the price of ${
              listing?.propName || "this property"
            }?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The price of ${
                listing?.propName || "this property"
              } is Rs. ${
                listing?.price || 0
              }. Please contact us for detailed pricing information and negotiations.`,
            },
          },
          {
            "@type": "Question",
            name: `Is ${
              listing?.propName || "this property"
            } available for immediate possession?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Please contact us to know the exact possession status of ${
                listing?.propName || "this property"
              }. We will provide you with all the necessary details about availability and possession timeline.`,
            },
          },
        ],
      },
      {
        "@type": "PropertyValue",
        name: title || "N/A",
        unitText: "INR",
        propertyID: listing?.id || "N/A",
        unitCode: "INR",
        value: (listing?.price || 0) * 0.1,
      },
      {
        "@type": "PropertyValue",
        name: title || "N/A",
        value: listing?.price || 0,
        unitText: "INR",
        propertyID: listing?.id || "N/A",
        unitCode: "INR",

        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "bedrooms",
            value: listing?.bhk ?? "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "furnishing",
            value: listing?.furnishType || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "propertyType",
            value: listing?.propType || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "area",
            value: listing?.sba || 0,
            unitText: "sq ft",
          },
        ],
      },
      {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: listing?.ltName || "N/A",
        addressRegion: listing?.ctName || "N/A",
        streetAddress: listing?.address || "N/A",
        postalCode: listing?.pincode || "N/A",
      },
      {
        "@type": "GeoCoordinates",
        latitude: listing?.lat || 0,
        longitude: listing?.lang || 0,
      },
      {
        "@type": "ViewAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${DOMAIN || ""}property/${listing?.propIdEnc || ""}`,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
            "https://schema.org/AndroidPlatform",
            "https://schema.org/IOSPlatform",
          ],
        },
        expectsAcceptanceOf: {
          "@type": "Offer",
          price: listing?.price || 0,
          priceCurrency: PRICE_CURRENY || "INR",
        },
      },
      {
        "@type": "SpecialAnnouncement",
        name: `${title || "Property"} - Limited Time Offer`,
        text: `Special discount available on ${title || "Property"} - Premium ${
          listing?.propTypeName || "Property"
        } in ${
          listing?.ltName || "N/A"
        }. Book now to avail exclusive prices starting from ${
          listing?.price || 0
        }`,
        datePosted: new Date(listing?.createdAt || new Date()).toISOString(),
        expires: new Date(listing?.updatedAt || new Date()).toISOString(),
        spatialCoverage: {
          "@type": "Place",
          name: listing?.ltName || "N/A",
          address: {
            "@type": "PostalAddress",
            addressLocality: listing?.ltName || "N/A",
            addressRegion: listing?.ctName || "N/A",
            addressCountry: "IN",
          },
        },
      },
      ...nearByLocationsSchema,
      {
        "@type": "Dataset",
        name: `${listing?.propTypeName || "Property"} Property Details`,
        description: `This dataset provides comprehensive details about a ${
          listing?.propTypeName || "property"
        } property located in ${listing?.ltName || "N/A"}, ${
          listing.ctName
        }, including its price, area, and status.`,
        creator: {
          "@type": "Organization",
          name: listing?.postedByName || "N/A",
        },
        dateCreated: listing?.createdAt || new Date().toISOString(),
        dateModified: listing?.updatedAt || new Date().toISOString(),
        availableFrom: availableFrom,
        license: "https://creativecommons.org/licenses/by/4.0/",
        variableMeasured: [
          {
            "@type": "PropertyValue",
            name: "Property ID",
            value: listing?.propIdEnc || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Property Type",
            value: listing?.propTypeName || "N/A",
          },
          {
            "@type": "PropertyValue",
            name: "Location",
            value: `${listing?.ltName || "N/A"}, ${listing?.ctName || "N/A"}`,
          },
          {
            "@type": "PropertyValue",
            name: "Price",
            value: listing?.price || 0,
          },
          {
            "@type": "PropertyValue",
            name: "Area",
            value: `${listing?.sba || 0} sq ft`,
          },
          {
            "@type": "PropertyValue",
            name: "Status",
            value: listing?.status || "N/A",
          },
        ],
      },
    ],
  };

  return schemaData;
};

const ListingSchema = ({
  listingData,
}: {
  listingData: ListingSchemaProps;
}) => {
  return (
    <script
      id="listingScript1"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateListingSchema(listingData)),
      }}
    />
  );
};

export default ListingSchema;
