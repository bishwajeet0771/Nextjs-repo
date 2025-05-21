import Script from "next/script";
import { Article, WithContext } from "schema-dts";

const generateArticleJsonLd = (data: any) => {
  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "",
    description: "",
    author: {
      "@type": "Person",
      name: "",
      url: "",
    },

    // image: data.image,
    // datePublished: data.datePublished,
    // dateModified: data.dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${data.url ?? ""}`,
    },

    // articleBody: data.articleBody,
  };

  return jsonLd;
};

const ArticleJsonLdScript = ({ data }: any) => {
  const jsonLd = generateArticleJsonLd(data);

  return (
    <Script
      id="articleScript1"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ArticleJsonLdScript;
