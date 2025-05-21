import { filterKeysDetails } from "@/app/data/projectDetails";
import useRecentUnits from "@/app/hooks/project/useRecentUnits";
import React from "react";
import Tooltip from "../../atoms/Tooltip";

type Props = {
  propCgId: number;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  recentFiltersClick: (filters: any) => void;
};

export default function RecentSearchedUnits({
  propCgId,
  recentFiltersClick,
  className,
}: Props) {
  const { recentUnits } = useRecentUnits();
  return (
    recentUnits.length > 0 && (
      <div className={className ?? ""}>
        <h3 className="text-lg font-semibold mb-1">Last Searches:</h3>
        <ul className="flex flex-wrap gap-2">
          {recentUnits.reverse().map((unit: any) => {
            // Extract key-value pairs
            const entries = Object.entries(unit);

            // Get the first two non-null filters
            const firstTwoNonNullableEntries = entries
              .filter(([, value]) => value !== null)
              .slice(0, 2);

            // Prepare display label
            const label = firstTwoNonNullableEntries.map(
              ([key, value]: any) => (
                <span
                  key={key}
                  onClick={() => {
                    recentFiltersClick(unit);
                  }}
                >
                  <strong>
                    {filterKeysDetails?.get(key)?.name !== undefined
                      ? filterKeysDetails?.get(key)?.name === "Floor" &&
                        (propCgId === 31 || propCgId === 33)
                        ? "Elevation"
                        : filterKeysDetails?.get(key)?.name
                      : key}
                    :
                  </strong>{" "}
                  {value == 0 ? "G" : value}
                  {firstTwoNonNullableEntries.length > 1 &&
                    firstTwoNonNullableEntries.indexOf(
                      firstTwoNonNullableEntries[
                        firstTwoNonNullableEntries.length - 1
                      ]
                    ) <
                      firstTwoNonNullableEntries.length - 1 &&
                    " - "}{" "}
                  {/* Add dash between first and second */}
                </span>
              )
            );
            // Check if there are additional filters
            const hasMoreFilters = entries.length > 2;

            return (
              <Tooltip
                key={unit.id}
                text={
                  <div className="text-sm">
                    {/* Click-to-apply message */}
                    <div className="mb-1 text-white font-bold text-xs italic bg-btnPrimary p-1 rounded-md text-center">
                      Reverse To Previous Search
                    </div>

                    {/* Show all filters in the tooltip */}
                    {entries.map(
                      ([key, value]: [string, any]) =>
                        value && (
                          <div key={key}>
                            <strong className="capitalize">
                              {filterKeysDetails?.get(key)?.name !== undefined
                                ? filterKeysDetails?.get(key)?.name ===
                                    "Floor" &&
                                  (propCgId === 31 || propCgId === 33)
                                  ? "Elevation"
                                  : filterKeysDetails?.get(key)?.name
                                : key}
                            </strong>
                            : {value == 0 ? "G" : value}
                          </div>
                        )
                    )}
                  </div>
                }
              >
              <div className="inline-flex justify-center items-center gap-2 rounded-lg px-3 py-1.5 border border-gray-300 bg-white text-blue-700 text-[13px] sm:text-sm font-medium cursor-pointer text-nowrap shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200">
             
                  {label} {/* Show the first two filters */}
                  {hasMoreFilters && (
                    <span className="text-gray-500"> ...</span>
                  )}{" "}
                  {/* Indicate more filters */}
                </div>
              </Tooltip>
            );
          })}
        </ul>
      </div>
    )
  );
}
