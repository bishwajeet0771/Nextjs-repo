import { data } from "@/app/data/userTypeDetails";
import Link from "next/link";
import Image from "next/image";
import { getQueryParam } from "@/app/hooks/custom/useRedirect";
import LoginSignupTabs from "../Components/LoginSignup";

export default function Page({ searchParams }: any) {
  return (
    <div className="w-full p-[5%] sm:p-[10%] md:p-[2%] flex justify-center items-center flex-col">
      <div className="w-full max-w-[459px] md:max-w-[597px] flex justify-center items-center gap-[5%] mb-[5%] ">
        <LoginSignupTabs searchParams={searchParams} state="signup" />
        {/* <Link
          href={{
            pathname: "/login",
            search: getQueryParam(searchParams),
          }}
          className="whitespace-nowrap text-xl md:text-[26px] font-[500] text-[#666]"
        >
          Log In
        </Link>

        <Link
          href={{
            pathname: "/register",
            search: getQueryParam(searchParams),
          }}
          className="whitespace-nowrap text-xl md:text-[26px] text-[#148B16] font-bold border-solid border-b-2 border-green-600"
        >
          Sign Up
        </Link> */}
      </div>

      <div className=" sm:px-20 xl:px-0">
        <h1 className="md:text-[32px] mt-6 text-[20px] font-[600] font-Playball text-[#333]">
          Welcome !
        </h1>
        <p className="!text-[13px] font-[600] font-Playball text-[#767270] sm:!text-[18px]">
          New user, Select how you want to sign up as
        </p>
        <div className="w-full flex justify-between items-center mt-[4%]">
          {data.map((each) => {
            return (
              <Link
                href={{
                  pathname: each.href,
                  search: getQueryParam(searchParams),
                }}
                key={each.src}
                className={`group cursor-pointer mb-6 flex justify-center items-center flex-col rounded-[8px] border-[0.4px] !border-[#009c59] bg-[#FAFAFA] w-[30%] h-[100px] xl:h-[174px]  shadow-lg  hover:shadow-green-300/30 sm:h-[129.468px] sm:!shadow-sm`}
              >
                <Image
                  className="w-[60px]  xl:w-[83px]  sm:w-[63px] "
                  alt="User"
                  src={each.src}
                  width={83}
                  height={83}
                />

                <p
                  className={`text-xs sm:text-[16px] xl:text-[20px] font-[600] font-Playball text-[#242424] mt-[8%] group-hover:text-[#65BB67] `}
                >
                  {each.name}
                </p>
              </Link>
            );
          })}
        </div>

        <p className=" md:text-[20px] font-[400] font-Ledger text-[#282828] mt-[5%] text-center ">
          “ Your journey to{" "}
          <span className="cursive "> Get Right Property</span> starts here ”
        </p>
      </div>
    </div>
  );
}
