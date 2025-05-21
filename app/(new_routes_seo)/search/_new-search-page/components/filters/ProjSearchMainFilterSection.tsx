import React, { memo } from "react";
import ProjectFilters from "./ProjectHeaderFilter";

type Props = {
  isListing?: boolean;
  frontendFilters: Record<string, any>;
};

function ProjSearchMainFilterSection({ isListing, frontendFilters }: Props) {
  return (
    <div className="flex flex-row items-start gap-2">
      <ProjectFilters isListing={isListing} frontendFilters={frontendFilters} />
    </div>
  );
}

export default memo(ProjSearchMainFilterSection);
