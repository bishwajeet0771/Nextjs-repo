import { useState, useEffect } from "react";
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import useQsearch from "@/app/hooks/search/useQsearch";
import useSearchFilters from "@/app/hooks/search";
import toast from "react-hot-toast";
// import fakeData from "@/app/data/listing";
import { projectprops } from "@/app/data/projectDetails";

// For Listings

// eslint-disable-next-line no-unused-vars
export function MainSearchMultiSelect({ type }: { type: string }) {
  const {
    data: searchData,
    isLoading,
    handleResetQuery,
    onSearchChange,
    // debounced,
    // name,
  } = useQsearch();
  // const path = usePathname();
  const { filters, setFilters, remnoveSearchOptions } = useSearchFilters();
  //
  // setFIlter({...filters,key:value})
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

  let selectedPropId = `${
    filters.propTypes != projectprops.plot ? `${filters.unitTypes[0]}_` : ""
  }${filters.propTypes}_${filters.cg}_${filters.locality}_p*${
    filters.projIdEnc
  }`;

  const handlePush = async (type: string, data: any) => {
    switch (type) {
      case "Locality":
        handleAddSearch(`${data.name}+${data.id}`);

        break;
      case "Projects":
        window.open(`/abc/delhi/palika/${data.id}`);
        break;
      case "Listings":
        {
          let [ut, pt, cg, lt] = data.id.split("_");

          if (ut != projectprops.plot) {
            // Not Equal to Plot
            [ut, pt, cg, lt] = data.id.split("_");
          } else {
            // Equal to Plot
            [pt, cg, lt] = data.id.split("_");
          }

          if (data.id.includes("_P")) {
            let projId = data.id.split("*")[1];

            let splitProjName = data.name.split(" in ")[1].toLowerCase();
            let projName = splitProjName.split("-")[0].replace(" ", "-");
            let localityName = splitProjName.split("-")[1].replace(" ", "-");

            setFilters((prevFilters) => ({
              ...prevFilters,
              projIdEnc: projId,
              projName: projName,
              cg: cg,
              unitTypes: [parseInt(ut)],
              locality: [localityName],
              propTypes: parseInt(pt),
            }));
          } else {
            const url =
              `propType=${pt}-bhk=${ut}-cgs=${cg}-localities=${data.name}` +
              "%2B" +
              encodeURIComponent(lt);
            window.open("/search?sf=" + url);
          }
        }
        break;
      case "Project Listings":
        {
          let projectName = data.name.split("(")[0].trim();
          let projName = projectName.split(" in ")[1].toLowerCase();
          let replaceSpaces = projName.replace(" ", "-");

          setFilters((prevFilters) => ({
            ...prevFilters,
            projIdEnc: data.id,
            projName: replaceSpaces,
            listedBy: data.type.split("")[0],
          }));

          // const url = `projIdEnc=${data.id}&listedBy=${data.type.split("")[0]}&projName=${replaceSpaces}`
          // window.open("/search/listing?" + url);
        }
        break;
      case "Builders":
        {
          let builderName = data.name.toLowerCase().split(" ").join("%2D");
          let builderCity = data.builderCity
            .toLowerCase()
            .split(" ")
            .join("%2D");
          let urlBuilder = `${process.env.NEXT_PUBLIC_BACKEND_URL}/builders/${builderCity}/${builderName}`;
          window.open(urlBuilder);

          // setFilters((prevFilters) => ({
          //   ...prevFilters,
          //   builderIds: [...prevFilters.builderIds, `${data.name}+${data.id}`],
          // }));
          handleResetQuery();
        }
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
                  <span
                    className={
                      selectedPropId == item.id ? "text-blue" : "text-black"
                    }
                  >
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
        <PillsInput onClick={() => combobox.openDropdown()} mb="3%" maw="60%">
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
