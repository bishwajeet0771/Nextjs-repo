import MapSkeleton from "@/app/components/maps/Skeleton";
import dynamic from "next/dynamic";
import React, { useCallback, useMemo, useState } from "react";
import Tabs from "./NearByTabs";
type Props = {
  data?: any;
};

export default function ProjectContent({ data }: Props) {
  const Map = useMemo(
    () =>
      dynamic(
        () => import("@/app/(dashboard)/searchOldPage/listing/components/map"),
        {
          loading: () => <MapSkeleton />,
          ssr: false,
        }
      ),
    []
  );
  const categories = useMemo(() => Object.keys(data), [data]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const onTabClick = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <>
      {categories.length > 0 && (
        <Tabs
          onTabClick={onTabClick}
          selectedCategory={selectedCategory}
          categories={categories}
        />
      )}

      <Map
        key="leafletProContent2SearchPageMap"
        data={data[selectedCategory]}
      />
    </>
  );
}
