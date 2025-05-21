/* eslint-disable no-unused-vars */
"use client";

import { useAtom } from "jotai";
import React, { useState, useRef, useEffect } from "react";
import { projSearchStore } from "../../../store/projSearchStore";
import useProjSearchAppliedFilters from "../../../hooks/useProjSearchAppliedFilters";

interface DynamicSearchProps<T> {
  data: T[];
  displayKey: keyof T;
  valueKey: keyof T;
  multiple?: boolean;
  onChange?: (selected: T[]) => void;
  placeholder?: string;
  label?: string;
  setQuery: (query: string) => void;
  loading: boolean;
  category: "localities" | "builderIds";
}

export default function DynamicSearch<T extends Record<string, any>>({
  data,
  displayKey,
  valueKey,
  multiple = false,
  onChange,
  placeholder = "Search...",
  label = "Search",
  setQuery,
  loading,
  category,
}: DynamicSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [state, dispatch] = useAtom(projSearchStore);
  const [error, setError] = useState("");
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  const filteredItems = loading
    ? []
    : data.filter(
        (item) =>
          String(item.label).toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selected.find((s) => s.value === item.value)
      );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const focusedElement = listRef.current.children[
        focusedIndex
      ] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isOpen]);

  const handleSelect = (item: T) => {
    const isValidBuilderParams = !item.value.includes("/");
    if (isValidBuilderParams || category === "localities") {
      dispatch({
        type: "pushToArray",
        payload: {
          key: category === "localities" ? "localities" : "builderIds",
          value: isValidBuilderParams ? item.value : item.value,
        },
      });
      setSearchTerm("");
      setIsOpen(false);
      setFocusedIndex(-1);
      inputRef.current?.focus();
    } else {
      window.open(item.value, "_blank");
    }
  };

  const handleRemove = (itemValue: string | number) => {
    dispatch({
      type: "removeFromArray",
      payload: {
        key: category === "localities" ? "localities" : "builderIds",
        value: itemValue,
      },
    });
    handleApplyFilters();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredItems[focusedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  const validateSearchTerm = (term: string) => {
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    return !specialCharPattern.test(term);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateSearchTerm(value)) {
      setSearchTerm(value);
      setQuery(value);
      setIsOpen(true);
      setFocusedIndex(-1);
      setError("");
    } else {
      setSearchTerm(value);
      setError("Special Character Not Allowed.");
    }
  };

  return (
    <div ref={wrapperRef} className="w-full max-w-md mb-6">
      <h3 className="text-lg font-semibold mb-3">{label}</h3>
      <div className="relative">
        {state[category].length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {state[category].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm"
              >
                <span>{item.split("+")[0]}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  aria-label={`Remove ${item}`}
                >
                  <svg
                    className="h-4 w-4 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative">
          <input
            id="dynamic-search"
            ref={inputRef}
            type="text"
            className="w-[90%] pl-10 pr-4 mr-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
            onClick={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="search-list"
            role="combobox"
            autoComplete="off"
            maxLength={50}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {isOpen && (
          <ul
            id="search-list"
            ref={listRef}
            className="absolute z-10 w-[90%] mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {error ? (
              <div className="p-3">{error}</div>
            ) : loading ? (
              <li className="px-4 py-2 text-center text-gray-500">
                Loading...
              </li>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={String(item[valueKey])}
                  role="option"
                  aria-selected={index === focusedIndex}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    index === focusedIndex ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-center text-gray-500">
                No items found
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
