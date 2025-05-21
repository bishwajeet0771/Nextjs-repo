import Login from "@/app/components/molecules/auth/login";
// import { getQueryParam } from "@/app/hooks/custom/useRedirect";
// import Link from "next/link";
import LoginSignupTabs from "../Components/LoginSignup";

export default function Page({ searchParams }: any) {
  return (
    <div className="w-full  p-[5%] sm:p-[10%] sm:mt-2 xl:mt-0 md:p-[2%]">
      <div className="w-full flex justify-center items-center gap-[5%] mt-[1%] sm:mb-[16px] xl:mb-[5%]">
        <LoginSignupTabs searchParams={searchParams} state="login" />
      </div>

      <div className="mt-[18px] sm:mt-0">
        <Login params={searchParams} />
      </div>
    </div>
  );
}
