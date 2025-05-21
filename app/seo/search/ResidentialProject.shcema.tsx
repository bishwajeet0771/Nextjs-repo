import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import { PHONE_NUMBER } from "../constants";
import { convertToSchemaDate } from "@/common/utils/dateUtils";
import { baseURL } from "@/app/utils/api/api";
import WebPageSchama from "../common/WebPageSchama";
import OrganizationSchema from "../OraganisationSchema";
import LocalBusinessJsonLdScript from "../Localjson";

export const generateAllSchemas = (
  property: any,
  properties: any[],
  // eslint-disable-next-line no-unused-vars
  index: number
) => {
  // const baseUrl = process.env.NEXT_PUBLIC_PROJECT_URL;
  const [launchDate, possassionDate] = [
    convertToSchemaDate(property?.launchDate || "Fri Mar 27 00:00:00 IST 2026"),
    convertToSchemaDate(
      property?.possassionDate || "Mon Dec 31 00:00:00 IST 2029"
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
  const PAGE_URL = createProjectLinkUrl({
    city: property.city || "Bengaluru",
    slug: property.projName || "Sobha Crystal Meadows",
    locality: property.locality || "Varthur",
    projIdEnc: property.projIdEnc || "4652e580b8cbc19c9f9a731042d315ea",
  });

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
  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        name: `${property.projName || "Sobha Crystal Meadows"} ${
          property.propType || "Row House"
        } ${property.locality ? `in ${property.locality}` : ""} ${
          property.city ? `, ${property.city}` : ""
        }`.trim(),
        description: `Discover a wide range of residential properties including apartments, villas, independent houses, and gated communities. Find your perfect home in prime locations with the best amenities and lifestyle features.`,
        url: PAGE_URL,
        datePosted: launchDate || new Date().toISOString(),
        postalCode: property.pincode || "",
        streetAddress: property.address || "",
        image:
          property.coverUrl?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        offers: {
          "@type": "Offer",
          price: property.minPrice || 104900000,
          priceCurrency: "INR",
          availability:
            property.projstatus?.toLowerCase() === "under construction"
              ? "PreOrder"
              : "InStock",
        },
      },
      {
        "@type": "Product",
        name: `${property.projName || "Sobha Crystal Meadows"} ${
          property.propType || "Row House"
        } ${property.locality ? `in ${property.locality}` : ""}`.trim(),
        description: `Discover a wide range of residential properties including apartments, villas, independent houses, and gated communities. Find your perfect home in prime locations with the best amenities and lifestyle features.`,
        image:
          property.coverUrl?.split(",")[0] ||
          "https://getrightproperty.com/default-property.jpg",
        url: PAGE_URL,
        offers: {
          "@type": "Offer",
          price: property.minPrice || 104900000,
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
        name: property.projName || "Sobha Crystal Meadows",
        description: `Discover a wide range of residential properties including apartments, villas, independent houses, and gated communities. Find your perfect home in prime locations with the best amenities and lifestyle features.`,
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
          addressLocality: property.locality || "Varthur",
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
            property.locality || "Varthur"
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
        name: [
          "Home",
          "Properties",
          property.projName || "Sobha Crystal Meadows",
        ],
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
        } ${property.propType || "Row House"} ${
          property.locality ? `in ${property.locality}` : ""
        } ${property.city ? `, ${property.city}` : ""}`.trim(),
      },
      {
        "@type": "SellAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: PAGE_URL,
        },
        name: `Buy ${property?.bhkNames?.join(",") ?? "Property"} In ${
          property.projName || "Sobha Crystal Meadows"
        } ${property.locality ? `in ${property.locality}` : ""} ${
          property.city ? `, ${property.city}` : ""
        }`.trim(),
        priceSpecification: {
          "@type": "PriceSpecification",
          price: property.minPrice || 104900000,
          priceCurrency: "INR",
        },
      },
      {
        "@type": "RentAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: PAGE_URL,
        },
        name: `Rent ${property?.bhkNames?.join(",") || "Property"} In ${
          property.projName || "Sobha Crystal Meadows"
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

export const ResidentialProjectSchama = ({
  properties,
  pageUrl,
  urls,
  page,
  totalPages,
}: {
  properties: any;
  pageUrl: string;
  urls: string[];
  page: number | null;
  totalPages: number;
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
  const viewActionJsonLd = {
    "@context": "https://schema.org",
    "@graph": urls.map((item: any) => ({
      "@type": "SiteNavigationElement",
      name: item?.split("/").at(-1).split("-").slice(0, -1).join(" "),
      url: item,
    })),
  };
  const FaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of residential properties are listed on GetRightProperty?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GetRightProperty lists a wide range of residential properties in Bangalore, including apartments, villas, independent houses, and gated community projects. Both ready-to-move and under-construction options are available.",
        },
      },
      {
        "@type": "Question",
        name: "Are the residential projects on GetRightProperty verified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all listings go through a verification process. We collaborate with trusted builders and property owners to ensure authenticity and up-to-date information.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compare multiple residential projects on the platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Our platform allows users to compare residential projects based on location, pricing, amenities, builder reputation, and construction status.",
        },
      },
      {
        "@type": "Question",
        name: "Is there any fee for browsing residential properties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, browsing residential projects and property listings on GetRightProperty is completely free. You can explore, compare, and shortlist without any charges.",
        },
      },
      {
        "@type": "Question",
        name: "How does GetRightProperty assist in selecting the right residential property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer personalized recommendations, in-depth property details, location-based filters, market trend insights, and access to site visits. Our expert support team is also available to guide you through the process.",
        },
      },
      {
        "@type": "Question",
        name: "Can I post my residential property on GetRightProperty?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Whether you are an individual owner, agent, or builder, you can post your residential property or project for free. We offer unlimited listings and promotional support.",
        },
      },
      {
        "@type": "Question",
        name: "Does GetRightProperty support listings in all Bangalore localities?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we cover all major and emerging localities in Bangalore including Whitefield, Electronic City, Sarjapur Road, Hebbal, HSR Layout, and many more.",
        },
      },
      {
        "@type": "Question",
        name: "Can I schedule a visit to a residential project through GetRightProperty?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can request a site visit directly from the property page. Our team coordinates with the seller or builder to arrange a convenient time for you.",
        },
      },
    ],
  };

  const description = `Discover a wide range of residential properties including apartments, villas, independent houses, and gated communities. Find your perfect home in prime locations with the best amenities and lifestyle features.`;
  const totalResults = totalPages;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${process.env.NEXT_PUBLIC_URL}${createProjectLinkUrl({
        city: property.city || "Bengaluru",
        slug: property.projName,
        locality: property.locality || "Whitefield",
        projIdEnc: property.projIdEnc,
      })}`,
    })),
    totalItems: totalResults, // Total number of items
    nextPage:
      page && page < totalPages
        ? `${process.env.NEXT_PUBLIC_URL}/residential?page=${page + 1}`
        : null, // URL for the next page
    previousPage:
      page && page > 1
        ? `${process.env.NEXT_PUBLIC_URL}/residential?page=${page - 1}`
        : null, // URL for the previous page
    currentPage: page
      ? `${process.env.NEXT_PUBLIC_URL}/residential?page=${page}`
      : `${process.env.NEXT_PUBLIC_URL}/residential`, // Current page number
  };

  return (
    <>
      <WebPageSchama path={pageUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(viewActionJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Residential Properties",
            url: pageUrl,
            potentialAction: {
              "@type": "SearchAction",
              target: urls.map((url) => ({
                "@type": "EntryPoint",
                urlTemplate: url,
              })),
              query: "search term",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(results),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FaqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Property Listings - ${pagetitle}`,
            description: description,
            numberOfItems: properties.length,
            itemListElement: properties.map((property, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Apartment",
                name: property.projName,
                description: `Discover a wide range of residential properties including apartments, villas, independent houses, and gated communities. Find your perfect home in prime locations with the best amenities and lifestyle features.`,
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
            })),
          }),
        }}
      />
      <script
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": baseURL,
                  name: "Home",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": `${baseURL}/residential${page ? `?page=${page}` : ""}`,
                  name: "Residential Projects",
                },
              },
            ],
          }),
        }}
      />
      <script
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
      <OrganizationSchema />
      <LocalBusinessJsonLdScript />
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
