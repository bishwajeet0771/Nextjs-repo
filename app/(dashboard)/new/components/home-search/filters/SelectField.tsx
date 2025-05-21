import styles from "./Style.module.css";

import {
  parseDataProjectProps,
  propertyDetailsTypes,
} from "@/app/data/projectDetails";
import { useAtom } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useState } from "react";

const keys = [
  "Apartment",
  "Villa",
  "Villament",
  "RowHouse",
  "Plot",
  "independent",
];

export function SelectField() {
  const [isOpen, setIsOpen] = useState(false);
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const value = f.propType;

  const options = keys
    .filter((item) => !(f.cg === "R" && item === "Plot"))
    .map((item) =>
      item === "Plot" && f.bhk.length > 0 ? null : (
        <div key={item} className={styles.option}>
          <input
            type="radio"
            checked={
              value ===
              parseDataProjectProps[
                item.toLocaleLowerCase() as keyof typeof parseDataProjectProps
              ]
            }
            color="green"
            readOnly
            className={styles.optionInnerFiled}
            onChange={() => {
              dispatch({
                type: "ADD_PROP_TYPE",
                payload: parseDataProjectProps[
                  item.toLocaleLowerCase() as keyof typeof parseDataProjectProps
                ] as number,
              });
              toggleDropdown();
            }}
            id={`item_prop_${item}`}
          />{" "}
          <label htmlFor={`item_prop_${item}`} className="capitalize">
            {item}
          </label>
        </div>
      )
    );

  return (
    <div
      className={styles.newSelectFieldMainCon}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={styles.newSelectdropdown}
        onClick={() => toggleDropdown()}
      >
        <input
          type="button"
          className={styles.newInput}
          value={
            (propertyDetailsTypes?.get(value ?? 0)?.name ?? "") ||
            "Property Type"
          }
        />
        <DropIcon />
      </div>

      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className={styles.newSelectdropdownOuterCon}
        >
          <div className={styles.newSelectdropdownCon}>{options}</div>
        </div>
      )}
    </div>
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
      className=" pointer-events-none min-w-[4px] min-h-[4px] "
    >
      <path
        d="M12.4134 6C13.3274 6 13.7624 7.1251 13.0861 7.73994L10.1727 10.3885C9.79125 10.7352 9.20875 10.7352 8.82733 10.3885L5.91394 7.73994C5.23761 7.1251 5.67257 6 6.58661 6H12.4134Z"
        fill="#8EA8CF"
      />
    </svg>
  );
};
