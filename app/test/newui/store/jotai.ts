import { atomWithReducer } from "jotai/utils";
import React from "react";

// Define action types
type ModalAction =
  | { type: "OPEN"; content: React.ReactNode }
  | { type: "CLOSE" };

// Define the state type
interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
}

// Define the initial state
const initialState: ModalState = { isOpen: false, content: null };

// Create the reducer function
const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "OPEN":
      return { isOpen: true, content: action.content };
    case "CLOSE":
      return initialState;
    default:
      return state;
  }
};

// Create the atom with the reducer
export const modalAtom = atomWithReducer(initialState, modalReducer);
