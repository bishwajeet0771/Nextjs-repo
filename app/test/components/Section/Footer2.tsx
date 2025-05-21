import React from "react";
import { GrpDarkLogoSvg } from "@/app/images/getrightLogo";
import {
  FaAppStoreIos,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

const socialIcons = [
  { name: "facebook", icon: <FaFacebook size={24} /> },
  { name: "instagram", icon: <FaInstagram size={24} /> },
  { name: "twitter", icon: <FaTwitter size={24} /> },
  { name: "youtube", icon: <FaYoutube size={24} /> },
  { name: "linkedin", icon: <FaLinkedin size={24} /> },
];

const sections = [
  {
    title: "New Projects",
    links: ["New Delhi", "Bangalore", "Chennai", "Mumbai", "Hyderabad"],
  },
  {
    title: "Properties",
    links: [
      "For Sale",
      "For Rent",
      "New Developments",
      "Commercial",
      "Vacation Rentals",
    ],
  },
  {
    title: "Resources",
    links: [
      "Mortgage Calculator",
      "Market Trends",
      "Buying Guide",
      "Selling Tips",
      "Home Valuation",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Our Team", "Careers", "Press", "Contact"],
  },
];

const Subscribe = () => (
  <form className="mt-4 sm:flex sm:max-w-md">
    <label htmlFor="email-address" className="sr-only">
      Email address
    </label>
    <input
      type="email"
      name="email-address"
      id="email-address"
      autoComplete="email"
      required
      className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:w-64 sm:text-sm sm:leading-6"
      placeholder="Enter your email"
    />
    <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        Subscribe
      </button>
    </div>
  </form>
);

const EnhancedFooter2 = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <GrpDarkLogoSvg className="w-40 h-auto" />
            <p className="text-lg">
              Exceptional service, lasting relationships. Your trusted property
              partner.
            </p>
            <div className="flex space-x-6">
              {socialIcons.map(({ name, icon }) => (
                <Link prefetch={false} rel="noreferrer"
                  key={name}
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  target='_blank'
                >
                  <span className="sr-only">{name}</span>
                  {icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {sections.slice(0, 2).map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link) => (
                      <li key={link}>
                        <Link prefetch={false} rel="noopener noreferrer"
                          href="/"
                          className="hover:text-blue-300 transition-colors duration-300"
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
              {sections.slice(2).map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link) => (
                      <li key={link}>
                        <Link prefetch={false} rel="noopener noreferrer"
                          href="/"
                          className="hover:text-blue-300 transition-colors duration-300"
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
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-4 text-base">
                Stay updated with the latest property trends and listings.
              </p>
              <Subscribe />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
                Download our app
              </h3>
              <p className="mt-4 text-base">
                Get instant property alerts on the go.
              </p>
              <div className="mt-4 flex space-x-4">
                <Link prefetch={false} rel="noopener noreferrer"
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <FaAppStoreIos className="mr-2" />
                  App Store
                </Link>
                <Link prefetch={false} rel="noopener noreferrer"
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <IoLogoGooglePlaystore className="mr-2" />
                  Google Play
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <button className="text-gray-400 hover:text-blue-400 inline-flex items-center">
              <FaLocationDot className="mr-2" /> Whitefield, Bengaluru-560066
            </button>
            <Link prefetch={false} rel="noopener noreferrer"
              href="tel:+918884440963"
              className="text-gray-400 hover:text-blue-400 inline-flex items-center"
            >
              <FaPhoneAlt className="mr-2" /> +91-8884440963
            </Link>
          </div>
          <p className="mt-8 text-base md:mt-0 md:order-1">
            &copy; 2024 GetRightProperty. All rights reserved. A product of{" "}
            <Link prefetch={false} rel="noopener noreferrer"
              href="https://rpclan.com/"
              className="text-blue-400 hover:text-blue-300"
            >
              RPCLAN SERVICES PVT.LTD
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter2;
