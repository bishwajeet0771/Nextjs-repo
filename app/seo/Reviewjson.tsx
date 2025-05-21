import Script from "next/script";
import { Review, WithContext } from "schema-dts";

const generateReviewJsonLd = (data: any) => {
  const jsonLd: WithContext<Review> = {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      bestRating: "5",
      worstRating: "1",
      ratingValue: 5,
    },
    author: {
      "@type": "Person",
      name: data.builderName,
    },
    reviewBody: ``,
    itemReviewed: {
      "@type": "Product",
      name: "",
    },
    datePublished: "",
  };

  return jsonLd;
};

const ReviewJsonLdScript = ({ data }: any) => {
  const jsonLd = generateReviewJsonLd(data);
  return (
    <Script
    id="reviewScript1"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ReviewJsonLdScript;
