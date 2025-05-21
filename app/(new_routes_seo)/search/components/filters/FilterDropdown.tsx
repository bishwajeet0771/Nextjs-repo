import React, { useState, useCallback } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface FilterDropdownProps {
  label: string;
  children: React.ReactNode;
  borderColor: string;
  textColor: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = React.memo(
  ({ label, children, borderColor, textColor }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    return (
      <div className="relative">
        <button
          className={`flex items-center gap-2 px-4 py-2 border-2 rounded-full hover:bg-opacity-5 transition-colors`}
          style={{ borderColor, color: textColor }}
          onClick={toggleDropdown}
        >
          {label}
          <MdKeyboardArrowDown className="w-5 h-5" />
        </button>
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-2 z-50">
            {children}
          </div>
        )}
      </div>
    );
  }
);

FilterDropdown.displayName = "FilterDropdown";

export default FilterDropdown;
