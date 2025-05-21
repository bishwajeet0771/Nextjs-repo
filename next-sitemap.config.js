const { default: axios } = require("axios");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  exclude: [
    "/icon.svg",
    "/apple-icon.png",
    "/manifest.webmanifest",
    "/tags/*",
    "/builders/*",
    "/test/*",
    "/residential/projects/*",
    "/api/*",
    "/searchOldPage",
    "/searchOldPage/*",
    "/components/*",
    "/old_state_path",
    "/skeleton",
    "/test",
    "/abc/*",
    "/success",
    "/new",
  ],
  generateIndexSitemap: false,
  generateRobotsTxt: false,

  additionalPaths: async (config) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/case-seo-page?size=30000`
    );
    const totalPages = res.data.totalPages;

    const sitemap = Array.from({ length: totalPages }).map((_, index) => ({
      loc: `${process.env.NEXT_PUBLIC_URL}/dynamic-sitemap/${index + 1}.xml`,
      lastmod: new Date().toISOString(),
    }));
    return [
      {
        loc: `https://www.getrightproperty.com/residential/projects/bengaluru`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `https://www.getrightproperty.com/residential-listings/for-sale/bengaluru`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `https://www.getrightproperty.com/residential-listings/for-rent`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `https://www.getrightproperty.com/residential-listings/for-rent/bengaluru`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `https://www.getrightproperty.com/residential-listings/for-sale`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `https://www.getrightproperty.com/residential/projects`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `https://www.getrightproperty.com/residential`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `https://www.getrightproperty.com/residential-listings`,
        lastmod: new Date().toISOString(),
      },
      // {
      //   loc: `${config.siteUrl}/dyanmic-sitemaps.xml`,
      //   lastmod: new Date().toISOString(),
      // },
      ...sitemap,
      // {
      //   loc: `${config.siteUrl}/dyanmic-sitemap/1.xml`,
      //   lastmod: new Date().toISOString(),
      // },
      // {
      //   loc: `${config.siteUrl}/dyanmic-sitemap/2.xml`,
      //   lastmod: new Date().toISOString(),
      // },
      // {
      //   loc: `${config.siteUrl}/dyanmic-sitemap/3.xml`,
      //   lastmod: new Date().toISOString(),
      // },
      // {
      //   loc: `${config.siteUrl}/dyanmic-sitemap/4.xml`,
      //   lastmod: new Date().toISOString(),
      // },
      // {
      //   loc: `${config.siteUrl}/dyanmic-sitemap/5.xml`,
      //   lastmod: new Date().toISOString(),
      // },
      // {
      //   loc: `${config.siteUrl}/dyanmic-sitemap/6.xml`,
      //   lastmod: new Date().toISOString(),
      // },
      // {
      //   loc: `${config.siteUrl}/dyanmic-sitemap/7.xml`,
      //   lastmod: new Date().toISOString(),
      // },
      {
        loc: `${config.siteUrl}/search?sf=projStatus=106`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/search?sf=projStatus=107`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/search?sf=projStatus=108`,
        lastmod: new Date().toISOString(),
      },
    ];
  },
};
