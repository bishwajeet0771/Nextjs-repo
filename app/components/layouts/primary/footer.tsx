"use client";
import { GrpDarkLogoSvg } from "@/app/images/getrightLogo";
import { FaLocationDot } from "react-icons/fa6";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import Subscribe from "@/app/test/components/Section/Subscribe";
import { memo } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Footer() {
  const { data: session } = useSession();
  const socialIcons = [
    {
      name: "facebook",
      icon: <FaFacebook size={24} />,
      link: "https://www.facebook.com/profile.php?id=100066833915037",
    },
    {
      name: "instagram",
      icon: <FaInstagram size={24} />,
      link: "https://www.instagram.com/_getrightproperty_/?utm_source=qr#",
    },
    {
      name: "twitter",
      icon: <FaTwitter size={24} />,
      link: "https://x.com/getrightproperty",
    },
    {
      name: "youtube",
      icon: <FaYoutube size={24} />,
      link: "https://youtube.com/@getrightproperty-1?si=GEoeTK1G9g0LkNau",
    },
    {
      name: "linkedin",
      icon: <FaLinkedin size={24} />,
      link: "https://www.linkedin.com/company/get-right-property/",
    },
  ];
  const sections = [
    {
      title: "New Projects",
      links: [
        // "New Delhi",
        "Bangalore",

        // "Chennai", "Mumbai", "Hyderabad"
      ],
      hrefs: [
        // "/search?sf=city=New+Delhi%2B683",
        "/residential/projects/bengaluru",
        // "/search?sf=city=Chennai%2B580",
        // "/search?sf=city=Mumbai%2B577",
        // "/search?sf=city=Hyderabad%2B582",
      ],
      /*  rel="noopener noreferrer", */
      rel: "noopener noreferrer",
      target: "_self",
    },
    {
      title: "Properties",
      links: [
        "For Sale Listings",
        "For Rent Listings",
        "New Launch Projects",
        "On-Going Projects",
        "Completed Projects",
        "Ready to Move Listings",
        "Under Construction Listings",

        /*  "Commercial",
        "Vacation Rentals",
        "Foreclosures", */
      ],
      hrefs: [
        "/residential-listings/for-sale",
        "/residential-listings/for-rent",
        "/search?sf=projStatus=108",
        "/search?sf=projStatus=106",
        "/search?sf=projStatus=107",
        "/search/listing?sf=propStatus=R",
        "/search/listing?sf=propStatus=U",
        /* "/commercial",
        "/vacation-rentals",
        "/foreclosures", */
      ],
      rel: "noopener noreferrer",
      target: "_self",
    },
    {
      title: "Resources",
      links: [
        "Market Trends",
        "Buying Guide",
        "Selling Tips",
        "Real Estate News",
        // "Mortgage Calculator",
        // "Home Valuation",
      ],
      hrefs: [
        "/market-trends/locality-insights",
        "/buying-guide",
        "/selling-tips",
        "/market-trends/news",
        // "/mortgage-calculator",
        // "/home-valuation",
      ],
      rel: "noopener noreferrer",
      target: "_self",
    },
    {
      title: "Our Pages",
      links: [
        "Home",
        "Residential Projects",
        "Properties",
        session !== undefined &&
        session !== null &&
        session.user?.userType === "B"
          ? "Post Project"
          : "",
        "Post Property",
        "Builders",
        session === null ? "Login/Signup" : "",
        "Listing Search",
        "Project Search",
        "Residential Listings",
      ],
      hrefs: [
        "/",
        "/residential",
        "/residential-listings",
        "/post-your-project",
        "/post-your-listing",
        "/builders",
        "/login",
        "/search/listing",
        "/search",
        "/residential-listings",
      ],
      rel: "noopener noreferrer",
      target: "_self",
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Team",
        "Careers",
        "Contact",
        // "Press",
        // "Partnerships",
      ],
      hrefs: [
        "/about",
        "/team",
        "/careers",
        "/get-in-touch",
        // "/press",
        // "/partnerships",
      ],
      rel: "noopener noreferrer",
      target: "_self",
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Sitemap",
        // "Cookie Policy",
        // "Fair Housing",
        // "Accessibility",
      ],
      hrefs: [
        "/privacy-policy",
        "/terms-and-conditions",
        "/sitemap.xml",
        // "/cookies",
        // "/fair-housing",
        // "/accessibility",
      ],
      rel: "noopener noreferrer",
      target: "_self",
    },
  ];
  const pathname = usePathname();
  return (
    ![
      "/login",
      "/register",
      "/register/individual",
      "/register/agent",
      "/register/builder",
      "/forgot",
    ].includes(pathname) && (
      <footer className="bg-[#253F59] text-white relative z-30">
        <div className="max-w-[95%] mx-auto pt-2 sm:pt-12 pb-6 px-1 sm:px-6 lg:pt-16 lg:pb-8 lg:px-8">
          <div className="xl:grid xl:grid-cols-4 xl:gap-8">
            <div className="sm:space-y-6 xl:col-span-1">
              <GrpDarkLogoSvg className="w-[130px] sm:w-[180px] sm:-ml-2" />
              <p className="text-white text-sm sm:text-base mb-4 sm:mb-0">
                We pride ourselves on delivering exceptional customer service
                &amp; building lasting relationships with our clients
              </p>
              <div className="flex space-x-6">
                {socialIcons.map(({ name, icon, link }) => (
                  <Link
                    prefetch={false}
                    rel="noreferrer"
                    key={name}
                    href={link}
                    className="text-white hover:text-gray-300"
                    target="_blank"
                  >
                    <span className="sr-only">{name}</span>
                    {icon}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-2 sm:mt-12 grid grid-cols-3 gap-6 sm:gap-8 xl:mt-0 xl:col-span-3">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {sections.slice(0, 2).map(({ title, links, hrefs, rel }) => (
                  <div key={title} className="min-h-[154px]">
                    <h3 className="text-xs mt-2 sm:mt-0 sm:text-sm font-semibold text-white tracking-wider uppercase">
                      {title}
                    </h3>
                    <ul className="sm:mt-4 md:space-y-4">
                      {links.map((link, index) => (
                        <li key={link}>
                          <Link
                            prefetch={false}
                            href={hrefs[index]}
                            rel={rel}
                            className="text-xs sm:text-base text-gray-300 hover:text-white"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-8">
                {sections.slice(2, 4).map(({ title, links, hrefs, rel }) => (
                  <div key={title} className="min-h-[154px]">
                    <h3 className="text-xs mt-2 sm:mt-0 sm:text-sm font-semibold text-white tracking-wider uppercase">
                      {title}
                    </h3>
                    <ul className="sm:mt-4 md:space-y-4">
                      {links.map((link, index) => {
                        return (
                          link && (
                            <li key={link}>
                              <Link
                                prefetch={false}
                                href={hrefs[index]}
                                rel={rel}
                                className="text-xs sm:text-base text-gray-300 hover:text-white"
                              >
                                {link}
                                {link === "Home" || link === "Projects" ? (
                                  <span className="hidden"> Page</span>
                                ) : (
                                  ""
                                )}
                              </Link>
                            </li>
                          )
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-8">
                {sections.slice(4).map(({ title, links, hrefs, rel }) => (
                  <div key={title} className="min-h-[154px]">
                    <h3 className="text-xs mt-2 sm:mt-0 sm:text-sm font-semibold text-white tracking-wider uppercase">
                      {title}
                    </h3>
                    <ul className="sm:mt-4 md:space-y-4">
                      {links.map((link, index) => (
                        <li key={link}>
                          <Link
                            prefetch={false}
                            href={hrefs[index]}
                            rel={rel}
                            className="text-xs sm:text-base text-gray-300 hover:text-white"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="mt-4 sm:mt-12 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div>
                <h3 className="text-xs sm:text-sm font-[normal] text-white tracking-wider uppercase">
                  Subscribe to our newsletter
                </h3>
                <p className="mt-1 sm:mt-4 text-xs sm:text-base text-gray-300">
                  Get the latest news, market trends, and hot property listings
                  delivered to your inbox.
                </p>
                <Subscribe />
              </div>
            </div>
          </div>

          {/* Footer info section */}
          <div className="mt-2 sm:mt-8 border-t border-gray-700 sm:pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <button aria-label="Location" name="Location" title="Location" className="text-white text-xs sm:text-base hover:text-gray-300 inline-flex md:items-center md:justify-center flex-wrap text-left">
                <FaLocationDot className="mr-1" /> Whitefield, Bengaluru-560066
              </button>
              <Link
                prefetch={false}
                rel="noopener noreferrer"
                href={`tel:${8884440963}`}
                className="text-white text-xs sm:text-base hover:text-gray-300 inline-flex md:items-center md:justify-center flex-wrap text-left"
              >
                <FaPhoneAlt className="mr-1" /> +91-8884440963
              </Link>
            </div>
            <p className="mt-1 text-xs sm:text-base text-white md:mt-0 md:order-1">
              Copyright © 2024 GetRightProperty. All Rights Reserved.
              <span>
                <br />A Product By &quot;
                <Link
                  prefetch={false}
                  rel="noopener noreferrer"
                  href="https://rpclan.com/"
                >
                  {" "}
                  RPCLAN SERVICES PVT.LTD{" "}
                </Link>
                &quot;
              </span>
            </p>
          </div>
        </div>
      </footer>
    )
  );
}
export default memo(Footer);
