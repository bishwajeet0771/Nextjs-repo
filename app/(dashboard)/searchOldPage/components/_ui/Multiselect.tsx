import { useState, useEffect } from "react";
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import useSearchFilters from "@/app/hooks/search";
import toast from "react-hot-toast";
import useNewsearch from "@/app/hooks/search/useNewSearch";
import { extractApiValues } from "@/app/utils/dyanamic/projects";
import { useMediaQuery } from "@mantine/hooks";

// eslint-disable-next-line no-unused-vars
export function MainSearchMultiSelect({ type }: { type: string }) {
  const isMobile = useMediaQuery("(max-width: 601px)");

  const AgentOwnerBuilderMap = new Map([
    ["BuilderAgentListing", "A"],
    ["BuilderOwnerListing", "I"],
    ["BuilderBuilderListing", "B"],
    ["ProjectAgentListing", "A"],
    ["ProjectOwnerListing", "I"],
    ["ProjectBuilderListing", "B"],
  ]);
  const {
    data: searchData,
    isLoading,
    handleResetQuery,
    onSearchChange,
  } = useNewsearch();
  const { filters, setFilters, remnoveSearchOptions } = useSearchFilters();
  const value = [...filters.locality, ...filters.builderIds];
  const {
    localities,
    builders,
    projects,
    listing: listings,
    projectListing,
  } = searchData;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const handleAddSearch = (newItem: string) => {
    if (!filters.locality.includes(newItem)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        locality: [...prevFilters.locality, newItem],
      }));
      handleResetQuery();
    } else {
      toast.error("The locality already exists.");
    }
  };

  const handlePush = async (type: string, data: any) => {
    switch (type) {
      case "Locality":
        handleAddSearch(`${data.name}+${data.stringId}`);
        break;
      case "Projects":
        if (data.type === "Project") {
          window.open(data.stringUrl);
        } else {
          window.open(
            `/search/listing?sf=projIdEnc=${
              data.stringId.split("_")[0]
            }-phaseId=${data.stringId.split("_")[1]}-projName=${data.name}`
          );
        }

        break;
      case "Listings":
        {
          const paramsObject = extractApiValues(data.stringId);

          let url;
          let localityName = data.name.split(" in ")[1].toLowerCase().trim();
          url =
            `propType=${paramsObject.PT}${
              paramsObject.BH ? `-bhk=${paramsObject.BH}` : ""
            }-cg=${paramsObject.CG}-localities=${localityName}` +
            "%2B" +
            encodeURIComponent(paramsObject.LT);

          window.open("/search/listing?sf=" + url);
        }
        break;
      case "Project Listings":
        {
          let projectName = data.name.split(" in ")[1].trim();

          const url = `projIdEnc=${
            data.stringId
          }-listedBy=${AgentOwnerBuilderMap.get(
            data.type
          )}-projName=${projectName}`;
          window.open("/search/listing?sf=" + url);
        }
        break;
      case "Builders":
        if (data.type === "BuilderDetail") {
          window.open(data.stringUrl);
        } else {
          const url =
            encodeURIComponent(data.name) +
            "%2B" +
            encodeURIComponent(data.stringId.split("_")[1]);
          window.open(
            `/search?sf=builderIds=${url}-city=${data.stringId.split("_")[0]}${
              data.type !== "BuilderProject"
                ? `-listedBy=${AgentOwnerBuilderMap.get(data.type)}`
                : ""
            }`
          );
        }
        // setFilters((prevFilters) => ({
        //   ...prevFilters,
        //   builderIds: [...prevFilters.builderIds, `${data.name}+${data.id}`],
        // }));
        // handleResetQuery();
        break;
      default:
        break;
    }
  };
  const values = [...filters.locality, ...filters.builderIds].map((item) => {
    const isBuilder = filters.builderIds.includes(item);

    return (
      <Pill
        key={item}
        withRemoveButton
        onRemove={() =>
          remnoveSearchOptions(item, isBuilder ? "builderIds" : "locality")
        }
      >
        {item.split("+")[0]}
      </Pill>
    );
  });

  // Create a flat list of groups and items
  const data = [
    {
      group: "Locality",
      items: localities || [],
      name: "Locality",
    },
    {
      group: "Projects",
      items: projects || [],
      name: "Project",
    },
    {
      group: "Listings",
      items: listings || [],
      // items: listingFakeData,
      name: "Listings",
    },
    {
      group: "Project Listings",
      items: projectListing || [],
      name: "Project Listings",
    },
    {
      group: "Builders",
      items: builders || [],
      name: "Builder",
    },
  ];

  const filteredOptions = data.flatMap((group) => {
    const filteredItems = group.items.filter((item: any) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    if (filteredItems.length === 0) {
      return [];
    }

    return [
      <Combobox.Group key={group.group} label={group.group}>
        {filteredItems.map((item: any, index: number) => {
          if (item.type != "L" || (index < 3 && item.type == "L")) {
            return (
              <Combobox.Option
                value={`${item.name}+${item.id}`}
                key={item.id}
                active={value.includes(`${item.name}+${item.id}`)}
                onClick={() => handlePush(group.group, item)}
              >
                <Group gap="sm">
                  {value.includes(`${item.name}+${item.id}`) ? (
                    <CheckIcon size={12} />
                  ) : null}
                  <span>
                    {item.name} <small>({group.name})</small>
                  </span>
                </Group>
              </Combobox.Option>
            );
          }
        })}
      </Combobox.Group>,
    ];
  });

  useEffect(() => {
    onSearchChange(search);
  }, [search, onSearchChange]);

  return (
    <Combobox store={combobox} withinPortal={false} keepMounted>
      <Combobox.DropdownTarget>
        <PillsInput
          onClick={() => combobox.openDropdown()}
          mb="3%"
          maw={isMobile ? "96%" : "60%"}
        >
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    // handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown
        styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
      >
        <Combobox.Options>
          {isLoading ? (
            <Combobox.Empty>Loading...</Combobox.Empty>
          ) : filteredOptions.length > 0 ? (
            filteredOptions
          ) : (
            <Combobox.Empty>
              {search.length > 0 ? "Nothing found..." : "Search something..."}{" "}
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
