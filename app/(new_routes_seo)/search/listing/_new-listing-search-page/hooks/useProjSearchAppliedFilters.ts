import { useSetAtom } from "jotai";
import { ProjSearchAppliedFiltersStore } from "../../../store/newListingStore";
import { useQueryState } from "nuqs";
// import parseProjectSearchQueryParams from "../utils/parse-project-searchqueryParams";

// type Props = {};

export default function useProjSearchAppliedFilters() {
  const setAppliedFilters = useSetAtom(ProjSearchAppliedFiltersStore);
  const [, setName] = useQueryState("sf");
  const handleApplyFilters = (callback?: () => void) => {
    setAppliedFilters(setName, "add");
    callback?.();
  };
  const handleClearFilters = (
    type: "clearAll" | "bhk" | "area" | "budget" | "unitType" | "listing"
  ) => {
    switch (type) {
      case "clearAll":
        setAppliedFilters(setName, "clear", type);
        break;
      case "bhk":
        setAppliedFilters(setName, "clear", type);
        break;
      case "unitType":
        setAppliedFilters(setName, "clear", type);
        break;
      case "budget":
        setAppliedFilters(setName, "clear", type);
        break;
      case "listing":
        setAppliedFilters(setName, "clear", type);
        break;
    }
  };
  return { handleApplyFilters, handleClearFilters };
}
