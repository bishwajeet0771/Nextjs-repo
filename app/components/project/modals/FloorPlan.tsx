"use client";
import { Modal, Select } from "@mantine/core";
// import { use, useRef } from "react";
import {
  DropDownIcon,
  FloorPlanModalIcon,
  PopupOpenSvg,
  // propertyDetailsSvgs,
} from "@/app/images/commonSvgs";
import S from "@/app/styles/Floorplan.module.css";
import Image from "next/image";
import CarouselModal from "./Carousel";
import { filterKeysDetails, projectprops } from "@/app/data/projectDetails";
import { useFormContext } from "@/app/context/floorplanContext";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import { useFloorPlanPopup } from "@/app/hooks/useFloorPlanPopup";
import { useSubFloorPlanPopup } from "@/app/hooks/useSubFloorplanPopup";
import clsx from "clsx";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";
import { ImgNotAvail } from "@/app/data/project";
import { unitFloorsAtom } from "../byunitblock";
import Button from "../../atoms/buttons/variansts";
// import SelectedFilters from "./filters/SelectedFilters";
const SelectedFilters = dynamic(() => import("./filters/SelectedFilters"));

import { formatNumberWithSuffix } from "@/app/utils/numbers";
import ColumnVirtualizerFixed from "./VitualizedListCol";
import { SelectCreatable } from "./filters/UnitINput";
import useRecentUnits from "@/app/hooks/project/useRecentUnits";
// import RecentSearchedUnits from "../_ui/RecentSearchedUnits";
import { RightSection } from "./FloorplanModalRightSection";
import dynamic from "next/dynamic";

type Props = {
  propCgId: any;
  data?: any;
  projName?: string;
  form: any;
  floorPlanType: string;
  postedData: any;
};

