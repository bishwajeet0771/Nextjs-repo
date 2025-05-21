import axios from "axios";
import { useQuery } from "react-query";

export default function useAmenities() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["amenities"],
    queryFn: getAmenties,
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
  });
  return { data, isLoading, error };
}
export const getAmenties = async () => {
  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/all-proj-Amenities`
  );
  return data.data;
};
