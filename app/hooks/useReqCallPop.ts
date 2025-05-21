import { useAtom, atom } from "jotai";
interface PopupState {
  opened: boolean;
  reqId: string | null; // ID of the project
  source: "projBanner" | "projCard" | "propCard" | "propBanner";
  cg?: string;
  MODAL_TYPE: "PROJECT_REQ_CALLBACK" | "PROPERTY_REQ_CALLBACK" | "REQ_QUOTE";
  postedByName: string;
  title: string;
  postedId: number | null;
  projUnitIdEnc?: string;
}

export const popupStateAtom = atom<PopupState>({
  opened: false,
  reqId: null,
  source: "projBanner",
  cg: "",
  MODAL_TYPE: "PROPERTY_REQ_CALLBACK",
  postedByName: "",
  title: "",
  postedId: null,
});

export const useReqCallPopup = () => {
  const [popupState, setPopupState] = useAtom(popupStateAtom);
  const open = ({
    modal_type,
    postedByName,
    reqId,
    source,
    title,
    postedId,
    projUnitIdEnc,
  }: {
    reqId: string;
    source: "projBanner" | "projCard" | "propCard" | "propBanner";
    modal_type: "PROJECT_REQ_CALLBACK" | "PROPERTY_REQ_CALLBACK" | "REQ_QUOTE";
    postedByName: string;
    title: string;
    postedId: number;
    projUnitIdEnc?: string;
    cg?: string;
  }) => {
    setPopupState({
      opened: true,
      reqId,
      source,
      MODAL_TYPE: modal_type,
      postedByName,
      title,
      postedId,
      projUnitIdEnc: modal_type === "REQ_QUOTE" ? projUnitIdEnc : undefined,
    });
  };

  const close = () => {
    setPopupState((prev) => ({ ...prev, opened: false }));
  };

  return [
    popupState.opened,
    {
      open,
      close,
      reqId: popupState.reqId,
      source: popupState.source,
      cg: popupState.cg,
      MODAL_TYPE: popupState.MODAL_TYPE,
      postedByName: popupState.postedByName,
      title: popupState.title,
      postedId: popupState.postedId,
      projUnitIdEnc: popupState.projUnitIdEnc,
    },
  ] as const;
};
