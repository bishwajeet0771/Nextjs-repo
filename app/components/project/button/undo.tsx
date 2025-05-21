/* eslint-disable no-unused-vars */
import {
  StateHistory,
  UseStateHistoryHandlers,
} from "@/app/hooks/custom/useStateHistory";
import React from "react";

export default function UndoRedo({
  history,
  handlers,
  form,
  handleSearch,
}: {
  history: StateHistory<unknown>;
  handlers?: UseStateHistoryHandlers<unknown>;
  form: any;
  handleSearch: (data: any) => void;
}) {
  const isUno = history.history[history.current - 1] !== undefined;
  const isRedo = history.history[history.current + 1] !== undefined;
  const handleBack = () => {
    handlers?.back();
    if (history.history[history.current - 1] !== undefined) {
      const newData = history.history[history.current - 1] as object;
      form.setValues(newData);
      handleSearch(newData);
    }
  };
  const handleNext = () => {
    handlers?.forward();
    if (history.history[history.current + 1] !== undefined) {
      const newData = history.history[history.current + 1] as object;
      form.setValues(newData);
      handleSearch(newData);
    }
  };
  return (
    <div className="flex ">
      {isUno && (
        <button
          onClick={handleBack}
          className="inline-flex ml-2"

          // onKeyDown={getHotkeyHandler([["mod+Z", handleBack]])}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M5.83337 16.333V14.6663H11.75C12.625 14.6663 13.3856 14.3886 14.0317 13.833C14.6778 13.2775 15.0006 12.583 15 11.7497C14.9995 10.9163 14.6767 10.2219 14.0317 9.66634C13.3867 9.11079 12.6262 8.83301 11.75 8.83301H6.50004L8.66671 10.9997L7.50004 12.1663L3.33337 7.99967L7.50004 3.83301L8.66671 4.99967L6.50004 7.16634H11.75C13.0973 7.16634 14.2537 7.60384 15.2192 8.47884C16.1848 9.35384 16.6673 10.4441 16.6667 11.7497C16.6662 13.0552 16.1837 14.1455 15.2192 15.0205C14.2548 15.8955 13.0984 16.333 11.75 16.333H5.83337Z"
              fill="#0073C6"
            />
          </svg>
          Undo
        </button>
      )}
      {isRedo && (
        <button
          onClick={handleNext}
          className="inline-flex ml-2"
          // onKeyDown={getHotkeyHandler([["mod+y", handleNext]])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M14.1666 16.333V14.6663H8.24996C7.37496 14.6663 6.6144 14.3886 5.96829 13.833C5.32218 13.2775 4.9994 12.583 4.99996 11.7497C5.00051 10.9163 5.32329 10.2219 5.96829 9.66634C6.61329 9.11079 7.37385 8.83301 8.24996 8.83301H13.5L11.3333 10.9997L12.5 12.1663L16.6666 7.99967L12.5 3.83301L11.3333 4.99967L13.5 7.16634H8.24996C6.90274 7.16634 5.74635 7.60384 4.78079 8.47884C3.81524 9.35384 3.33274 10.4441 3.33329 11.7497C3.33385 13.0552 3.81635 14.1455 4.78079 15.0205C5.74524 15.8955 6.90163 16.333 8.24996 16.333H14.1666Z"
              fill="#0073C6"
            />
          </svg>
          Redo
        </button>
      )}
    </div>
  );
}
