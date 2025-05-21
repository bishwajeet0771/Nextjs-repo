import Script from "next/script";
import { FAQPage, WithContext } from "schema-dts";

const generateFAQJsonLd = (data: any) => {
  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...(data.faqs || []).map((question: any) => ({
        "@type": "Question",
        name: question.faqQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: question.faqAnswer,
        },
      })),
      {
        "@type": "Question",
        name: "How can I contact you?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact cusotmer support via email at info@rpclan.com or by phone at 8884440963.",
        },
      },
    ],
    headline: data.headline,
    description: data.description,
    author: {
      "@type": "Person",
      name: data.projectName.split(" ")[0],
      url: `${process.env.NEXT_PUBLIC_PROJECT_URL}/builders/bengaluru/${data.builderId}`,
    },
    image: "",
    // datePublished: data.datePublished,
    // dateModified: data.dateModified,
  };

  return jsonLd;
};

const FAQJsonLdScript = ({ data }: any) => {
  const jsonLd = generateFAQJsonLd(data);
  return (
    <Script
    id="faqScript1"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default FAQJsonLdScript;
