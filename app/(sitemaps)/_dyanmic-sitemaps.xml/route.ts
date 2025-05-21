
import { getServerSideSitemap } from "next-sitemap";
import axios from "axios";



export async function GET(

) {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/common/case-seo-page?size=30000`)
    const totalPages = res.data.totalPages

  const sitemap = Array.from({ length: totalPages }).map((_, index) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/dynamic-sitemap/${index + 1}.xml`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(sitemap);

}
