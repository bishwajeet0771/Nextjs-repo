import Link from "next/link";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className=" h-screen flex justify-center items-center flex-col pb-10 ">
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/page-not-found/pagenotfound.png`}
        width={800}
        height={800}
        alt="not found"
        title="not found"
      />
      <h1 className="text-[#06497A] text-center text-[64px] not-italic font-semibold leading-[normal] mb-[35px]">
        404! <br />{" "}
        <span className="text-[#06497A] text-[65px] not-italic font-semibold leading-[normal]">
          PAGE NOT FOUND
        </span>{" "}
      </h1>
      <Link
        href="/"
        className="justify-center items-center gap-2.5 px-5 py-[17px] flex bg-btnPrimary text-white text-center text-3xl    not-italic font-bold leading-[normal] "
      >
        Go To Homepage
      </Link>
    </div>
  );
}
