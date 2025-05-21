import { SEARCH_FILTER_DATA } from "@/app/data/search";
import useSearchFilters from "@/app/hooks/search";
import { Radio } from "@mantine/core";
import React from "react";

type Props = {};

export default function FurnishOptions({}: Props) {
  const { filters, setSingleType } = useSearchFilters();
  return (
    <div>
      {" "}
      <h3
        className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
        id="Furnishing"
      >
        Furnishing
      </h3>
      <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
        {SEARCH_FILTER_DATA.furnish.map(({ constDesc, cid }) => {
          return (
            <div key={constDesc + cid}>
              <Radio
                iconColor="dark.8"
                color="green"
                label={constDesc}
                value={cid}
                name="ListedBy"
                style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                onClick={() => setSingleType("furnish", cid)}
                checked={filters.furnish == cid}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
