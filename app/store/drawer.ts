import { atom } from "jotai";
import { AmenityList } from "../validations/types/project";

interface ReadMoreAtom {
  expanded: boolean;
  content: any; // Replace with the actual type of your content
  type: "content" | "array";
  title: string;
  showProjName: boolean;
  builderName?: string;
}
export type AtomContent<T extends ReadMoreAtom["type"]> = T extends "content"
  ? string
  : AmenityList[];

export const readMoreAtom = atom<ReadMoreAtom>({
  expanded: false,
  content: "",
  type: "content",
  title: "",
  showProjName: true,
  builderName: "",
});

// store.ts
export const setReadMoreContent = atom(
  null,
  (get, set, newContent: ReadMoreAtom) => {
    set(readMoreAtom, (prev) => ({ ...prev, content: newContent }));
  }
);
