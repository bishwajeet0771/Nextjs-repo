import { useAtom, atom } from "jotai";

const openedAtom = atom(false);
export const typeAtom = atom("type");

export const useFloorPlanPopup = () => {
  const [opened, setOpened] = useAtom(openedAtom);
  const [type, setType] = useAtom(typeAtom);

  const open = (type: "overview" | "floor" | "container") => {
    setType(type);
    setOpened(true);
  };
  const close = () => setOpened(false);

  return [opened, { open, close, type }] as const;
};
