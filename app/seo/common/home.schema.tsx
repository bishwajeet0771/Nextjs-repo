import LocalBusinessJsonLdScript from "@/app/seo/Localjson";
import OrganizationSchema from "@/app/seo/OraganisationSchema";
const BASE_URL = process.env.NEXT_PUBLIC_URL;
const viewActionConfigs = [
  {
    title: "Featured Projects",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/search`,
  },
  {
    title: "Ready to Move Sale Listings",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=cg=s-propStatus=R`,
  },
  {
    title: "Ready to Move Rent Listings",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=cg=R-propStatus=R`,
  },
  {
    title: "Featured Plot Listings",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propType=32`,
  },
  {
    title: "Under Construction Sale Listings",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propStatus=U`,
  },
  {
    title: "Under Construction Rent Listings",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propStatus=U-cg=R`,
  },
  {
    title: "Independent Sale Listings",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propType=36-cg=S`,
  },
  {
    title: "Independent Rent Listings",
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/search/listing?sf=propType=36-cg=R`,
  },
];

let homeLinksData = [
  {
    name: "Home",
    url: BASE_URL,
  },
  {
    name: "Post Property",
    url: `${BASE_URL}/post-your-listing`,
  },
  {
    name: "Post Project",
    url: `${BASE_URL}/post-your-project`,
  },
  {
    name: "Compare Property And Projects",
    url: `${BASE_URL}/your-profile/compares`,
  },
  { name: "Your Best Real Estate Guide", url: `${BASE_URL}/contact` },
  {
    name: "Individual Signup",
    url: `${BASE_URL}/register/individual`,
  },
  {
    name: "Agent Signup",
    url: `${BASE_URL}/register/agent`,
  },
  {
    name: "Builder Signup",
    url: `${BASE_URL}/register/builder`,
  },
  {
    url: "https://www.getrightproperty.com/buying-guide",
    name: "Buying Guide",
  },
  { url: "https://www.getrightproperty.com/about", name: "About Us" },
  { url: "https://www.getrightproperty.com/team", name: "Our Team" },
  { url: "https://www.getrightproperty.com/careers", name: "Careers" },
  { url: "https://www.getrightproperty.com/get-in-touch", name: "Contact Us" },
  {
    url: "https://www.getrightproperty.com/privacy-policy",
    name: "Our Privacy Policy",
  },
  {
    url: "https://www.getrightproperty.com/terms-and-conditions",
    name: "Terms And Conditons",
  },
  {
    url: "https://www.getrightproperty.com/blog",
    name: "GetRight Property Blogs",
  },
  {
    url: "https://www.getrightproperty.com/search",
    name: "Projects Search",
  },

  { url: "https://www.getrightproperty.com/builders", name: "Builders" },
  {
    url: "https://www.getrightproperty.com/search/listing",
    name: "Listings Search",
  },
  {
    url: "https://www.getrightproperty.com/residential-listings",
    name: "Residentail Listings",
  },
  {
    url: "https://www.getrightproperty.com/residential",
    name: "Residential Projects",
  },

  { url: "https://www.getrightproperty.com/forgot", name: "Forgot Us" },
  {
    url: "https://www.getrightproperty.com/abc/video",
    name: "GetRright Properties Videos",
  },
  {
    url: "https://www.getrightproperty.com/market-trends/locality-insights",
    name: "Locality Insights",
  },
  {
    url: "https://www.getrightproperty.com/market-trends/news",
    name: "Our News",
  },
  {
    url: "https://www.getrightproperty.com/selling-tips",
    name: "Selling Tips",
  },

  { url: "https://www.getrightproperty.com/sitemap.xml", name: "SiteMap" },
  { url: "https://www.getrightproperty.com/robots.txt", name: "Robots TXT" },
  { url: "https://www.getrightproperty.com/login", name: "Login" },
  { url: "https://www.getrightproperty.com/register", name: "Register" },
  {
    url: "https://www.getrightproperty.com/register/agent",
    name: "Register Agent",
  },
  {
    url: "https://www.getrightproperty.com/register/builder",
    name: "Register Builder",
  },
  {
    url: "https://www.getrightproperty.com/register/individual",
    name: "Register Individual",
  },
];
// const viewActionJsonLd = ;
export const viewActionJsonLd = {
  "@context": "https://schema.org",
  "@graph": homeLinksData.map((item) => ({
    "@type": "SiteNavigationElement",
    name: item.name,
    url: item.url,
  })),
};
export const homeSiteNavigationSchemaData = {
  "@context": "https://schema.org",
  "@graph": viewActionConfigs.map(({ title, url }) => ({
    "@context": "https://schema.org",
    "@type": "ViewAction",
    name: title,
    target: url,
  })),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Get Right Property",
  url: "https://getrightproperty.com",
  description:
    "Find your perfect property in Bangalore with GetRightProperty - Your trusted real estate partner",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://getrightproperty.com/search?sf={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=100066833915037",
    "https://x.com/getrightproperty",
    "https://www.instagram.com/_getrightproperty_/?utm_source=qr#",
    "https://www.linkedin.com/company/get-right-property/",
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GetRightProperty",
  description:
    "A comprehensive real estate platform for property search, listing, and comparison in Bangalore",
  image:
    "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
  category: "Real Estate Services",
  brand: {
    "@type": "Brand",
    name: "GetRightProperty",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    offerCount: "1000",
    highPrice: "50000000",
    lowPrice: "500000",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "100",
  },
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  itemOffered: {
    "@type": "Service",
    name: "Property Listing Service",
    description:
      "List your property for free on GetRightProperty and reach thousands of potential buyers and tenants",
  },
  price: "N/A",
  priceCurrency: "INR",
  availability: "https://schema.org/InStock",
  seller: {
    "@type": "Organization",
    name: "GetRightProperty",
    url: "https://getrightproperty.com",
  },
  areaServed: {
    "@type": "City",
    name: "Bangalore",
  },
  deliveryLeadTime: {
    "@type": "QuantitativeValue",
    minValue: "1",
    maxValue: "2",
    unitCode: "DAY",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Homepage",
  url: "https://www.getrightproperty.com",
  description:
    "Discover properties for sale and rent across India. Get Right Property offers a user-friendly platform to post listings, connect with buyers and sellers, and stay updated with the latest real estate trends.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://www.getrightproperty.com",
  },
};
// const breadcrumbSchema = {
//   "@context": "https://schema.org",
//   "@type": "BreadcrumbList",
//   itemListElement: homeLinksData.map((value, index) => ({
//     "@type": "ListItem",
//     position: index + 1,
//     item: {
//       "@id": value.url,
//       name: value.name,
//       url: value.url,
//     },
//   })),
// };

const FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is GetRightProperty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GetRightProperty is a platform that helps you find the best property prices in Bangalore by comparing prices across different localities, providing market analysis, and connecting you with verified sellers. Our extensive database includes both ready-to-move and under-construction properties.",
      },
    },
    {
      "@type": "Question",
      name: "Is GetRightProperty free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, GetRightProperty is a completely free platform. You can post property listings and projects at no cost. There are no hidden charges or fees.",
      },
    },
    {
      "@type": "Question",
      name: "Who can post properties on GetRightProperty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Property owners, agents, and builders can sign up and post their property listings and projects for free. We offer unlimited listings for individuals and businesses.",
      },
    },
    {
      "@type": "Question",
      name: "How does GetRightProperty help buyers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buyers can compare property prices, set property alerts, and access detailed listings with multiple images. Our service team assists both buyers and sellers in securing the best deal by providing market insights and direct support.",
      },
    },
    {
      "@type": "Question",
      name: "Does GetRightProperty assist in getting the best property deal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our dedicated service team helps both buyers and sellers negotiate the best property deals. We ensure a smooth transaction and assist with all necessary formalities.",
      },
    },
    {
      "@type": "Question",
      name: "Does GetRightProperty have partnerships with real estate companies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we have partnered with many leading real estate companies, builders, and developers. This allows us to offer exclusive deals and insights to our users.",
      },
    },
    {
      "@type": "Question",
      name: "Can GetRightProperty help me post my listing or project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! If you need help posting your property or project, our service team will handle the listing process for you at no cost. We make it easy for you to showcase your property.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can I post a property listing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can add detailed property information within 60 seconds. Our user-friendly platform makes it easy to upload multiple images, set property alerts, and manage your listings efficiently.",
      },
    },
    {
      "@type": "Question",
      name: "What type of properties can I list on GetRightProperty?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can list residential and commercial properties, including apartments, independent houses, villas, plots, office spaces, and shops. Both ready-to-move and under-construction properties are supported.",
      },
    },
    {
      "@type": "Question",
      name: "Can I showcase my property for rent or sale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can list your property as either 'For Sale' or 'For Rent'. This allows potential buyers and tenants to find your property easily.",
      },
    },
    {
      "@type": "Question",
      name: "Does GetRightProperty provide a map with nearby amenities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our property details page includes an interactive map showing nearby amenities such as schools, hospitals, malls, and public transport, helping buyers make informed decisions.",
      },
    },
    {
      "@type": "Question",
      name: "How do I track responses and views for my listing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can monitor the performance of your listings through our platform. We provide data on views, inquiries, and search rankings to help you optimize your listings.",
      },
    },
    {
      "@type": "Question",
      name: "How does GetRightProperty compare listings and projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GetRightProperty offers one of the largest property comparisons in India, helping users compare listings and projects across different locations, price ranges, and property types. We provide insights on market trends, builder reputations, and real-time price variations to ensure you get the best deal.",
      },
    },
  ],
};

export const HomeSiteNavigationSchema = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSiteNavigationSchemaData),
        }}
      />

      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      /> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerSchema),
        }}
      />
      {/* <script
        id="homeScript5"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      /> */}
      <OrganizationSchema />
      <LocalBusinessJsonLdScript />

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
            "@type": "Restaurant",
            image: [
              "https://example.com/photos/1x1/photo.jpg",
              "https://example.com/photos/4x3/photo.jpg",
              "https://example.com/photos/16x9/photo.jpg",
            ],
            name: "Dave's Steak House",
            address: {
              "@type": "PostalAddress",
              streetAddress: "148 W 51st St",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10019",
              addressCountry: "US",
            },
            review: {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: 4,
                bestRating: 5,
              },
              author: {
                "@type": "Person",
                name: "Lillian Ruiz",
              },
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 40.761293,
              longitude: -73.982294,
            },
            url: "https://www.example.com/restaurant-locations/manhattan",
            telephone: "+12122459600",
            servesCuisine: "American",
            priceRange: "$$$",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday"],
                opens: "11:30",
                closes: "22:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Wednesday", "Thursday", "Friday"],
                opens: "11:30",
                closes: "23:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "16:00",
                closes: "23:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "16:00",
                closes: "22:00",
              },
            ],
            menu: "https://www.example.com/menu",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(viewActionJsonLd),
        }}
      />
    </>
  );
};
