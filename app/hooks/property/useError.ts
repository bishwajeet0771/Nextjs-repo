import { useAtom, atom } from "jotai";

const openedAtom = atom({
  status: false,
});
export const useErrorListing = () => {
  const [opened, setOpened] = useAtom(openedAtom);

  const open = () => setOpened({ status: true });
  const close = () => setOpened({ status: false });

  return [opened, { open, close }] as const;
};
