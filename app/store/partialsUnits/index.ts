import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
export const parital_unit_atom = atom(0);
export const selectedPartialUnitAtom = atomWithReset<any>({
  main: null,
  others: [],
  priceRange: "",
});
