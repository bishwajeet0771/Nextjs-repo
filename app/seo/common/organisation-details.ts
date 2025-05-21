export const Organization_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.getrightproperty.com/#organization",
  name: "GET RIGHT PROPERTY",
  url: "https://www.getrightproperty.com",
  logo: {
    "@type": "ImageObject",
    url: "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91 8884440963",
      contactType: "Customer Service",
      areaServed: "IN",
      availableLanguage: [
        "English",
        "Tamil",
        "Telugu",
        "Kannada",
        "Malayalam",
        "Hindi",
        "Bengali",
      ],
    },
  ],
  sameAs: [
    "https://www.facebook.com/getrightproperty",
    "https://twitter.com/getrightproperty",
    "https://www.linkedin.com/company/getrightproperty",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No 15 3rd Floor Gamma Block Sigma Soft Tech Park",
    addressLocality: "Whitefield",
    addressRegion: "KA",
    postalCode: "560066",
    addressCountry: "IN",
  },
  founder: [
    {
      "@type": "Person",
      name: "Rahul Vishwakarma",
    },
  ],
  foundingDate: "2025-02-07",
  description:
    "We are a premier real estate agency offering buying, selling, and rental services for residential properties.",
  department: [
    {
      "@type": "Organization",
      name: "Sales Department",
      employee: [
        {
          "@type": "Person",
          name: "Abhishek Kumar",
          jobTitle: "Sales Manager",
        },
      ],
    },
    {
      "@type": "Organization",
      name: "Property Management",
      employee: [
        {
          "@type": "Person",
          name: "Sneha Kumari",
          jobTitle: "HR",
        },
      ],
    },
  ],
  memberOf: {
    "@type": "Organization",
    name: "RERA",
  },
};
