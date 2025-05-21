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

const getNearByLocations = async (slug: string): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fetch/get-nearby?propIdEnc=${slug}`
  );
  const data = await response.json();
  return data;
};
