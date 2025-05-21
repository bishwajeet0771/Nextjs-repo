import { Combobox, Input, InputBase, Radio, useCombobox } from "@mantine/core";
import styles from "./Style.module.css";
// import { DropDownIcon } from "@/app/images/commonSvgs";
// import useSearchFilters from "@/app/hooks/search";
import {
  parseDataProjectProps,
  propertyDetailsTypes,
} from "@/app/data/projectDetails";
import { useAtom } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useMediaQuery } from "@mantine/hooks";

const keys = [
  "Apartment",
  "Villa",
  "Villament",
  "RowHouse",
  "Plot",
  "independent",
];



export function BasicSelect() {
  // const { filters: f, setFilters } = useSearchFilters();
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const isTab = useMediaQuery("(max-width: 1600px)");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const value = f.propType;

  const options = keys
    .filter((item) => !(f.cg === "R" && item === "Plot"))
    .map((item) =>
      item === "Plot" && f.bhk.length > 0 ? null : (
        <Combobox.Option
          key={item}
          value={item}
          classNames={{
            option: styles.option,
          }}
        >
          <Radio
            checked={
              value ===
              parseDataProjectProps[
                item.toLocaleLowerCase() as keyof typeof parseDataProjectProps
              ]
            }
            color="green"
            mr={6}
            readOnly
          />{" "}
          <span className="capitalize">{item}</span>
        </Combobox.Option>
      )
    );

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        dispatch({
          type: "ADD_PROP_TYPE",
          payload: parseDataProjectProps[
            val.toLocaleLowerCase() as keyof typeof parseDataProjectProps
          ] as number,
        });
        combobox.closeDropdown();
      }}
      classNames={{
        dropdown: styles.dropdown,
        option: styles.option,
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<DropIcon />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          classNames={{
            input: styles.input,
          }}
          size={isTab ? "xs" : "sm"}
        >
          {(propertyDetailsTypes?.get(value ?? 0)?.name ?? "") || (
            <Input.Placeholder className="!text-black text-nowrap font-[600]">
              Property Type
            </Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
const DropIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M12.4134 6C13.3274 6 13.7624 7.1251 13.0861 7.73994L10.1727 10.3885C9.79125 10.7352 9.20875 10.7352 8.82733 10.3885L5.91394 7.73994C5.23761 7.1251 5.67257 6 6.58661 6H12.4134Z"
        fill="#8EA8CF"
      />
    </svg>
  );
};
