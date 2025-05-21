/* eslint-disable no-unused-vars */
"use client";

type Props = {
  onSelect: (bhk: string) => void;
  bhkNames:any;
  selectedBHK:string
};

export function BHKTabs({ onSelect, bhkNames, selectedBHK }: Props) {

  return (
    <div className="p-2 bg-white rounded-xl shadow-md mr-auto border-solid border-t-[1px] max-w-[100%]  ">
      <div className="flex flex-nowrap overflow-x-auto gap-2 w-auto pb-[4px] p-[2px] ">
        {bhkNames.map((bhk:any) => (
          <button
            key={bhk}
            onClick={() => onSelect(bhk)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ease-in-out !focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0073C6] ${
              selectedBHK === bhk
                ? "bg-[#0073C6] text-white shadow-lg transform scale-105"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
            }`}
          >
            {bhk}
          </button>
        ))}
     </div>
    </div>
  );
}
