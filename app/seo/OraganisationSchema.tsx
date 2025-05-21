import {
  Organization,
  WithContext,
  ImageObject,
  ContactPoint,
  PostalAddress,
  Person,
} from "schema-dts";

const generatePropertyJsonLd = (): WithContext<Organization> => {
  const jsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GET RIGHT PROPERTY",
    url: "https://www.getrightproperty.com",
    logo: {
      "@type": "ImageObject",
      url: "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
    } as ImageObject,
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
      } as ContactPoint,
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
    } as PostalAddress,
    founder: [
      {
        "@type": "Person",
        name: "Rahul Vishwakarma",
      } as Person,
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
          } as Person,
        ],
      } as Organization,
      {
        "@type": "Organization",
        name: "Property Management",
        employee: [
          {
            "@type": "Person",
            name: "Sneha Kumari",
            jobTitle: "HR", // Consider if HR is the correct job title for Property Management
          } as Person,
        ],
      } as Organization,
    ],
    memberOf: {
      "@type": "Organization",
      name: "RERA",
    } as Organization,
  };

  return jsonLd;
};

const OrganizationSchema: React.FC = () => {
  const jsonLd = generatePropertyJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default OrganizationSchema;
