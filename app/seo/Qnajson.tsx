import Script from "next/script";
import { FAQPage, WithContext } from "schema-dts";

const generateQAJsonLd = (data: any) => {
  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs?.map((question: any) => ({
      "@type": "Question",
      name: question.faqQuestion,
      acceptedAnswer: {
        "@type": "Answer",
        text: question.faqAnswer,
      },
    })),
    headline: data.headline,
    description: data.description,
    author: {
      "@type": "Person",
      name: data.builderName,
      url: `${process.env.NEXT_PUBLIC_PROJECT_URL}/builders/bengaluru/${data.builderId}`,
    },
    image: data.image,
    // datePublished: data.datePublished,
    // dateModified: data.dateModified,
  };

  return jsonLd;
};

const QAJsonLdScript = ({ data }: any) => {
  const jsonLd = generateQAJsonLd(data);

  return (
    <Script
    id="qnaScript1"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default QAJsonLdScript;
