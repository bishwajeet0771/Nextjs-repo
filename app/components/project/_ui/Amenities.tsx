"use client";

import { useState, useRef } from "react";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { amenitiesGroupList } from "@/app/images/commonSvgs";
import { AmenityList } from "@/app/validations/types/project";

interface Amenity {
  cid: number;
  constDesc: string;
  icon: string;
}

interface AmenitiesSubCategory {
  [key: string]: Amenity[];
}

interface AmenitiesCategory {
  [key: string]: AmenitiesSubCategory;
}

interface AmenitiesDisplayProps {
  amenitiesData: AmenitiesCategory;
  data: AmenityList[];
}

export default function AmenitiesDisplay({
  amenitiesData,
  data,
}: AmenitiesDisplayProps) {
  const categories = Object.keys(amenitiesData);

  const getAvailableSubCategories = (category: string) => {
    return Object.keys(amenitiesData[category]).filter((subCategory) => {
      return amenitiesData[category][subCategory].some((amenity: Amenity) =>
        data.some((item) => item.id === amenity.cid)
      );
    });
  };

  const availableCategories = categories.filter(
    (category) => getAvailableSubCategories(category).length > 0
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    availableCategories[0]
  );
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    availableCategories[0]
  );

  const toggleCategory = (category: string) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainDisplayRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 sm:p-4 rounded-lg min-w-full sm:min-w-fit shadow-md sm:max-w-fit">
      {/* Sidebar Categories - Desktop */}
      <div
        className="hidden md:block w-full md:min-w-[250px] md:max-w-[250px] md:h-[500px] overflow-y-auto mb-4 md:mb-0 md:mr-4 relative"
        ref={sidebarRef}
      >
        <div className="space-y-2">
          {availableCategories.map((category: string) => (
            <div
              key={category}
              className="mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-3"
            >
              <button
              aria-label={category} name={category} title={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex w-full items-center gap-3 text-left px-4 py-2 rounded-md transition duration-200 hover:bg-green-100 ${
                  selectedCategory === category ? "bg-green-50" : ""
                }`}
              >
                <span
                  className={`w-1 h-8 ${
                    selectedCategory === category
                      ? "bg-green-600"
                      : "bg-gray-300"
                  } rounded-full`}
                />
                <span
                  className={`text-base font-semibold ${
                    selectedCategory === category
                      ? "text-green-700"
                      : "text-gray-800"
                  }`}
                >
                  {category}
                </span>
              </button>
              <ul className="ml-6 mt-2 space-y-1">
                {getAvailableSubCategories(category).map((subCategory) => (
                  <li
                    key={subCategory}
                    className={`text-gray-600 text-sm list-disc transition duration-200 cursor-pointer ${
                      selectedCategory === category ? " text-green-800" : ""
                    } hover:text-green-700`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {subCategory}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Categories - Mobile */}
      <div className="md:hidden space-y-2 w-full">
        {availableCategories.map((category: string) => (
          <div
            key={category}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div
              className="bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleCategory(category)}
            >
              <button aria-label={category} name={category} title={category} className="flex w-full items-center justify-between px-4 pt-3  transition duration-200">
                <span className="text-start text-[16px] font-medium text-gray-800">
                  {category}
                </span>
                {expandedCategory === category ? (
                  <IoChevronUpOutline className="h-5 w-5 text-gray-600" />
                ) : (
                  <IoChevronDownOutline className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <ul className="ml-8 pb-1">
                {getAvailableSubCategories(category).map((subCategory) => (
                  <li
                    key={subCategory}
                   /*  className="text-btnPrimary font-medium text-sm list-disc hover:text-gray-900 transition" */
                   className="text-gray-800 font-medium text-sm list-disc hover:text-gray-900 transition"
                  >
                    {subCategory}
                  </li>
                ))}
              </ul>
            </div>

            {expandedCategory === category && (
              <div className="p-4 max-h-[420px] overflow-y-auto">
                <div className="space-y-4">
                  {getAvailableSubCategories(category).map(
                    (subCategory: string) => {
                      const amenitiesInSubCategory = amenitiesData[category][
                        subCategory
                      ].filter((amenity: Amenity) =>
                        data.some((item) => item.id === amenity.cid)
                      );

                      return (
                        <div key={subCategory}>
                          <p className="text-gray-700 text-lg font-semibold mb-2">
                            {subCategory}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {amenitiesInSubCategory.map((amenity: Amenity) => (
                              <div
                                key={amenity.cid}
                                className="p-2 border border-gray-200 rounded-md bg-gray-50 flex items-center space-x-2 text-sm"
                              >
                                <span className="w-6 h-6 flex-shrink-0">
                                  {amenitiesGroupList.get(amenity.cid) ||
                                    amenitiesGroupList.get(0)}
                                </span>
                                <span className="text-gray-800 text-sm font-medium truncate">
                                  {amenity.constDesc}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Display - Desktop */}
      <div
        className="hidden md:block bg-white flex-grow rounded-lg border border-gray-200 shadow-sm overflow-hidden"
        ref={mainDisplayRef}
      >
        <div className="h-[500px] overflow-y-auto">
          {getAvailableSubCategories(selectedCategory).map(
            (subCategory: string, index: number) => {
              const amenitiesInSubCategory = amenitiesData[selectedCategory][
                subCategory
              ].filter((amenity: Amenity) =>
                data.some((item) => item.id === amenity.cid)
              );

              return (
                <div
                  key={subCategory}
                  className={`p-6 ${
                    index !==
                    getAvailableSubCategories(selectedCategory).length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <h3 className="text-gray-800 text-xl font-semibold mb-4">
                    {subCategory}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {amenitiesInSubCategory.map((amenity: Amenity) => (
                      <div
                        key={amenity.cid}
                        className="p-3 border border-gray-200 rounded-md bg-gray-50 flex items-center space-x-3 text-base hover:bg-gray-100 transition duration-200"
                      >
                        <span className="w-8 h-8 flex-shrink-0">
                          {amenitiesGroupList.get(amenity.cid) ||
                            amenitiesGroupList.get(0)}
                        </span>
                        <span className="text-gray-800 font-medium ">
                          {amenity.constDesc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
