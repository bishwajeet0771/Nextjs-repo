import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0073C6] border-t-transparent" />
        <div className="text-lg font-semibold text-gray-700">
          Loading Search Information...
        </div>
      </div>
    </div>
  );
}
