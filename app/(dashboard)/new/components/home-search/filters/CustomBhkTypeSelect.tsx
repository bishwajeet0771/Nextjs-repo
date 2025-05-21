import { useState } from "react";
import styles from "./Style.module.css";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useAtom } from "jotai";

export function CustomBhkTypeSelect() {
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const [expanded, setExpanded] = useState(false); // State to track if the list is expanded
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  if (f.propType === 32) return null;

  const visibleValues = expanded ? f.bhk : f.bhk.slice(0, 3); // Show only the first 3 items if not expanded

  const values = visibleValues.map((itemId) => {
    const selectedItem = SEARCH_FILTER_DATA.bhkDetails.find(
      (item) => item.value === itemId
    );
    if (selectedItem) {
      return (
        <span key={itemId} className={styles.newPill}>
          {selectedItem.title}
          <MiniCrossIcon
            onClick={() => dispatch({ type: "ADD_BHK", payload: itemId })}
          />
        </span>
      );
    }
    return null;
  });

  const options = SEARCH_FILTER_DATA.bhkDetails.map((item: any) => (
    <div key={item.value} className={styles.option}>
      <input
        type="checkbox"
        id={`bhkSelect_${item.value}`}
        checked={f.bhk.includes(item.value)}
        onChange={() => dispatch({ type: "ADD_BHK", payload: item.value })}
        color="green"
        className={styles.optionInnerFiled}
      />
      <label htmlFor={`bhkSelect_${item.value}`}>{item.title}</label>
    </div>
  ));

  return (
    <div
      className={styles.newMultiSelectFieldMainCon}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={styles.newSelectdropdown}
        onClick={() => toggleDropdown()}
      >
        <div className={styles.newSelectdropdownBhksHolder}>
          {values.length > 0 ? (
            <>
              {values}
              {f.bhk.length > 3 && !expanded && (
                <span
                  onClick={() => setExpanded(true)}
                  className={styles.newPill}
                >
                  + {f.bhk.length - 3}
                </span>
              )}
              {expanded && f.bhk.length > 3 && (
                <span
                  onClick={() => setExpanded(false)}
                  className={styles.newPill}
                >
                  Show Less
                </span>
              )}
            </>
          ) : (
            <span className="!text-black leading-0 font-[600] ">BHK Type</span>
          )}
        </div>
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
    >
      <path
        d="M12.4134 6C13.3274 6 13.7624 7.1251 13.0861 7.73994L10.1727 10.3885C9.79125 10.7352 9.20875 10.7352 8.82733 10.3885L5.91394 7.73994C5.23761 7.1251 5.67257 6 6.58661 6H12.4134Z"
        fill="#8EA8CF"
      />
    </svg>
  );
};

export const MiniCrossIcon = ({ onClick }: { onClick: any }) => {
  return (
    <svg
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 30 29"
      fill="none"
      className="cursor-pointer"
    >
      <path
        d="M18.8687 19.6443C19.1086 19.8731 19.4296 19.9972 19.761 19.9893C20.0924 19.9815 20.4072 19.8423 20.636 19.6024C20.8647 19.3624 20.9889 19.0415 20.981 18.71C20.9731 18.3786 20.8339 18.0639 20.594 17.8351L16.6741 14.0969L20.4123 10.1769C20.6411 9.93701 20.7652 9.61603 20.7574 9.2846C20.7495 8.95318 20.6103 8.63845 20.3704 8.40965C20.1305 8.18086 19.8095 8.05674 19.4781 8.0646C19.1466 8.07247 18.8319 8.21167 18.6031 8.45158L14.8649 12.3715L10.945 8.63328C10.705 8.40449 10.3841 8.28037 10.0526 8.28824C9.72121 8.2961 9.40648 8.4353 9.17768 8.67522C8.94889 8.91513 8.82477 9.23611 8.83264 9.56753C8.8405 9.89896 8.9797 10.2137 9.21961 10.4425L13.1395 14.1807L9.40132 18.1007C9.17252 18.3406 9.0484 18.6615 9.05627 18.993C9.06413 19.3244 9.20333 19.6391 9.44325 19.8679C9.68316 20.0967 10.0041 20.2208 10.3356 20.213C10.667 20.2051 10.9817 20.0659 11.2105 19.826L14.9487 15.9061L18.8687 19.6443Z"
        fill="#000000"
      />
    </svg>
  );
};
