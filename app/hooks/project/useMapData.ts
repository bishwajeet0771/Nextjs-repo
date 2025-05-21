import { getNearByLocations } from "@/app/utils/api/project";
import { useParams } from "next/navigation";
// import { unstable_useCacheRefresh } from "react";
import { useQuery } from "react-query";

export default function useMapData({ projSlug }: { projSlug?: string }) {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: [`maplocation`, slug],
    queryFn: () => getNearByLocations(projSlug || slug),
    cacheTime: 300000,
    staleTime: 30000,
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    isError,
  };
}
