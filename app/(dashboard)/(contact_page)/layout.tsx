// import Header from "@/app/components/layouts/primary/header";
// import Footer from "@/app/components/layouts/primary/footer";
import { ContactBackButtonIcon } from "@/app/images/HomePageIcons";
import Link from "next/link";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* <Header /> */}
      <div className="pt-[70px]">
        <Link
          href={"/"}
          className="text-[#202020] text-[14px] sm:text-xl not-italic font-medium inline-flex mt-[3%] ml-[2%] gap-1"
        >
          <ContactBackButtonIcon />
          Back
        </Link>
        {children}
      </div>
      {/* <Footer /> */}
    </main>
  );
}
