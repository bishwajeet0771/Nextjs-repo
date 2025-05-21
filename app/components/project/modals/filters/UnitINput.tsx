/* eslint-disable no-unused-vars */
import { useState, useRef, useMemo } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import S from "@/app/styles/Floorplan.module.css";
import { DropDownIcon } from "@/app/images/commonSvgs";

interface SelectCreatableProps {
  data: string[];
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  label?: string;
}

export function SelectCreatable({
  data,
  onChange,
  placeholder = "Search value",
  label,
  value,
  ...props
}: SelectCreatableProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    return data.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        onChange(val);
        setSearch("");
        combobox.closeDropdown();
      }}
      {...props}
    >
      <Combobox.Target>
        <InputBase
          size="sm"
          label={label}
          rightSection={<DropDownIcon />}
          onChange={(event) => {
            const newValue = event.currentTarget.value;
            setSearch(newValue);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          className="!w-[46%]"
          onClick={() => combobox.openDropdown()}
          onBlurCapture={() => {
            combobox.closeDropdown();
            setSearch("");
          }}
          onFocus={() => combobox.openDropdown()}
          placeholder={placeholder}
          rightSectionPointerEvents="none"
          value={search || value || ""}
          classNames={{ input: S.input, label: S.label }}
          maxLength={45}
        />
      </Combobox.Target>
      <Combobox.Dropdown
        ref={parentRef}
        style={{  maxHeight:"200px", overflow: "auto" }}
        onMouseDown={(e) => {
          if (e.target === parentRef.current) {
            e.preventDefault();
          }
        }}
      >
        <Combobox.Options>
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 35,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <Combobox.Option
                  value={filteredOptions[virtualRow.index]}
                  key={filteredOptions[virtualRow.index]}
                >
                  {filteredOptions[virtualRow.index]}
                </Combobox.Option>
              </div>
            ))}
          </div>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
