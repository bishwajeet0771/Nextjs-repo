import { atom } from "jotai";
type NearByData = {
  builderName: string;
  projName: string;
};
export const NearByDataAtom = atom<NearByData | any>({});
