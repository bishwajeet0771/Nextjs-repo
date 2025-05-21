import { useQuery } from "react-query";
import { getBuilderDetails } from "../utils/api/builder";
import { usePathname } from "next/navigation";
type Props = {
  id: number | string;
  y: string;
  type?: "prop" | "proj";
};
export default function useBuilder({ id, y, type = "proj" }: Props) {
  const path = usePathname();
  const { data, isLoading } = useQuery({
    queryKey: [`builder/${id}&isBuilderPage=${y}` + type],
    queryFn: () => getBuilderDetails(id, y, type),
    staleTime: 30000,
    refetchOnWindowFocus: false,
    cacheTime: 30000,
    refetchIntervalInBackground: false,
    retry: false,
    enabled: path !== "/search",
  });
  return { data, isLoading };
}
