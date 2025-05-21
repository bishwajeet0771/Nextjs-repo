import { useAtom, atom } from "jotai";

type GalleryContent = {
  type: "image" | "video";
  url?: string;
};

const openedAtom = atom<GalleryContent | null>(null);

export const useGallery = () => {
  const [content, setContent] = useAtom(openedAtom);

  const open = (type: "image" | "video", url?: string) => {
    setContent({ type, url });
  };

  const close = () => setContent(null);

  return [content, { open, close }] as const;
};
