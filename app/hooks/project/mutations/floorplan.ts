// import { getNearByLocations } from "@/app/utils/api/project";
import axios from "axios";
// import { useParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";

export default function useBhkType({ initialData, bhkType }: any) {
  const updateData = async (input: any, bhkType: string) => {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/floorplan`,
      { initialData, bhkType: bhkType }
    );
    return data.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: [`floorplan` + bhkType],
    cacheTime: 300000,
    staleTime: 30000,
    keepPreviousData: true,
    initialData: initialData,
  });

  const { mutate } = useMutation({
    mutationFn: ({ input, bhkType }: any) => updateData(input, bhkType),

    onSettled: (data, error, va) => {
      console.log(va);
    },
  });
  return {
    data,
    isLoading,
    isError,
    mutate,
  };
}
