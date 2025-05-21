import axios from "axios";
import { useQuery } from "react-query";
import { Main } from "../types/home";

let cachedProjectCount: number; // Cache the projectCount from the first page

export default function useCarouselData(page: number = 1) {
  const getCarouselData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/new-launch-project?page=${page}`
    );
    return res.data as Main;
  };

  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: [`test/${page}`],
    queryFn: getCarouselData,
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
  });

  // Use the cached projectCount when page is not 1 and the data is from the cache
  const pageCount =
    page === 1 && !isPreviousData ? data?.projectCount : cachedProjectCount;

  // Cache the projectCount from the first page
  if (page === 1 && !isPreviousData && data) {
    cachedProjectCount = data.projectCount;
  }

  return { data, isLoading, pageCount };
}
