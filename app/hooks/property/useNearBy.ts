import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "next/navigation";
import { BACKEND_BASE_URL } from "@/app/env";
import RTK_CONFIG from "@/app/config/rtk";

export default function useNearby({
  lat,
  lng,
  projId,
  cg,
  bhkId,
  propType,
}: {
  lat: string;
  lng: string;
  projId?: string;
  cg: string;
  bhkId: number;
  propType: number;
}) {
  const { slugs } = useParams<{
    slugs: string[];
  }>();
  let slug = slugs.at(-1);
  const queryClient = useQueryClient();
  const getData = async () => {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/v1/fetch/nearbyProperties?lat=${lat}&lng=${lng}&bhkId=${bhkId}&propType=${propType}&cg=${cg.toLowerCase()}&propIdEnc=${
        slug?.split("-")[1]
      }${projId ? `&projIdEnc=${projId}` : ""}  `
    );
    return res.data;
  };
  const { isLoading, data } = useQuery({
    queryKey: [`nearbyListing` + slug?.split("-")[1] + cg],
    queryFn: getData,
    ...RTK_CONFIG,
  });
  const updateTodo = async () => {};

  const { mutate } = useMutation({
    mutationFn: updateTodo,
    // When mutate is called:
    onMutate: async ({ id, type }: { id: string; type: "other" | "proj" }) => {
      await queryClient.cancelQueries({
        queryKey: [`nearbyListing` + slug?.split("-")[1] + cg],
      });
      const whichDataUpdate = type === "proj" ? "projListing" : "otherListing";
      const previousData: any = queryClient.getQueryData([
        `nearbyListing` + slug?.split("-")[1] + cg,
      ]);
      const updatedData = previousData[whichDataUpdate].map((property: any) => {
        if (property.propIdEnc === id) {
          property.shortListed = property.shortListed === "Y" ? "N" : "Y";
        }
        return property;
      });
      queryClient.setQueryData([`nearbyListing` + slug?.split("-")[1] + cg], {
        ...previousData,
        [whichDataUpdate]: updatedData,
      });
      return { previousData };
    },

    onSettled: () => {},
  });
  return { isLoading, data, mutate };
}
