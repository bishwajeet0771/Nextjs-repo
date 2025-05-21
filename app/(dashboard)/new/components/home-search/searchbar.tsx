// import config from "./config";
import Button from "./button";
// import { useState } from "react";
import { Pill, PillsInput, RangeSlider } from "@mantine/core";
import { useDisclosure, useMediaQuery, useClickOutside } from "@mantine/hooks";
import { FaLocationDot, FaCaretDown } from "react-icons/fa6";
import useSearchFilters from "@/app/hooks/search";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import useQsearch from "@/app/hooks/search/useQsearch";
import Results from "@/app/(dashboard)/searchOldPage/components/filter/results";
import classes from "@/app/styles/search.module.css";
import { filterParser } from "@/app/utils/search";
import { createQueryString } from "@/app/utils/search/query";
import { formatBudgetValue } from "@/app/(dashboard)/searchOldPage/components/buget";
import Link from "next/link";

// interface filters {
//   bhks: string[];
//   postedBy: string;
//   houseType: string[];
//   propertyType: string;
//   priceRange: [number, number];
// }

// const initialFilters: filters = {
//   bhks: [],
//   postedBy: "",
//   houseType: [],
//   propertyType: "",
//   priceRange: [0, 100],
// };

const Searchbar = () => {
  const {
    filters: f,
    setPropTypes,
    handleCheckboxClick,
    handleSliderChange,
    remnoveSearchOptions,
    setFilters,
  } = useSearchFilters();
  const { onSearchChange, debounced, name } = useQsearch();

  // const [userLocation, setUserLocation] = useState(null);

  // Function to get user's current location
  // const getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     // Request user's current location
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //
  //         // Extract latitude and longitude from the position object
  //         const { latitude, longitude } = position.coords;
  //         // Set user's location in state
  //         // @ts-ignore
  //         setUserLocation({ latitude, longitude });
  //       },
  //       (error) => {
  //         console.error("Error getting user location:", error.message);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // };
  const [opened, { close, toggle, open }] = useDisclosure(false);
  const wrapperRef = useClickOutside(() => close());
  const isTab = useMediaQuery("(max-width: 1600px)");

  // styles
  // const rangeSliderClasses = {
  //   bar: "!bg-transparent",
  //   thumb: "!bg-green-600 !border-none",
  // };

  const keys = [35, 33, 31, 34, 32];
  const handleSearch = () => {
    const parsedData = filterParser(f);
    const query = createQueryString(parsedData);
    return query.replace("+", "%2B");
  };
  return (
    <div
      ref={wrapperRef}
      className="border border-[#CBE9FF] rounded-3xl bg-white max-w-[320px]  md:max-w-[800px] overflow-hidden relative px-3"
      style={{ boxShadow: "0px 4px 14px 0px rgba(116, 196, 255, 0.19)" }}
    >
      <section className="w-full flex md:grid md:grid-cols-[300px_auto] h-[80px]">
        <div className="md:grid items-center hidden">
          <button
            onClick={toggle}
            className="text-[16px] md:text-[20px] lg:text-[24px] text-[#737579] text-center flex items-center justify-center gap-5"
          >
            Residential{" "}
            <FaCaretDown
              style={{
                transform: opened ? "rotate(180deg)" : "",
                transitionDuration: "0.5s",
              }}
            />
          </button>
        </div>
        <div className="grid grid-cols-[auto_auto_auto] ">
          <div className="border-l flex gap-3 px-1 md:px-3 place-items-center">
            <div className="flex items-center ">
              <FaLocationDot color="red" size={25} />
            </div>
            <PillsInput classNames={{ input: classes.homePageSearch }}>
              {f.city && (
                <Pill
                  className="capitalize"
                  withRemoveButton
                  classNames={{ root: classes.MultiSelectionPill }}
                  onRemove={() =>
                    setFilters((prev) => ({ ...prev, city: null }))
                  }
                >
                  {f.city.split("+")[0]}
                </Pill>
              )}
              {f.locality?.map(
                (each, index) =>
                  index < (isTab ? 1 : 2) && (
                    <Pill
                      className="capitalize"
                      onRemove={() => remnoveSearchOptions(each, "locality")}
                      key={each}
                      withRemoveButton
                      classNames={{ root: classes.MultiSelectionPill }}
                    >
                      {each.split("+")[0]}
                    </Pill>
                  )
              )}
              {f.locality?.length > (isTab ? 1 : 2) && (
                <Pill
                  className="capitalize"
                  classNames={{ root: classes.MultiSelectionPill }}
                >
                  {`+${f.locality?.length - (isTab ? 1 : 2)} More`}
                </Pill>
              )}

              <PillsInput.Field
                onFocus={open}
                placeholder={
                  f.locality.length > 0
                    ? "Add More"
                    : "Enter City,Locality & Project"
                }
                value={name ?? ""}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </PillsInput>
          </div>

          <div className="hidden md:flex items-center px-3">
            {/* <button
                className="text-[16px] md:text-[20px] lg:text-[24px] flex items-center gap-3 text-slate-500"
                onClick={getUserLocation}
              >
                <FaLocationCrosshairs size={22} />
                Near Me
              </button> */}
          </div>

          <div className="flex items-center">
            <Link
              rel="noopener noreferrer"
              href={`/search?${handleSearch()}`}
              className="bg-green-600  md:text-[24px] px-1 py-1
                 text-white md:py-2 rounded-xl  md:px-5 "
            >
              Search
            </Link>
          </div>
        </div>
      </section>
      {opened &&
        (!debounced ? (
          <section className="p-5 grid gap-5 border-t  ">
            <h5 className="text-sm font-semibold ">Select Property Type</h5>
            <div className="flex gap-14 my-2 flex-wrap">
              {keys.map((keyName) => (
                <Button
                  key={keyName}
                  value={propertyDetailsTypes?.get(keyName)?.name ?? ""}
                  onClick={() =>
                    setPropTypes(
                      propertyDetailsTypes?.get(keyName)?.id as number
                    )
                  }
                  selected={
                    f.propTypes === propertyDetailsTypes?.get(keyName)?.id
                  }
                />
              ))}
            </div>

            <div>
              <h5 className="text-sm font-semibold mb-6">Select BHK Type</h5>
              <div className="flex gap-6  flex-wrap">
                {SEARCH_FILTER_DATA.bhkDetails.map((bhk) => (
                  <Button
                    key={bhk.value}
                    value={bhk.title}
                    onClick={() => handleCheckboxClick("unitTypes", bhk.value)}
                    selected={f.unitTypes.includes(bhk.value)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full flex justify-start items-start flex-col md:flex-row">
              <div className="w-[100%] md:w-[70%] mb-[3%] ">
                <h5 className="text-sm font-semibold mb-2">Budget</h5>
                <p className="flex">
                  Price Range
                  <p className="text-green-600 font-semibold ml-2">
                    ₹{f.bugdetValue.at(0)} Cr - ₹{f.bugdetValue.at(1)} Cr
                  </p>
                </p>

                <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
                  ₹ {formatBudgetValue(f.bugdetValue[0])} - ₹{" "}
                  {formatBudgetValue(f.bugdetValue[1])}
                </p>
                <RangeSlider
                  color="green"
                  key="budgetSlider"
                  minRange={0}
                  min={0}
                  max={60}
                  step={0.05}
                  onChange={(value) => handleSliderChange("bugdetValue", value)}
                  style={{ width: "100%" }}
                  defaultValue={[
                    f?.bugdetValue?.[0] ?? 0.05,
                    f?.bugdetValue?.[1] ?? 60,
                  ]}
                  label={formatBudgetValue}
                />
              </div>
            </div>
          </section>
        ) : (
          <Results />
        ))}
    </div>
  );
};

export default Searchbar;
