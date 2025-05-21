/* eslint-disable react/no-unescaped-entities */
// import { FaLinkedin, FaTwitter, FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa"
import { GiHouse } from "react-icons/gi"
import { MdLocationOn } from "react-icons/md"
import Link from "next/link";
import Image from "next/image";

const teamMembers = [
  {
    name: "Rahul Vishwakarma",
    role: "CEO & Founder",
    image: "https://media.getrightproperty.com/staticmedia-images-icons/team/managing-director.jpg",
    bio: "With over 15 years of experience in Bangalore's real estate market, Rahul Vishwakarma leads our team with vision and expertise.",
    linkedin: "https://in.linkedin.com/in/rahul-vishwakarma-867a2318?trk=people-guest_people_search-card",
    twitter: "#",
    email: "rahul@rpclan.com",
  },
  {
    name: "Kumar Abhishek",
    role: "Head- Sales & Operations",
    image: "https://media.getrightproperty.com/staticmedia-images-icons/team/sales-head.jpg",
    bio: "Abhishek's deep knowledge of Bangalore's neighborhoods helps clients find their perfect home.",
    linkedin: "#",
    twitter: "#",
    email: "Abhishek@rpclan.com",
  } ,
  {
    name: "Sneha Kumari",
    role: "HR & Operations Head",
    image: "https://media.getrightproperty.com/staticmedia-images-icons/team/Hr-Photo.jpeg",
    bio: "Sneha, with extensive experience in HR and operations, ensures smooth workflows and cultivates a productive work environment, driving operational efficiency and supporting growth.",
    linkedin: "https://in.linkedin.com/in/rahul-vishwakarma-867a2318?trk=people-guest_people_search-card",
    twitter: "#",
    email: "rahul@rpclan.com",
  },
  /*{
    name: "Rahul Vishwakarma",
    role: "CEO & Founder",
    image: "https://res.cloudinary.com/du0cg2eqm/image/upload/v1709121531/Image_20240228_122033_803_tx46q5.jpg",
    bio: "With over 15 years of experience in Bangalore's real estate market, Rahul Vishwakarma leads our team with vision and expertise.",
    linkedin: "https://in.linkedin.com/in/rahul-vishwakarma-867a2318?trk=people-guest_people_search-card",
    twitter: "#",
    email: "rahul@rpclan.com",
  },
  {
    name: "Rahul Vishwakarma",
    role: "CEO & Founder",
    image: "https://res.cloudinary.com/du0cg2eqm/image/upload/v1709121531/Image_20240228_122033_803_tx46q5.jpg",
    bio: "With over 15 years of experience in Bangalore's real estate market, Rahul Vishwakarma leads our team with vision and expertise.",
    linkedin: "https://in.linkedin.com/in/rahul-vishwakarma-867a2318?trk=people-guest_people_search-card",
    twitter: "#",
    email: "rahul@rpclan.com",
  },
  {
    name: "Rahul Vishwakarma",
    role: "CEO & Founder",
    image: "https://res.cloudinary.com/du0cg2eqm/image/upload/v1709121531/Image_20240228_122033_803_tx46q5.jpg",
    bio: "With over 15 years of experience in Bangalore's real estate market, Rahul Vishwakarma leads our team with vision and expertise.",
    linkedin: "https://in.linkedin.com/in/rahul-vishwakarma-867a2318?trk=people-guest_people_search-card",
    twitter: "#",
    email: "rahul@rpclan.com",
  }, */
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-14">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-base   xl:text-3xl  font-bold text-gray-900 flex items-center">
            <GiHouse className="text-blue-600 mr-2" />
            Bangalore Real Estate Team
          </h1>
          <div className="flex items-center text-blue-600">
            <MdLocationOn className="mr-2" />
            <span>Bangalore, India</span>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet Our Expert Team</h2>
              <p className="mt-4 text-xl text-gray-500">
                Dedicated professionals committed to finding your dream property in Bangalore
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
                >
                  <Image
                  unoptimized
                    className="w-full h-64 object-cover object-center"
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={64}
                    height={64}
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-sm text-blue-600 mb-4">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    {/* <div className="flex justify-center space-x-4">
                      <Link rel="noopener noreferrer" href={member.linkedin} className="text-gray-400 hover:text-blue-500">
                        <FaLinkedin className="w-6 h-6" />
                      </Link>
                      <Link rel="noopener noreferrer"  href={member.twitter} className="text-gray-400 hover:text-blue-400">
                        <FaTwitter className="w-6 h-6" />
                      </Link>
                      <Link rel="noopener noreferrer" href={`mailto:${member.email}`} className="text-gray-400 hover:text-red-500">
                        <FaEnvelope className="w-6 h-6" />
                      </Link>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Growing Team</h3>
              <p className="text-xl text-gray-600 mb-8">
                We're always looking for talented individuals to join our Bangalore real estate family.
              </p>
              <Link
                prefetch={false} 
                rel="noopener noreferrer"
                href="/careers"



                
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                View Open Positions
              </Link>
            </div>

            <div className="mt-20 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Why Choose Our Team?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Local Expertise</h4>
                    <p className="mt-2 text-base text-gray-500">
                      Our team has unparalleled knowledge of Bangalore's real estate market and neighborhoods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Personalized Service</h4>
                    <p className="mt-2 text-base text-gray-500">
                      We tailor our approach to meet each client's unique needs and preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Trusted Advisors</h4>
                    <p className="mt-2 text-base text-gray-500">
                      Our team provides honest advice and guidance throughout the entire real estate process.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Results-Driven</h4>
                    <p className="mt-2 text-base text-gray-500">
                      We're committed to achieving the best outcomes for our clients in every transaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

