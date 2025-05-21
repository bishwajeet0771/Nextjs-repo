import React from "react";
import { useAtomValue } from "jotai";
import { overlayAtom } from "../../../store/overlay";

const PropertyHighlights: React.FC = () => {
  const { content: highlights } = useAtomValue(overlayAtom);

  return (
    <div className="bg-gray-700 text-white shadow-lg rounded-lg p-2  mx-auto border border-gray-700">
      <ul className="space-y-4">
        {highlights.map((highlight: string) => (
          <li key={highlight} className="flex items-start space-x-1">
            <svg
              className="h-6 w-6 text-green-400 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg font-semibold">{highlight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyHighlights;
