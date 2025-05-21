import { atom } from "jotai";
import { atomWithReducer } from "jotai/utils";
type Atom = {
  [key: string]: any;
};
type Initialvalue = {
  title: string;
  id: string | null;
  opened: boolean;
  type: null | "nearby" | "floorplan";
  content: null | any;
};
const inititalValue = {
  title: "",
  id: null,
  opened: false,
  type: null,
  content: null,
};
type AtomNearby = {
  data: any;
  category: string;
  isOpen: boolean;
  selectedNearbyItem:any;
  id: string;
  allMarkerRefs:any;
  isLoader: boolean;
};
const selectedSearchAtom = atom<null | Atom>(null);
export const selectedNearByAtom = atom<AtomNearby>({category:'', data: {}, isOpen:false, selectedNearbyItem: {}, id: "", allMarkerRefs: null, isLoader: false});
export const modalPopup = atom({data: {}, isOpen:false});

export const listingSearchAtom = atom<null | Atom>(null);
type ActionData =
  | {
      type: "open";
      payload: {
        title: string;
        id: string;
        opened: boolean;
        type: "nearby" | "floorplan";
        content?: any;
      };
    }
  | {
      type: "close";
    };
const mapReducer = (state: Initialvalue, action: ActionData): Initialvalue => {
  switch (action.type) {
    case "open":
      return {
        title: action.payload.title,
        id: action.payload.id,
        opened: action.payload.opened,
        type: action.payload.type,
        ...(action.payload.content && { content: action.payload.content }),
      };
    case "close":
      return inititalValue;
    default:
      return state;
  }
};
export const mobileSearchPageMapModalReducerAtom = atomWithReducer(
  inititalValue,
  mapReducer
);
export default selectedSearchAtom;
