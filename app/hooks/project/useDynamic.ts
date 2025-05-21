import RTK_CONFIG from "@/app/config/rtk";
import axios from "axios";
import { useSession } from "next-auth/react";
// import { Old_Standard_TT } from "next/font/google";
// import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function useDynamicProj(slug: string) {
  const { data: Session } = useSession();
  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/dynamic-data?projIdEnc=${slug}`
    );
    return res.data;
  };
  const { data, isLoading, status } = useQuery({
    queryFn: getData,
    queryKey: ["dynamic", slug],
    enabled: !!Session,
    ...RTK_CONFIG,
  });
  const queryClient = useQueryClient();

  const updateTodo = async () => {};

  const { mutate } = useMutation({
    mutationFn: updateTodo,
    // When mutate is called:
    onMutate: async (data?: number) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["dynamic", slug] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["dynamic", slug]);

      // Optimistically update to the new value
      queryClient.setQueryData(["dynamic", slug], (old: any) => {
        const compareAdded = old.compareAdded === "Y" ? null : "Y";
        const compareCount =
          old.compareAdded === "Y"
            ? old.compareCount - 1
            : old.compareCount + 1;

        return {
          ...old,
          ...(data === 2
            ? { shortListed: old.shortListed === "Y" ? null : "Y" }
            : { compareAdded, compareCount }),
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
      await queryClient.cancelQueries({ queryKey: ["dynamic", slug] });
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["dynamic", slug]);
      // Optimistically update to the new value
      queryClient.setQueryData(["dynamic", slug], (old: any) => {
        return {
          ...old,

          ...(data?.rating ? { userRating: "Y", rating: data.rating } : null),
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

  return { data, isLoading, mutate, updateRatings, status, getData };
}
