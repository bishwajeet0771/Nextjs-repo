import React from "react";
import {
  greenTick,
  Illustrationcircles,
  BuildingIconABout,
} from "@/app/images/commonSvgs";
import Image from "next/image";
import SubscribeBlock from "@/app/blog/blogDetailSextion/SubscribeBlock";
import Link from "next/link";
type Props = {};

export default function page({}: Props) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
  const profiles = [
    {
      profile: "Profile1",
      name: "Manish Kumar",
      place: "Bengaluru",
      comment:
        "Get Right Property made finding my new home effortless! The platform is user-friendly, with up-to-date listings and easy navigation.!",
    },
    {
      profile: "Profile2",
      name: "Aayushi Dwivedi",
      place: "Bengaluru",
      comment:
        "Get Right Property simplified my home search with its easy-to-use interface and up-to-date listings!",
    },
    {
      profile: "Profile3",
      name: "Ramya Krishnan",
      place: "Bengaluru",
      comment:
        "Get Right Property made inquiring about projects easy, with quick and helpful responses every time!",
    },
  ];

  return (
    <div className="mt-[70px] w-full shrink-0 rounded-[10px] m-auto h-auto bg-[#F5F7F8]">
      {/* ABout Us */}
      {/*About */}
      <div className="flex sm:flex-row items-center justify-start w-full gap-[4%] mb-5 sm:mb-0 sm:max-w-[80%] mx-auto flex-col-reverse max-w-full">
        <div className="content flex flex-col justify-start items-center sm:items-start max-w-[97%] sm:max-w-[60%] ">
          <h1 className="text-[#003]  text-[16px] text-center sm:text-[20px] xl:text-[26px] not-italic font-bold leading-[normal] sm:pt-[10px] xl:pt-[20px]">
            <span className="text-[#2AA327] ">About</span> Get Right Property
          </h1>
          <p className="text-[#003]   leading-[18px] sm:mt-[8px] text-[14px] text-center sm:text-left  sm:text-[15px] xl:text-[20px] not-italic font-normal sm:leading-[26px] sm:pt-[10px] pt-[20px] break-words  ">
            Get Right Property is your ultimate real estate companion, designed
            to streamline buying, selling, and property exploration. Our app
            allows users to effortlessly post properties and inquire about those
            of interest. With a user-friendly interface, you can list your
            property, search for available listings, and browse a diverse range
            of options.
          </p>
          <p className="text-[#003]  leading-[18px] text-[14px] text-center sm:text-left  sm:text-[15px] xl:text-[20px] not-italic font-normal sm:leading-[26px] pt-[12px] sm:pt-[10px] xl:pt-[20px] break-words">
            Connect with buyers, sellers, and agents seamlessly, and stay
            updated with the latest real estate news and trends. Whether
            you&apos;re looking to advertise, find your dream home, or simply
            explore the market, Get Right Property offers a comprehensive
            platform for all your real estate needs. Experience a smarter way to
            navigate property transactions and make informed decisions with
            ease.
          </p>
          <Link
            rel="noopener noreferrer"
            prefetch={false}
            className="text-[#FFF] mt-[14px] px-[10px] py-[6px] text-[13px] sm:mt-[20px] xl:mt-[34px]  sm:text-[17px]  xl:text-[20px] not-italic font-bold leading-[normal] sm:px-[20.514px] sm:py-[13.676px] justify-center items-center gap-[7.598px] rounded-[4px] bg-[#0073C6]"
            href={url}
          >
            Explore Now
          </Link>
        </div>
        <Image
          width={387}
          height={300}
          alt="about"
          className="w-[90%] hidden sm:block sm:w-[30%] h-[299.576px]"
          src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/aboutus/about-getrightproperty.png`}
        />
        <Image
          width={387}
          height={300}
          alt="hero image"
          className="w-[90%] block sm:hidden sm:w-[30%] h-[299.576px]"
          src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/About%20us/hero-image.png`}
        />
      </div>
      {/* best services */}
      <div className=" min-w-[100%] sm:mt-[60px] xl:mt-[80px]  bg-[#F3FFF2]">
        <div className="flex flex-row items-center justify-start w-full gap-[4%] max-w-[90%] sm:max-w-[80%] mx-auto">
          <Image
            width={387}
            height={300}
            alt="hero image"
            className="hidden sm:block  w-[36%] h-[299.576px]"
            src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/aboutus/best-service.png`}
          />
          <div className=" pt-[20px] pb-[20px] sm:pt-[60px] sm:pb-[60px]">
            <h1 className="text-[#2AA327]  text-center sm:text-left sm:text-[20px] mb-[16px] xl:text-[26px] not-italic font-bold leading-[normal] capitalize">
              <span className="text-[#003] ">We offer </span>the best services
            </h1>
            <p className="mt-2 leading-[18px] text-[14px]  text-center sm:text-left  text-[rgba(0,_0,_51,_0.95)]   sm:text-[15px] xl:text-[20px] not-italic font-normal sm:leading-[26px] ">
              Get Right Property provides a streamlined platform to post and
              browse property listings, connect with buyers and sellers, and
              access the latest market trends. Experience effortless property
              transactions with our user-friendly tools designed for all your
              real estate needs.
            </p>
            <div className="flex flex-col gap-[12px] mt-4 sm:mt-8">
              <div className="flex flex-row items-center justify-start gap-1 ">
                {greenTick}
                <p className="text-[#242424]  text-[14px]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]">
                  Post your Listing for Free
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-1 ">
                {greenTick}
                <p className="text-[#242424]   text-[14px]   sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]">
                  Post your Listing for Free
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-1 ">
                {greenTick}
                <p className="text-[#242424]   text-[14px]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]">
                  Set property alerts for your requirement
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-1 ">
                {greenTick}
                <p className="text-[#242424]  text-[14px]   sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]">
                  Showcase your property as Rental, or for Sale
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-1 ">
                {greenTick}
                <p className="text-[#242424]   sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]">
                  Get instant queries over Phone, Email and SMS
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-1 ">
                {greenTick}
                <p className="text-[#242424]   sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]">
                  Performance in search & Track responses & views online
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-1 ">
                {greenTick}
                <p className="text-[#242424]   sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]">
                  Add detailed listing information within 60 seconds
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-1 ">
                {greenTick}
                <p className="text-[#242424]   sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]">
                  Add multiple images per listings and projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*founder */}
      <div className="flex flex-col justify-start items-center sm:items-start mb-[20px]  max-w-[98%] sm:max-w-[80%] mx-auto mt-[20px]  sm:mt-[50px] xl:mt-[60px]">
        <h1 className="text-[#003]  text-center xl:text-left leading-[22px] sm:text-[20px] xl:text-[26px] not-italic font-bold sm:leading-[32px] ">
          What Our <span className="text-[#2AA327]">Founder</span> Says About
          <br /> Get Right Property
        </h1>
        <div className="flex flex-col sm:flex-row  justify-center  items-center sm:items-start gap-[5%] mt-7">
          <Image
            width={387}
            height={300}
            unoptimized
            alt="hero image"
            className="sm:w-[36%] w-[80%] h-[188px] sm:h-[318px]"
            src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/aboutus/founder.png`}
          />
          <div className="flex flex-col justify-center items-center sm:items-start ">
            <h1 className="text-[#000]  text-[16px] text-center sm:text-left sm:text-[20px] xl:text-[24px] not-italic font-semibold leading-[normal] mb-1">
              Rahul Vishwakarma
            </h1>
            <h3 className="text-[#767270]  text-[16px] text-center sml:text-left sm:text-[16px] xl:text-[20px] italic font-semibold leading-[normal]">
              Founder, Get Right Property
            </h3>
            <p className="text-[#003]  leading-[21px] text-center sm:text-left text-[14px] sm:text-[15px] xl:text-[20px] not-italic font-normal sm:leading-[26px] mt-4">
              At Get Right Property, we&apos;re dedicated to reshaping real
              estate through cutting-edge professionalism training and
              collaborative environments. Our commitment to comprehensive market
              analysis and innovative solutions drives us. With a focus on
              results and maximizing sales potential, we&apos;re rewriting
              industry norms and surpassing client needs.
            </p>
            <p className="text-[#003]   text-center sm:text-left leading-[21px] text-[14px] sm:text-[15px]  xl:text-[20px] not-italic font-normal sm:leading-[26px] pt-3">
              Join us in this journey to redefine excellence in real estate.
              Together, let&apos;s create a future where every transaction is
              exceptional and every client&apos;s dream finds its perfect home.
            </p>
          </div>
        </div>
      </div>
      {/*prefect solution */}
      <div className="flex flex-col justify-center pt-[20px] sm:justify-start items-center sm:items-start  sm:pb-[60px] xl:pb-[80px]   max-w-full  mx-auto  sm:mt-[50px] xl:mt-[60px] bg-[#fff]">
        <h1 className="text-[#003]  leading-[21px] flex flex-col sm:flex-row sm:justify-center gap-2 sm:items-center sm:max-w-[80%] text-[14px] sm:text-[20px] xl:text-[26px] mt-1 not-italic font-bold sm:leading-[normal] sm:mt-2 mx-auto capitalize">
          The Perfect Solution to{" "}
          <span className="text-[#2AA327] ">Best Project Finding</span>
        </h1>
        <p className="text-[rgba(0,_0,_51,_0.95)] mx-auto  sm:mt-[8px]  sm:max-w-[80%] text-[14px] sm:text-[16px] xl:text-[20px] not-italic font-normal leading-[21px] text-center sm;text-left sm:leading-[26px] px-[8px] md:px-0 ">
          The perfect solution for finding the best projects. Our platform
          offers a seamless search experience, detailed listings, and real-time
          updates, making your project discovery quick and effortless.
        </p>
        <div className="flex flex-row gap-[2%] w-full pb-[20px] sm:pb-0 overflow-x-scroll sm:overscroll-x-none mt-8 sm:mx-auto sm:max-w-[80%] sm:scrollbar-hide p-[10px] ">
          <div className=" w-[235px] h-[310px] md:h-auto flex-shrink-0  sm:w-[30%] sm:h-auto max-w-[60%] sm:max-w-[30%]  p-3  sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-solid border-[rgba(194,194,194,0.60)] bg-[#FFF] [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]">
            <div className=" w-[65.105px] h-[53px] rounded-[4px] flex justify-center items-center bg-[rgba(2,_152,_55,_0.10)] p-auto">
              <BuildingIconABout />{" "}
            </div>
            <h1 className="text-[#003]  text-[14px] sm:text-[15px] xl:text-[20px] not-italic font-bold leading-[30px] mt-4">
              Newly Launched Projects
            </h1>
            <p className="text-[rgba(0,_0,_51,_0.95)]  text-[12px] sm:text-[15px] not-italic font-medium leading-[21px] sm:leading-[26px] mt-3  mb-4    sm:mb-10">
              Discover the latest in real estate with our newly launched
              projects. Explore innovative projects and find your perfect new
              home today.{" "}
            </p>
            <Link
              rel="noopener noreferrer"
              prefetch={false}
              href="https://www.getrightproperty.com/search?sf=projStatus=108"
              className="cursor-pointer rounded-[4px] border-[1.618px] border-[solid] border-[#0073C6] px-[10px] py-[6px] md:px-[16px] md:py-[11px] justify-center items-center "
            >
              Explore Now
            </Link>
          </div>
          <div className=" w-[235px] h-[310px] md:h-auto flex-shrink-0  sm:w-[30%] sm:h-auto max-w-[60%] sm:max-w-[30%]  p-3  sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-solid border-[rgba(194,194,194,0.60)] bg-[#FFF] [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]">
            <div className=" w-[65.105px] h-[53px] rounded-[4px]  flex justify-center items-center bg-[rgba(2,_152,_55,_0.10)] p-auto">
              <BuildingIconABout />{" "}
            </div>
            <h1 className="text-[#003]  text-[14px] sm:text-[15px] xl:text-[20px] not-italic font-bold leading-[30px] mt-4">
              Completed Projects
            </h1>
            <p className="text-[rgba(0,_0,_51,_0.95)]  text-[12px] sm:text-[15px] not-italic font-medium leading-[21px] sm:leading-[26px] mt-3  mb-4 sm:mb-10">
              Explore our completed projects and find beautifully finished homes
              ready for you. Discover quality craftsmanship and move-in-ready
              projects now.{" "}
            </p>
            <Link
              rel="noopener noreferrer"
              prefetch={false}
              href="https://www.getrightproperty.com/search?sf=projStatus=107"
              className="cursor-pointer rounded-[4px] border-[1.618px] border-[solid] border-[#0073C6] px-[10px] py-[6px] md:px-[16px] md:py-[11px] justify-center items-center "
            >
              Explore Now
            </Link>
          </div>
          <div className=" w-[235px] h-[310px] md:h-auto flex-shrink-0  sm:w-[30%] sm:h-auto max-w-[60%] sm:max-w-[30%]  p-3  sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-solid border-[rgba(194,194,194,0.60)] bg-[#FFF] [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]">
            <div className=" w-[65.105px] h-[53px] rounded-[4px] text-[14px] flex justify-center items-center bg-[rgba(2,_152,_55,_0.10)] p-auto">
              <BuildingIconABout />{" "}
            </div>
            <h1 className="text-[#003]  text-[14px] sm:text-[15px] xl:text-[20px] not-italic font-bold leading-[30px] mt-4">
              Ongoing Projects
            </h1>
            <p className="text-[rgba(0,_0,_51,_0.95)]  text-[12px] sm:text-[15px] not-italic font-medium leading-[21px] sm:leading-[26px] mt-3  mb-4  sm:mb-16">
              Check out our ongoing projects for future-ready homes. Stay
              updated on construction progress and secure your ideal projects
              early.{" "}
            </p>
            <Link
              rel="noopener noreferrer"
              prefetch={false}
              href="https://www.getrightproperty.com/search?sf=projStatus=106"
              className="cursor-pointer rounded-[4px] border-[1.618px] border-[solid] border-[#0073C6] px-[10px] py-[6px] md:px-[16px] md:py-[11px] justify-center items-center "
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
      {/* */}
      <div className="h-auto flex flex-col items-center relative min-w-[100%]  bg-[#F3FFF2]">
        <Illustrationcircles className="hidden sm:block z-[] absolute top-0 right-0 mb-8" />

        <h1 className="text-[#003]  mt-5 sm:mb-8 sm:text-[20px] xl:text-[26px]  not-italic font-bold leading-[normal] mx-auto capitalize">
          What our{" "}
          <span
            className="
                    text-[#2AA327] mt-2"
          >
            Customers
          </span>{" "}
          say About us
        </h1>
        <div className="flex flex-row gap-[2%] mt-[8px] max-w-[98%] sm:max-w-[80%] my-8 mx-auto overflow-x-scroll sm:scrollbar-hide">
          {profiles.map((each) => {
            return (
              <div
                className=" z-[10] w-[256px] h-[198px] sm:h-auto  sm:w-[30%] flex-shrink-0 sm:max-w-[30%] flex flex-col sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-solid border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]"
                key={each.name}
              >
                <div className="flex flex-row gap-2 justify-between   ">
                  <div className="flex felx-row items-center p-1 gap-2">
                    <Image
                      width={56}
                      height={56}
                      alt="profile"
                      className="w-[56px] h-[56px] rounded-full "
                      src={"/youtube.png"}
                    />
                    <p className="text-[#003]  text-[16px] sm:text-[18px] not-italic font-bold  leading-[19.5px]">
                      {" "}
                      {each.name}
                      <br />
                      <span className="text-[#767676]  text-[16px] not-italic font-medium leading-[19.5px]">
                        {each.place}
                      </span>
                    </p>
                  </div>
                  <p className="text-[#029837] font-[Mulish] text-[48px] not-italic font-bold leading-[40px]">
                    “
                  </p>
                </div>
                <p className="text-[rgba(0,_0,_51,_0.95)]  leading-[19px] text-[12px] sm:text-[16px] not-italic font-normal sm:leading-[22px] mt-2 pl-2">
                  {each.comment}
                </p>
              </div>
            );
          })}
        </div>
        <Illustrationcircles className=" hidden sm:block absolute mt-12 bottom-0 left-0 " />
      </div>
      {/* <div className="sm:max-w-[60%] bg-[#F5F7F8] nt-4 sm:mt-16 sm:pb-14 xl:pb-24 flex flex-row mx-auto max-w-[98%]    justify-between items-center gap-3">
          
          <div className="hidden sm:block max-full ">
            <h1 className=" sm:mb-4 sm:text-[20px] xl:text-[24px] not-italic font-bold leading-[normal]">
              Subscribe To Our Newsletter
            </h1>
            <p className="text-[#303030]  sm:text-[18px] xl:text-[20px] italic font-medium leading-[normal]">
              Get updates to all about the Real Estate through our blogs
            </p>
            <div className="inline-flex l mt-10 p-[16px] max-w-[98%]   sm:w-[592px] justify-between items-center gap-[8px] rounded-[10px] border-[1px] border-[solid] border-[#BBC9DD] bg-[#FCFCFC]">
              <input
                className="outline-none w-full text-[#666]  sm:text-[18px] xl:text-[20px] italic font-medium leading-[normal]"
                placeholder="Enter your mail for new blog  "
              />
              <button
                className="text-[#FFF] text-[20px] not-italic font-semibold leading-[normal] flex p-[9px]  justify-center items-center gap-[8px] rounded-[10px] bg-[#227FBC] "
                name="Subscribe button"
              >
                Sumbit
              </button>
            </div>
          </div>
          
          <BlogCOnatainerSVg className=" h-auto" />
          <div className="sm:hidden mt-[20px] mb-[20px] mx-auto flex flex-col justify-center items-center gap-2  max-w-[98%] rounded-[18px] p-2 border-[6px] border-solid border-[var(--White-1,#F5F5F5)] bg-[#FFF]">
            <h1 className=" text-[16px] not-italic font-bold leading-[normal]">
              Subscribe To Our Newsletter
            </h1>
            <p className="text-[#303030]  text-[13px] italic font-medium leading-[normal]">
              Get updates to all about the Real Estate through our blogs
            </p>
            <input
              className="outline-none w-full text-[#666]  sm:text-[18px] xl:text-[20px] italic font-medium leading-[normal] rounded-[10px] text-center border-[1px] border-[solid] border-[#B3B3B3] p-3"
              placeholder="Enter your mail for new blog  "
            />
            <button
              className="text-[#FFF]    text-[16px] sm:text-[20px] not-italic font-semibold leading-[normal] flex p-[9px]  justify-center items-center gap-[8px] rounded-[10px] bg-[#227FBC] "
              name="Subscribe button"
            >
              Sumbit
            </button>
          </div>
        </div> */}
      <div className="w-full flex justify-center items-center py-[30px] ">
        <SubscribeBlock />
      </div>
    </div>
  );
}
