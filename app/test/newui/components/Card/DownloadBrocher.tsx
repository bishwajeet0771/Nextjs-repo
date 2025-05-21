// import downloadPDF from "@/app/(dashboard)/searchOldPage/Page/utils";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { DownLoadIcon } from "@/app/images/commongsSvgs2";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  brochureUrl: string;
};

export default function DownloadBrocher({ brochureUrl: url }: Props) {
  const { data: session } = useSession();
  const [, { open: LoginOpen }] = usePopShortList();

  const handleDownload = () => {
    if (session) {
      url &&
        window.open(
          `/pdf/${encodeURIComponent(url.split(".net")[1])}`,
          "_self"
        );
    } else {
      LoginOpen(() => {
        url &&
          window.open(
            `/pdf/${encodeURIComponent(url.split(".net")[1])}`,
            "_self"
          );
      });
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-btnPrimary text-white rounded text-[12px] inline-flex max-w-fit px-0.5 sm:px-1 sm:py-0.5 font-bold justify-center items-center ml-auto mt-[4px]"
    >
      <DownLoadIcon className="w-[12px] sm:w-[14px] h-[12px] sm:h-[14px]" />{" "}
      Brochure
    </button>
  );
}
