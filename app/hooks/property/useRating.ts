import { useQuery } from "react-query";

export default function usePropRatings({ slug }: { slug: string }) {
  const getProjRatings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/get-proj-review-data?projIdEnc=${slug}&identifier=PD&page=0`
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: [`rating/${slug}`],
    queryFn: getProjRatings,
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
    enabled: !!slug,
  });
  return { data, isLoading };
}
