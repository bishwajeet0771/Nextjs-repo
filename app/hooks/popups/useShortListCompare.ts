import { useAtom, atom } from "jotai";

const openedAtom = atom({
  isOpen: false,
  data: null,
});
const callbackAtom = atom<any>(null);
export const usePopShortList = () => {
  const [opened, setOpened] = useAtom(openedAtom);
  const [callback, setCallback] = useAtom(callbackAtom);
  const open = (data: any) => setOpened({ isOpen: true, data });
  const close = () => setOpened({ isOpen: false, data: null });
  const handleOpen = (callbackfn?: () => void, data?: any) => {
    callbackfn && setCallback(() => callbackfn);
    open(data);
  };

  return [opened.isOpen, { open: handleOpen, close, callback: callback ,data:opened.data}] as const;
};
