/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

type FilterInputProps = {
  value: string;
  options: string[] | number[];
  placeholder: string;
  onChange: (value: string) => void;
  onBlur?:any;
  onSearchChange?:any;
};

const FilterInput: React.FC<FilterInputProps> = ({
  value,
  options,
  placeholder,
  onChange, 
  onBlur,
  onSearchChange
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    String(option).toLowerCase().includes(value !== undefined && value !== "" && typeof(value) !== "number" ? value.toLowerCase() : value)
  );


  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative w-full p-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0073C6] ">
        <input
          type="text"
          value={value}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-[90%] truncate focus:outline-none"
          placeholder={placeholder}
          onBlur={(e) => onBlur(e.target.value)}
        />
        {value ? (
          <button
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={`Clear ${placeholder} filter`}
          >
            <FaTimes />
          </button>
        ) : (
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        )}
      </div>
      {isFocused && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(String(option));
                setIsFocused(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterInput;
