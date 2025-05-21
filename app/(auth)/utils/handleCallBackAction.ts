import { addShortList } from "@/app/utils/api/actions/shortlist";

export default function useCallBackAction(data: any) {
  switch (data?.type) {
    case "master-plan":
      return downloadFn(data?.action);
    case "brochure":
      return window.open(data?.action, "_self");
    case "shortlist":
      addShortList({
        isactive: "Y",
        projIdEnc: data?.action,
        source: "proj",
        type: 2,
      });
      break;
    case "compare":
      addShortList({
        isactive: "Y",
        projIdEnc: data?.action,
        source: "proj",
        type: 3,
      });
      break;
    case "similar-projects":
      addShortList({
        isactive: "Y",
        projIdEnc: data?.action,
        source: "proj",
        type: 2,
      });
      break;
    case "other-projects":
      addShortList({
        isactive: "Y",
        projIdEnc: data?.action,
        source: "proj",
        type: 3,
      });
  }
}

export const downloadFn = async (link: string) => {
  try {
    const response = await fetch(link);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "masterplan.webp";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};
