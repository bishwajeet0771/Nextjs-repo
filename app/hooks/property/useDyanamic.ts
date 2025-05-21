import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function useDynamicProp({
  cg,
  propId,
}: {
  cg: any;
  propId: number;
}) {
  const { data: Session } = useSession();
  const { slug, bhk_unit_type } = useParams<{
    slug: string;
    bhk_unit_type: string;
  }>();

  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fetch/dynamic-data?propIdEnc=${(slug || bhk_unit_type).split("-")[1]}&category=${cg}&propType=${propId}`
    );
    return res.data;
    // return {
    //   compareCount: 10,
    //   isRequestedCall: "Y",
    //   rating: 3,
    //   shortListed: "Y",
    //   userRating: "Y",
    //   status: true,
    // };
  };
  const { data, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["dynamicproj", slug || bhk_unit_type],
    // staleTime: 30000,
    // refetchOnWindowFocus: false,
    // cacheTime: 30000,
    // refetchIntervalInBackground: false,
    // retry: false,
    enabled: !!Session,
  });
  const queryClient = useQueryClient();
  const updateTodo = async () => {};

  const { mutate } = useMutation({
    mutationFn: updateTodo,
    // When mutate is called:
    onMutate: async (data?: number) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["dynamicproj", slug || bhk_unit_type] });
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["dynamicproj", slug || bhk_unit_type]);
      // Optimistically update to the new value
      queryClient.setQueryData(["dynamicproj", slug || bhk_unit_type], (old: any) => {
        return {
          ...old,
          ...(data === 2
            ? { shortListed: old.shortListed === "Y" ? null : "Y" }
            : { compareAdded: old.compareAdded === "Y" ? null : "Y" }),
        };
      });
      return { previousTodos };
    },

    // Always refetch after error or success:
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const { mutate: updateRatings } = useMutation({
    mutationFn: updateTodo,
    // When mutate is called:
    onMutate: async (data?: { rating?: string; review?: string }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["dynamicproj", slug || bhk_unit_type] });
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["dynamicproj", slug || bhk_unit_type]);
      // Optimistically update to the new value
      queryClient.setQueryData(["dynamicproj", slug || bhk_unit_type], (old: any) => {
        return {
          ...old,
          ...(data?.rating === "Y" ? { userRating: "Y" } : null),
          ...(data?.review === "Y" ? { userReview: "Y" } : null),
        };
      });
      return { previousTodos };
    },

    // Always refetch after error or success:
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { data, isLoading, mutate, updateRatings };
}
