// import { useDisclosure } from "@mantine/hooks";
import { useAtom, atom } from "jotai";

const openedAtom = atom(false);
export const usePopUpRatings = () => {
  const [opened, setOpened] = useAtom(openedAtom);

  const open = () => setOpened(true);
  const close = () => setOpened(false);

  return [opened, { open, close }] as const;
};