function FloorPlanModal({
  propCgId,
  data,
  projName,
  form: unitTypeForm,
  floorPlanType,
  postedData,
}: Props) {
  const [selectedFloor, setSelectedFloor] = useAtom(selectedFloorAtom);
  const [floorsArray, setFloorsArray] = useAtom(floorPlansArray);
  const setUnitsFloor = useSetAtom(unitFloorsAtom);
  const [opened, { close }] = useFloorPlanPopup();
  const form = useFormContext();
  const handleClose = () => {
    close();
    if (!selectedFloor) {
      setSelectedFloor(data[0]);
      setFloorsArray(data);
    }
    if (floorPlanType === "unit") {
      unitTypeForm.setValues(setPropertyValues(selectedFloor, propCgId));
      setUnitsFloor(floorsArray);
    }
    const keys = Object.keys(form.values);
    keys.forEach((key) => form.setFieldValue(key, null));
  };
  const handleSearch = (excludeKey: string): void => {
    const filteredData = data.filter((item: any) => {
      const matches = Object.entries(form.values).every(([formKey, value]) => {
        if (formKey === excludeKey) {
          return true;
        }
        if (value !== null) {
          // @ts-ignore
          const itemValue = String(item[formKey]).toLowerCase();
          // @ts-ignore
          const formValue = String(value).toLowerCase();
          return itemValue === formValue;
        }
        return true;
      });
      return matches;
    });
    setSelectedFloor({
      ...filteredData[0],
      floorPlanUrl: filteredData[0]?.floorPlanUrl ?? ImgNotAvail,
    });
    setFloorsArray(filteredData);
  };

  const handleReset = () => {
    setSelectedFloor(null);
    setFloorsArray(data);
    const keys = Object.keys(form.values);
    // dont' do one by one
    // keys.forEach((key) => form.setFieldValue(key, null));
    const resetValues = keys.reduce((acc: any, key) => {
      acc[key] = null;
      return acc;
    }, {});
    form.setValues(resetValues);
  };
  const handleRemoveFilter = (key: string) => {
    const keysWithNonNullValues = Object.keys(form.values).filter(
      (key) => form.values[key] !== null
    );
    if (keysWithNonNullValues.length === 1) {
      form.setFieldValue(key, null);
      setSelectedFloor(null);
      setFloorsArray(data);
      return;
    }
    form.setFieldValue(key, null);
    handleSearch(key);
  };
  const [o] = useSubFloorPlanPopup();
  const showClearAll = Object.values(form.values).some(
    (value) => value !== null && value !== "" && value !== 0
  );

  if (!opened) {
    return null;
  }
  return (
    <Modal
      opened={opened}
      classNames={{
        root: S.mainComntainerFloorPlan,
        title: S.title,
        close: S.close,
        content: S.content,
        overlay: S.overlay,
        inner: o ? S.hidden : undefined,
      }}
      centered
      onClose={handleClose}
      title="Floor Plan"
      size={"100%"}
    >
      <div className="bg-white w-full h-auto px-1 xl:pl-5">
        <p
          className={`text-[#001F35] text-[13px] xl:text-xl not-italic font-semibold mt-2   ${
            showClearAll ? "mb-2 sm:mb-7" : "mb-0"
          }`}
        >
          See floor plan according to your selections
        </p>

        <SelectedFilters
          form={form}
          propCgId={propCgId}
          projectprops={projectprops}
          showClearAll={showClearAll}
          handleRemoveFilter={handleRemoveFilter}
          filterKeysDetails={filterKeysDetails}
        />

        <div className="flex justify-start items-start gap-5 xl:gap-[45px] flex-col  md:flex-row w-full xl:pb-[3%] ">
          <LeftSection
            propCgId={propCgId}
            data={data}
            handleReset={handleReset}
            showClearAll={showClearAll}
          />
          <MiddleSection
            projName={projName}
            propCgId={propCgId}
            allUnits={data}
            handleReset={handleReset}
          />
          {selectedFloor && (
            <RightSection
              key="projRightSection4"
              propCgId={propCgId}
              data={data}
              postedData={postedData}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default FloorPlanModal;
const LeftSection = ({ propCgId, data, handleReset, showClearAll }: any) => {
  const [, setFloorsArray] = useAtom(floorPlansArray);
  const [, setFloor] = useAtom(selectedFloorAtom);
  const { getInputProps, values, setFieldValue, setValues } = useFormContext();
  const { setPreviousFilers } = useRecentUnits();
  const getOptions = (property: string): string[] => {
    const optionsSet = new Set<string>();
    data?.forEach((item: any) => {
      if (
        Object.prototype.hasOwnProperty.call(item, property) &&
        item[property] !== "null" &&
        item[property] !== "undefined" &&
        item[property] !== "None"
      ) {
        const allValuesMatch = Object.keys(values).every(
          (key) =>
            !values[key] ||
            String(item[key]).toLowerCase() == values[key].toLowerCase()
        );
        if (allValuesMatch) {
          optionsSet.add(item[property].toString());
        }
      }
    });

    const options = Array.from(optionsSet);
    return options;
  };
  {
    /* Unit Details Section */
  }
  // <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
  //   <h4 className="text-lg font-semibold text-[#303A42] border-b pb-2">
  //     Area Details
  //   </h4>
  //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //     <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //       <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //         <FaRuler className="text-[#0073C6] text-2xl" />
  //       </div>
  //       <div>
  //         <p className="text-[#4D6677] text-sm font-medium">Carpet Area</p>
  //         <p className="text-[#303A42] text-base font-semibold">
  //           {currentUnit.caretarea} sq.ft
  //         </p>
  //       </div>
  //     </div>

  //     <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //       <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //         <FaRuler className="text-[#0073C6] text-2xl" />
  //       </div>
  //       <div>
  //         <p className="text-[#4D6677] text-sm font-medium">
  //           Super Built-up Area
  //         </p>
  //         <p className="text-[#303A42] text-base font-semibold">
  //           {currentUnit.superBuildUparea} sq.ft
  //         </p>
  //       </div>
  //     </div>

  //     <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //       <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //         <FaHome className="text-[#0073C6] text-2xl" />
  //       </div>
  //       <div>
  //         <p className="text-[#4D6677] text-sm font-medium">Tower</p>
  //         <p className="text-[#303A42] text-base font-semibold">
  //           {currentUnit.towerName}
  //         </p>
  //       </div>
  //     </div>

  //     <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //       <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //         <FaBuilding className="text-[#0073C6] text-2xl" />
  //       </div>
  //       <div>
  //         <p className="text-[#4D6677] text-sm font-medium">Floor</p>
  //         <p className="text-[#303A42] text-base font-semibold">
  //           {currentUnit.floor === 0
  //             ? "Ground Floor"
  //             : `${currentUnit.floor}${(() => {
  //                 const suffixes = ["th", "st", "nd", "rd"];
  //                 const v = currentUnit.floor % 100;
  //                 return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  //               })()} Floor`}
  //         </p>
  //       </div>
  //     </div>
  //   </div>

  //   <h4 className="text-lg font-semibold text-[#303A42] border-b pb-2 mt-6">
  //     Unit Features
  //   </h4>
  //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //     <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //       <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //         <FaBuilding className="text-[#0073C6] text-2xl" />
  //       </div>
  //       <div>
  //         <p className="text-[#4D6677] text-sm font-medium">Unit Type</p>
  //         <p className="text-[#303A42] text-base font-semibold">
  //           {currentUnit.bhkName}
  //         </p>
  //       </div>
  //     </div>

  //     <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //       <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //         <FaCompass className="text-[#0073C6] text-2xl" />
  //       </div>
  //       <div>
  //         <p className="text-[#4D6677] text-sm font-medium">Facing</p>
  //         <p className="text-[#303A42] text-base font-semibold">
  //           {currentUnit.facingName}
  //         </p>
  //       </div>
  //     </div>

  //     <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //       <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //         <FaBath className="text-[#0073C6] text-2xl" />
  //       </div>
  //       <div>
  //         <p className="text-[#4D6677] text-sm font-medium">Bathrooms</p>
  //         <p className="text-[#303A42] text-base font-semibold">
  //           {currentUnit.totalNumberofBathroom}
  //         </p>
  //       </div>
  //     </div>

  //     <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //       <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //         <FaHome className="text-[#0073C6] text-2xl" />
  //       </div>
  //       <div>
  //         <p className="text-[#4D6677] text-sm font-medium">Balconies</p>
  //         <p className="text-[#303A42] text-base font-semibold">
  //           {currentUnit.totalNumberOfBalcony}
  //         </p>
  //       </div>
  //     </div>

  //     <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //       <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //         <FaCar className="text-[#0073C6] text-2xl" />
  //       </div>
  //       <div>
  //         <p className="text-[#4D6677] text-sm font-medium">Car Parking</p>
  //         <p className="text-[#303A42] text-base font-semibold">
  //           {currentUnit.noOfCarParking} {currentUnit.parkingType}
  //         </p>
  //       </div>
  //     </div>

  //     {currentUnit.terraceArea && currentUnit.terraceArea !== "null" && (
  //       <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
  //         <div className="bg-[#ECF7FF] p-2 rounded-lg">
  //           <FaTree className="text-[#0073C6] text-2xl" />
  //         </div>
  //         <div>
  //           <p className="text-[#4D6677] text-sm font-medium">Terrace Area</p>
  //           <p className="text-[#303A42] text-base font-semibold">
  //             {currentUnit.terraceArea} sq.ft
  //           </p>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // </div>;
  const handleSearch = (key: string) => {
    const keysWithNonNullValues = Object.keys(values).filter(
      (key) => values[key] !== null
    );
    if (keysWithNonNullValues.length === 0) {
      return;
    }

    // setFilteredUnits(floornPlanArray)
    const filteredData = data.filter((item: any) => {
      return Object.keys(values).every(
        (key) =>
          !values[key] ||
          String(item[key]).toLowerCase() === values[key].toLowerCase()
      );
    });
    setFloor({
      ...filteredData[0],
      floorPlanUrl: filteredData[0]?.floorPlanUrl ?? ImgNotAvail,
    });
    setFloorsArray(filteredData);
    if (key === "unitNumber" && filteredData.length > 0) {
      const filteredItem = filteredData[0];
      const filteredValues: { [key: string]: string } = {};
      Object.keys(filteredItem).forEach((prop) => {
        filteredValues[prop] = String(filteredItem[prop]);
      });
      setValues(setPropertyValues(filteredValues, propCgId));
    }
  };
  const handleOnChange = (value: string, key: string) => {
    setFieldValue(key, value);
    let prevObj = values;
    prevObj[key] = value;
    setPreviousFilers(prevObj);
    setValues(prevObj);
    handleSearch(key);
  };
  return (
    <div className="col-span-1 w-full max-w-[392px] mr-[3%]  ">
      <div className="w-[100%] flex justify-between items-start flex-wrap gap-[5%] z-[100000]">
        {(propCgId === projectprops.apartment ||
          propCgId === projectprops.villament) && (
          <Select
            key={"towerName"}
            w={"full"}
            // mt="md"
            label="Select Tower"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("towerName")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("towerName")}
            onChange={(value) => handleOnChange(value as string, "towerName")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}
        <SelectCreatable
          key={"unitNumber"}
          value={values.unitNumber}
          label="Select Unit Number"
          data={getOptions("unitNumber")}
          onChange={(value) => handleOnChange(value as string, "unitNumber")}
          {...(propCgId === 32 && { mt: "md" })}

          // w={"full"}
          // className="!w-[46%]"
          // placeholder="-- select --"
          // data={getOptions("unitNumber")}
          // searchable
          // {...getInputProps("unitNumber")}
          // onChange={(value) => handleOnChange(value as string, "unitNumber")}
        />
        {propCgId == projectprops.apartment &&
          propCgId != projectprops.plot &&
          getOptions("block").filter(
            (option: string) => option !== undefined && option !== "undefined"
          ).length > 0 && (
            <Select
              key={"block"}
              w={"full"}
              mt={
                propCgId == projectprops.apartment &&
                propCgId != projectprops.plot
                  ? "md"
                  : "0px"
              }
              label="Select Block"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("block").filter(
                (option: string) =>
                  option !== undefined && option !== "undefined"
              )}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("block")}
              onChange={(value) => handleOnChange(value as string, "block")}
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.plot && (
          <Select
            key={
              propCgId == projectprops.rowHouse ||
              propCgId == projectprops.villa
                ? "Elevation"
                : "Floor"
            }
            w={"full"}
            mt={
              propCgId == projectprops.rowHouse ||
              propCgId == projectprops.villa
                ? "0px"
                : "md"
            }
            label={`${
              propCgId == projectprops.rowHouse ||
              propCgId == projectprops.villa
                ? "Select Elevation"
                : "Select At Floor"
            }`}
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("floor").map((item) =>
              item === "0"
                ? { value: "0", label: "G" }
                : { value: item, label: item }
            )}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("floor")}
            onChange={(value) => handleOnChange(value as string, "floor")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId != projectprops.plot && (
          <Select
            key={"bhkName"}
            w={"full"}
            mt="md"
            label="Select Unit Type"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("bhkName")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("bhkName")}
            onChange={(value) => handleOnChange(value as string, "bhkName")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}
        {getOptions("aptTypeName").length > 0 &&
          (propCgId == projectprops.apartment ||
            propCgId == projectprops.villament) && (
            <Select
              key={"unit-type-name"}
              w={"full"}
              mt="md"
              label={`${
                propCgId == projectprops.villament
                  ? "Select Villament Type"
                  : "Select Apartment Type"
              }`}
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("aptTypeName")}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("aptTypeName")}
              onChange={(value) =>
                handleOnChange(value as string, "aptTypeName")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {getOptions("facingName").filter(
          (option: string) => option !== "Don't Know"
        ).length > 0 && (
          <Select
            key={"facingName"}
            w={"full"}
            mt="22px"
            label={`${
              propCgId == projectprops.plot
                ? "Select Plot Facing"
                : "Select Facing"
            } `}
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("facingName").filter(
              (option: string) => option !== "Don't Know"
            )}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("facingName")}
            onChange={(value) => handleOnChange(value as string, "facingName")}
            classNames={{
              input: S.input,
              label: S.label,
              option: S.option,
              root: S.root,
            }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId != projectprops.plot && (
          <Select
            key={"sba"}
            w={"full"}
            mt="md"
            label="Super Built-up Area "
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("superBuildUparea")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("superBuildUparea")}
            onChange={(value) =>
              handleOnChange(value as string, "superBuildUparea")
            }
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId != projectprops.plot && (
          <Select
            key={"carpet_area"}
            w={"full"}
            mt="md"
            label="Select Carpet Area"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("caretarea")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("caretarea")}
            onChange={(value) => handleOnChange(value as string, "caretarea")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}
        {propCgId != projectprops.apartment &&
          propCgId != projectprops.plot &&
          getOptions("gardenArea").filter((item) => item !== "undefined")
            .length > 0 && (
            <Select
              key={"gardenArea"}
              w={"full"}
              mt="md"
              label="Select Garden Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("gardenArea").filter(
                (item) => item !== "undefined"
              )}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("gardenArea")}
              onChange={(value) =>
                handleOnChange(value as string, "gardenArea")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}
        {propCgId != projectprops.apartment &&
          propCgId != projectprops.plot &&
          getOptions("terraceArea").filter(
            (item) => item !== "undefined" && item != "null"
          ).length > 0 && (
            <Select
              key={"terrace Area"}
              w={"full"}
              mt="md"
              label="Select Terrace Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("terraceArea").filter(
                (item) => item !== "undefined" && item != "null"
              )}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("terraceArea")}
              onChange={(value) =>
                handleOnChange(value as string, "terraceArea")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}
        {propCgId != projectprops.apartment &&
          propCgId != projectprops.plot &&
          getOptions("parkingArea") != undefined &&
          getOptions("parkingArea").filter((item) => item !== "None").length >
            0 && (
            <Select
              key={"parkingarea"}
              w={"full"}
              mt="md"
              label="Select Parking Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("parkingArea").filter(
                (item) => item !== "undefined"
              )}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("parkingArea")}
              onChange={(value) =>
                handleOnChange(value as string, "parkingArea")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.plot &&
          getOptions("noOfCarParking").filter((item) => item !== "0").length >
            0 && (
            <Select
              key={"#esdfsd"}
              w={"full"}
              mt="md"
              label="Select Car Parking"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("noOfCarParking").filter((item) => item !== "0")}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("noOfCarParking")}
              onChange={(value) =>
                handleOnChange(value as string, "noOfCarParking")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId == projectprops.apartment &&
          getOptions("parkingType").filter((item) => item !== "None").length >
            0 && (
            <Select
              key={"#sfgf"}
              w={"full"}
              mt="md"
              label="Open/Covered Parking"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("parkingType").filter((item) => item !== "None")}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("parkingType")}
              onChange={(value) =>
                handleOnChange(value as string, "parkingType")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.plot &&
          getOptions("totalNumberOfBalcony").filter((item) => item !== "0")
            .length > 0 && (
            <Select
              key={"Iweruhjksdfjk"}
              w={"full"}
              mt="md"
              label="Select Balcony"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("totalNumberOfBalcony").filter(
                (item) => item !== "0"
              )}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("totalNumberOfBalcony")}
              onChange={(value) =>
                handleOnChange(value as string, "totalNumberOfBalcony")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.plot && (
          <Select
            key={"324sdgsfgf"}
            w={"full"}
            mt="md"
            label="Select Bathroom"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("totalNumberofBathroom")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("totalNumberofBathroom")}
            onChange={(value) =>
              handleOnChange(value as string, "totalNumberofBathroom")
            }
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId == projectprops.villament &&
          propCgId != projectprops.plot &&
          getOptions("totalBalconySize").length > 0 && (
            <Select
              key={"totalBalconySize"}
              w={"full"}
              mt="md"
              label="Select Balcony Size"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("totalBalconySize")}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("totalBalconySize")}
              onChange={(value) =>
                handleOnChange(value as string, "totalBalconySize")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {(propCgId == projectprops.plot ||
          propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse) && (
          <Select
            key={"plotArea123"}
            w={"full"}
            mt="md"
            label="Select Plot Area"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("plotArea")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("plotArea")}
            onChange={(value) => handleOnChange(value as string, "plotArea")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId == projectprops.plot && (
          <Select
            key={"lengthOfPlot"}
            w={"full"}
            mt="md"
            label="length Of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("length")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("length")}
            onChange={(value) => handleOnChange(value as string, "length")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId == projectprops.plot && (
          <Select
            key={"widthOfPlot"}
            w={"full"}
            mt="md"
            label="Breadth of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("width")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("width")}
            onChange={(value) => handleOnChange(value as string, "width")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}
      </div>
      <Button
        variant="blue"
        className="text-[14px] xl:!text-lg mt-4"
        onClick={handleReset}
        showButton={showClearAll}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

const MiddleSection = ({
  hide = false,
  projName,
  propCgId,
  allUnits,
  // handleReset,
}: any) => {
  const data = useAtomValue(selectedFloorAtom);
  const { setValues } = useFormContext();
  const [floorsArray, setFloorsArray] = useAtom<any>(floorPlansArray);
  const [, { open }] = useSubFloorPlanPopup();
  const [selectedFloor, setFloor] = useAtom(selectedFloorAtom);
  const selectImg = (index: number, recentActiveId?: string) => {
    if (recentActiveId) {
      const selectedItem = allUnits.find(
        (item: any) => item.unitIdEnc == recentActiveId
      );
      setFloor({
        ...selectedItem,
        floorPlanUrl: selectedItem?.floorPlanUrl ?? ImgNotAvail,
      });
      // @ts-ignore
      setFloorsArray([selectedItem]);
      setValues(setPropertyValues(selectedItem, propCgId));
      return;
    }
    // if (selectedFloor?.unitNumber !== floorsArray[index].unitNumber) {
    setFloor({
      ...floorsArray[index],
      floorPlanUrl: floorsArray[index].floorPlanUrl ?? ImgNotAvail,
    });
    setValues(setPropertyValues(floorsArray[index], propCgId));
    handleSearch(index);
    // }
  };
  const handleSearch = (index: number): void => {
    const filteredFloors = floorsArray?.filter(
      (floor: any) => floor.unitNumber === floorsArray[index].unitNumber
    );
    // setFilteredUnits(floorsArray)
    // @ts-ignore
    setFloorsArray(filteredFloors);
  };
  // const recentFiltersClick = (activeFilters: any) => {
  //   handleReset();
  //   setValues(activeFilters);
  //   const filteredData = allUnits.filter((item: any) => {
  //     return Object.keys(activeFilters).every(
  //       (key) =>
  //         !activeFilters[key] ||
  //         String(item[key]).toLowerCase() === activeFilters[key].toLowerCase()
  //     );
  //   });
  //   setFloor({
  //     ...filteredData[0],
  //     floorPlanUrl: filteredData[0]?.floorPlanUrl ?? ImgNotAvail,
  //   });
  //   // @ts-ignore
  //   setFloorsArray(filteredData);

  //   if (activeFilters.unitNumber && filteredData.length > 0) {
  //     const filteredItem = filteredData[0];
  //     const filteredValues: { [key: string]: string } = {};
  //     Object.keys(filteredItem).forEach((prop) => {
  //       filteredValues[prop] = String(filteredItem[prop]);
  //     });
  //     setValues(setPropertyValues(filteredValues, propCgId));
  //   }
  // };
  return (
    <div className="flex flex-col justify-center items-start shrink-0 w-full sm:max-w-[300px] md:max-w-[500px] xl:max-w-[686px]">
      <p className=" w-full  mb-[1%] text-[#001F35] text-[12px] text-center p-2 xl:text-right xl:text-sm not-italic font-medium leading-[normal] tracking-[0.56px] ">
        {selectedFloor && (
          <>
            {projName}
            {propCgId != projectprops.plot &&
              selectedFloor?.bhkName &&
              " | " + selectedFloor?.bhkName}
            {propCgId == projectprops.apartment &&
              selectedFloor?.towerName &&
              selectedFloor?.towerName != "NA" &&
              " | Tower " + selectedFloor?.towerName}
            {propCgId != projectprops.plot &&
              ` | ${
                propCgId == projectprops.rowHouse ||
                propCgId == projectprops.villa
                  ? "Elevation"
                  : "Floor"
              } ` +
                `${
                  selectedFloor?.floor?.toString() === "0" &&
                  (propCgId == projectprops.apartment ||
                    propCgId == projectprops.villament)
                    ? "G"
                    : selectedFloor?.floor
                }`}
            {selectedFloor?.unitNumber &&
              " | Unit No. " + selectedFloor?.unitNumber}
            {" | Facing " + selectedFloor?.facingName}
            {propCgId != projectprops.plot &&
              selectedFloor?.superBuildUparea &&
              " | Area. " +
                formatNumberWithSuffix(selectedFloor?.superBuildUparea, false) +
                " sq.ft"}
            {propCgId == projectprops.plot &&
              selectedFloor?.plotArea &&
              " | Area. " +
                formatNumberWithSuffix(selectedFloor?.plotArea, false) +
                " sq.ft"}
          </>
        )}
      </p>
      <div className="relative h-[250px]  xl:h-full px-1 w-full flex justify-center items-center border shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[14px] border-solid border-[#7591A6]">
        {floorsArray != undefined &&
        floorsArray != null &&
        floorsArray.length > 0 &&
        data?.floorPlanUrl ? (
          <picture>
            <source
              media="(max-width: 460px)"
              srcSet={data?.floorPlanUrl.split(",")[1]}
            />
            <source
              media="(max-width: 768px)"
              srcSet={data?.floorPlanUrl.split(",")[2]}
            />
            <source
              media="(max-width: 1200px)"
              srcSet={data?.floorPlanUrl.split(",")[3]}
            />
            <source
              media="(min-width: 1200px)"
              srcSet={data?.floorPlanUrl.split(",")[3]}
            />
            <Image
              // @ts-ignore
              src={`${data?.floorPlanUrl}`}
              alt="Floor Plan"
              unoptimized
              height={350}
              width={800}
              className="border-none w-full cursor-pointer"
              style={{ aspectRatio: "800 / 400", objectFit: "contain" }}
              onClick={open}
            />
          </picture>
        ) : (
          <div className="flex justify-center items-center flex-col h-[391px] ">
            <FloorPlanModalIcon />
            <p className="text-[#303030] font-bold text-[14px] xl:text-2xl not-italic xl:font-medium leading-[normal] tracking-[0.96px] mt-4">
              No Floor Plan Selected
            </p>
            <p className="text-[#303030] text-[12px] xl:text-[15px]  text-center not-italic font-medium leading-[normal] tracking-[0.6px]">
              Please select any floor plan to view details or filter to see
              floor plans
            </p>
          </div>
        )}

        {floorsArray != undefined &&
          floorsArray != null &&
          floorsArray.length > 0 &&
          hide === false &&
          selectedFloor && (
            <button onClick={open}>
              <PopupOpenSvg className="absolute bottom-0 right-0 w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] m-[1%] " />
            </button>
          )}
      </div>
      <CarouselModal projName={projName} propCgId={propCgId} />

      {floorsArray != undefined &&
        floorsArray != null &&
        floorsArray.length > 0 && (
          <div className="flex justify-center  items-center mb-6 sm:mb-0  mt-4 w-full">
            <ColumnVirtualizerFixed
              items={floorsArray}
              itemCount={floorsArray.length}
              height={70}
              itemSize={120}
              overscan={5}
              position="start"
              renderItem={(eachObj: any, index: number) => (
                <div
                  className={clsx(
                    " h-[50px] sm:h-[50px] relative  w-[100px] sm:max-w-[250px] flex justify-center items-center shadow-md  scrollbar-hide rounded-[5px] border-[0.5px] border-solid border-[#92B2C8]",
                    selectedFloor?.floorPlanUrl == eachObj?.floorPlanUrl &&
                      "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] border-2 border-solid border-[#59A1D6]"
                  )}
                >
                  <Image
                    // @ts-ignore
                    src={
                      eachObj?.floorPlanUrl?.split(",")[1]
                        ? `${eachObj?.floorPlanUrl?.split(",")[1]}`
                        : ImgNotAvail
                    }
                    alt="Floor Plan"
                    // width={57}
                    // height={37}
                    fill
                    className="w-full h-full cursor-pointer rounded-[5px]"
                    style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
                    onClick={() => selectImg(index)}
                    unoptimized
                  />
                </div>
              )}
            />
          </div>
        )}

      {/* <RecentSearchedUnits
        recentFiltersClick={recentFiltersClick}
        propCgId={propCgId}
      /> */}
    </div>
  );
};

export { MiddleSection, RightSection };
