import { useSession } from "next-auth/react";
// import React from "react";
import { usePopShortList } from "../popups/useShortListCompare";

export default function useDownload(name: string) {
  const { data: session } = useSession();
  const [, { open: LoginOpen }] = usePopShortList();
  const handleImg = async (imgUrl: string) => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${name}.webp`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  const handleDownload = async (imgUrl: string) => {
    if (true) {
      handleImg(imgUrl);
    } else {
      LoginOpen(() => handleImg(imgUrl));
    }
  };
  return { handleDownload };
}
