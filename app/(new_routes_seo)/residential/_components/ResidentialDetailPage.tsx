/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  FaHome,
  FaShieldAlt,
  FaBuilding,
  FaBolt,
  FaThumbsUp,
  FaHandSparkles,
} from "react-icons/fa";

import Link from "next/link";

import Filters from "./Filters";

import { FaChevronRight } from "react-icons/fa6";
import ResidentialCardSection from "./ResidentialcardSection";
import { useState } from "react";
import Pagination from "./Pagination";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Homeowner",
    image: "/api/placeholder/60/60",
    content:
      "The quality of construction and attention to detail in our new villa exceeded our expectations. The team was professional from start to finish.",
  },
  {
    name: "Rahul Mehta",
    role: "Investor",
    image: "/api/placeholder/60/60",
    content:
      "I've invested in multiple properties with GetRight, and their projects consistently deliver excellent returns. Vajra Elegance is their best yet.",
  },
  {
    name: "Ananya Patel",
    role: "Resident",
    image: "/api/placeholder/60/60",
    content:
      "Living in a GetRight property means enjoying top-notch amenities and exceptional community living. Couldn't be happier with our decision.",
  },
];

export default function ResidentialPage({
  data,
  totalCount,
}: {
  data: any;
  totalCount: number;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <nav
        aria-label="residential Breadcrumbs"
        className="w-full  px-[8px] sm:px-[10px] lg:px-[14px] py-[6px] md:py-[10px] mt-[70px] xl:py-4 bg-gray-100 rounded-md          shadow-sm max-w-[100%] overflow-x-auto "
      >
        <div className="flex items-center space-x-1 md:space-x-3  text-sm text-gray-600 pr-[10px] ">
          <div>
            <Link
              rel="noopener noreferrer"
              href="/"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-all duration-200"
            >
              <FaHome className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
          <FaChevronRight
            className="h-4 w-4 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <div className="ml-2 text-sm font-semibold text-gray-800 hover:text-blue-600 transition-all duration-200 text-nowrap first-letter:capitalize ">
            Residential Projects
          </div>
        </div>
      </nav>
      <section className="px-4 md:px-12 py-8 max-w-screen-xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">
          Explore Residential Projects in Bangalore – Apartments, Villas & More
        </h1>

        <p className="text-base md:text-lg text-gray-600 mb-4">
          Looking to buy your dream home in Bangalore? GetRightProperty brings
          you an extensive collection of{" "}
          <strong className="font-semibold text-gray-800">
            residential projects
          </strong>{" "}
          including premium apartments, luxurious villas, and affordable flats
          in Bangalore’s most desirable neighborhoods.
        </p>

        <p className="text-base md:text-lg text-gray-600 mb-4">
          Whether you're searching in{" "}
          <strong>Whitefield, Sarjapur Road, Electronic City, Hebbal</strong> or
          other top localities, our listings feature verified details,
          transparent pricing, and real-time availability to help you make
          smarter property decisions.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4">
          Why Buy Residential Properties with GetRightProperty?
        </h2>

        <ul className="list-disc pl-6 text-base md:text-lg text-gray-600 space-y-2">
          <li>
            <strong className="text-gray-800">Verified Listings:</strong> 100%
            verified properties with accurate details and high-quality images.
          </li>
          <li>
            <strong className="text-gray-800">Compare Prices:</strong> Easily
            compare pricing, amenities, and location benefits of different
            projects.
          </li>
          <li>
            <strong className="text-gray-800">Locality Insights:</strong> Find
            homes near IT parks, schools, hospitals, and metro stations.
          </li>
          <li>
            <strong className="text-gray-800">Expert Support:</strong> Our
            property advisors help you with site visits, negotiations, and
            paperwork.
          </li>
        </ul>

        <p className="text-base md:text-lg text-gray-600 mt-6">
          Start your search now and find the perfect residential project in
          Bangalore that fits your lifestyle and budget. Whether you prefer a
          peaceful suburban villa or a city-view apartment, GetRightProperty
          makes it simple to own the home you deserve.
        </p>
      </section>



      {/*    <Banner heroSlides={data?.featured} data={data} /> */}
      <Filters />
      <ResidentialCardSection
        data={data}
        setLoading={setLoading}
        loading={loading}
        totalCount={totalCount}
      />
      <Pagination totalCount={totalCount} />
      {!loading && (
        <>
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-16">
                Why Choose Our Residential Properties
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <FaHome className="h-8 w-8" />,
                    title: "Premium Locations",
                    description:
                      "Prime spots in the most sought-after neighborhoods with excellent connectivity to tech parks, schools, and healthcare facilities.",
                  },
                  {
                    icon: <FaShieldAlt className="h-8 w-8" />,
                    title: "Security First",
                    description:
                      "24/7 security systems with CCTV surveillance, intercom facility, and controlled access for complete peace of mind.",
                  },
                  {
                    icon: <FaHandSparkles className="h-8 w-8" />,
                    title: "Modern Amenities",
                    description:
                      "State-of-the-art facilities including clubhouse, swimming pool, gym, children's play area, and smart home features.",
                  },
                  {
                    icon: <FaBolt className="h-8 w-8" />,
                    title: "Energy Efficient",
                    description:
                      "Sustainable design with solar water heating, rainwater harvesting, and energy-efficient lighting to reduce utility costs.",
                  },
                  {
                    icon: <FaBuilding className="h-8 w-8" />,
                    title: "Quality Construction",
                    description:
                      "Built with premium materials, earthquake-resistant structure, and superior workmanship that stands the test of time.",
                  },
                  {
                    icon: <FaThumbsUp className="h-8 w-8" />,
                    title: "Customer Satisfaction",
                    description:
                      "Our properties consistently exceed expectations with transparent processes and excellent after-sales service.",
                  },
                ].map((feature, index) => (
                  <div
                    key={`feature_${index.toString()}`}
                    className="p-8 rounded-xl bg-card hover:shadow-lg transition-all"
                  >
                    <div className="mb-6 text-primary bg-primary/10 inline-block p-4 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
     {/** seto nagaivations interlinks of pages -below*/}
                  
     <section className="px-4 md:px-12 py-8 max-w-screen-xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">
          Discover{" "}
          <Link
            href="https://www.getrightproperty.com/residential"
         
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 hover:cursor-pointer"
          >
            <strong>Residential Projects</strong>
          </Link>{" "}
          Across Top Locations in India
        </h2>

        <p className="text-base md:text-lg text-gray-600 mb-4">
        Explore a curated selection of{" "}
          <Link
            href="https://www.getrightproperty.com/residential"
         
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 hover:cursor-pointer"
          >
            residential properties in Bengaluru
          </Link>{" "}, including premium apartments, luxurious villas, and affordable flats, tailored to meet diverse lifestyle and investment needs
        
        </p>

        <p className="text-base md:text-lg text-gray-600 mb-4">
        Browse curated{" "}
          <Link href="https://www.getrightproperty.com/residential-listings"  rel="noopener noreferrer" className="text-blue-600 underline">
          residential-listings
          </Link>{" "}
          featuring <strong>ready-to-move-in homes</strong>, <strong>under-construction apartments</strong>, and <strong>villas</strong> in top Indian cities.
        </p>

        <p className="text-base md:text-lg text-gray-600 mb-4">
          Find the best  <Link href="https://www.getrightproperty.com/residential-listings/for-sale"  rel="noopener noreferrer" className="text-blue-600 underline">
          residential listings for sale
          </Link>{" "}  including apartments, villas, and plots in top localities. Browse verified properties with transparent pricing, location insights, and easy inquiry options.

        </p>

        <p className="text-base md:text-lg text-gray-600 mb-4">
        Explore top {" "}
          <Link href="https://www.getrightproperty.com/residential-listings/for-rent"  rel="noopener noreferrer" className="text-blue-600 underline">
        residential listings for rent
          </Link>{" "}
          including <strong>flats</strong>, <strong>villas</strong>, and <strong>independent houses</strong> in major cities.
          Find rental homes with flexible lease terms, verified photos, and detailed locality information.
        </p>

        <p className="text-base md:text-lg text-gray-600 mb-4">
        Easily access your {" "}
          <Link href="https://www.getrightproperty.com/your-profile/shortlisted"  rel="noopener noreferrer" className="text-blue-600 underline">
          shortlisted properties
          </Link>{" "}
          to compare and review your saved homes in one place. Track your favorite listings, revisit project details, and make informed decisions faster
        </p>

        <p className="text-base md:text-lg text-gray-600 mb-4">
        Use the{" "}
          <Link href="https://www.getrightproperty.com/your-profile/compare"  rel="noopener noreferrer" className="text-blue-600 underline">
          property comparison tool
          </Link>{" "}
          to evaluate multiple listings side by side. Compare pricing, amenities, location, builder reputation, and more to find the perfect home that meets your needs.
        </p>

        <p className="text-base md:text-lg text-gray-600 mb-4">
          Get expert insights on property buying, selling, and renting through our {" "}
          <Link href="https://www.getrightproperty.com/your-profile/question-and-answers"  rel="noopener noreferrer" className="text-blue-600 underline">
          question and answers
          </Link>{" "}section. Ask real estate queries, explore community discussions, and make informed decisions.
        </p>

        <p className="text-base md:text-lg text-gray-600">
          Quickly find your dream{" "}
          <Link href="https://www.getrightproperty.com/search" rel="noopener noreferrer" className="text-blue-600 underline">
          property-search
          </Link>{" "}
          tool. Filter by city, budget, property type, and more to discover listings that match your exact requirements.
        </p>
      </section>
             {/** seto nagaivations interlinks of pages above */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-16">
                What Our Customers Say
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials?.map((testimonial, index) => (
                  <div
                    key={`testimonials_${index.toString()}`}
                    className="bg-card p-8 rounded-xl shadow hover:shadow-md transition-all"
                  >
                    <div className="flex items-center mb-6">
                      <div className="h-14 w-14 rounded-full overflow-hidden relative mr-4">
                        {/* <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    /> */}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground">
                      {testimonial.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-16 bg-primary text-white">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-black">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-black/80 max-w-xl mx-auto mb-8">
                Schedule a site visit or speak with our property experts to
                discover the perfect living space tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* <button  className="bg-btnPrimary text-primary  px-6 py-3 rounded-lg font-medium transition-colors">
              Book a Site Visit
            </button> */}
                {/*  <Link
              rel="noopener noreferrer"
              prefetch={false}
              href={`${process.env.NEXT_PUBLIC_URL}/${`get-in-touch`}`}
              className="bg-btnPrimary text-primary  px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Book a Site Visit
            </Link> */}
                <Link
                  rel="noopener noreferrer"
                  prefetch={false}
                  href={`${process.env.NEXT_PUBLIC_URL}/${`get-in-touch`}`}
                  className="bg-btnPrimary text-primary  px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
