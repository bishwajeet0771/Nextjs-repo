import { useQuery } from "react-query";
import RTK_CONFIG from "../config/rtk";

export default function useRatings(id: string) {
  const getProjRatings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post-project/get-proj-review-data?projIdEnc=${id}&identifier=PD&page=0`
      );
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: [`rating/${id}`],
    queryFn: getProjRatings,
    ...RTK_CONFIG,
  });
  return { data, isLoading };
}
