import { atomWithReducer } from "jotai/utils";
import React from "react";
// Define action types
export type OverlayAction =
  | {
      type: "OPEN";
      content: any;
      id: string;
      title: string;
      pType: string;
      conType:
        | "nearby"
        | "amenities"
        | "readmore"
        | "bhk"
        | "none"
        | "otherCharges"
        | "hightlights";
      lat?: number;
      lang?: number;
      propId?: string;
    }
  | { type: "CLOSE" };

// Define the state type
interface OverlayState {
  isOpen: boolean;
  content: React.ReactNode | null | any;
  id: string | null;
  title: string;
  conType:
    | "nearby"
    | "amenities"
    | "readmore"
    | "bhk"
    | "none"
    | "otherCharges"
    | "hightlights";
  pType?: string;
  propId?: string;
  lat?: number;
  lang?: number;
}

// Define the initial state
const initialState: OverlayState = {
  isOpen: false,
  content: null,
  id: null,
  title: "",
  conType: "none",
  pType: "",
  propId: "",
};

// Create the reducer function
const overlayReducer = (
  state: OverlayState,
  action: OverlayAction
): OverlayState => {
  const formatNumber = (value: string | undefined): string => {
    if (!value) return "";
    return new Intl.NumberFormat("en-IN").format(Number(value));
  };

  switch (action.type) {
    case "OPEN":
      if (action.conType === "otherCharges") {
        let content = action.content.charges;

        const formattedContent = [
          { label: "Price", value: `₹${formatNumber(content.price)}` },
          ...(content.clubHouseCharge
            ? [
                {
                  label: "Club house Subscription",
                  value:
                    content.clubHouseCharge === "A"
                      ? "Lifetime"
                      : content.clubHouseTill
                      ? `₹${formatNumber(content.clubHouseCharge)} for ${
                          content.clubHouseTill
                        } years`
                      : "Already Included",
                },
              ]
            : []),
          ...(content.securetyType && content.securetyType !== "NA"
            ? [
                {
                  label: "Security Deposit",
                  value: `${
                    content.securetyType === "F"
                      ? formatNumber(content.security.toString())
                      : formatNumber(
                          (content.securityMonth * content.price).toString()
                        )
                  }`,
                },
              ]
            : []),
          {
            label: "Maintenance & Corpus Fund",
            value:
              content.mncCharge === "NA"
                ? "Already Included"
                : formatNumber(content.mncCharge),
          },
          {
            label: "Tax & Government Charges",
            value:
              content.taxGovtCharge === "NA"
                ? "Already Included"
                : formatNumber(content.taxGovtCharge),
          },
          {
            label: "Ownership Transfer Fees",
            value:
              content.ownershipCharge === "NA"
                ? "Already Included"
                : formatNumber(content.ownershipCharge),
          },
          {
            label: "Legal Charges",
            value:
              content.legalCharge === "NA"
                ? "Already Included"
                : formatNumber(content.legalCharge),
          },
          {
            label: "Electricity Charges",
            value:
              content.elctCharge === "NA"
                ? "Already Included"
                : content.elctCharge === "A"
                ? "As Per Actuals"
                : formatNumber(content.elctCharge),
          },
          {
            label: "Water Charges",
            value:
              content.waterCharge === "NA"
                ? "Already Included"
                : content.waterCharge === "A"
                ? "As Per Actuals"
                : formatNumber(content.waterCharge),
          },
          {
            label: "Maintenance Charges",
            value:
              content.maintananceChargess === "NA"
                ? "Already Included"
                : content.maintananceChargess === "A"
                ? "As Per Actuals"
                : formatNumber(content.maintananceChargess),
          },
          ...(content.otherCharge
            ? content.otherCharge.split(",").map((charge: string) => {
                const [type, amount] = charge
                  .split("|")
                  .map((part) => part.trim());
                return { label: type, value: formatNumber(amount) };
              })
            : []),
        ].filter((charge) => charge.value);
        const total = formattedContent.reduce((acc, charge) => {
          const numericValue = parseFloat(charge.value.replace(/[₹,]/g, ""));
          return acc + (isNaN(numericValue) ? 0 : numericValue);
        }, 0);
        return {
          isOpen: true,
          content: {
            data: formattedContent,
            total: formatNumber(total),
          },
          id: action.id,
          title: action.title,
          conType: action.conType,
          pType: action.pType,
          lat: action.lat,
          lang: action.lang,
          propId: action.propId,
        };
      }
      return {
        isOpen: true,
        content: action.content,
        id: action.id,
        title: action.title,
        conType: action.conType,
        pType: action.pType,
        lat: action.lat,
        lang: action.lang,
        propId: action.propId,
      };
    case "CLOSE":
      return initialState;
    default:
      return state;
  }
};

// Create the atom with the reducer
export const overlayAtom = atomWithReducer(initialState, overlayReducer);
