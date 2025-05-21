import { useMutation, useQueryClient } from "react-query";

// type Props = {
//   initialValue?: {
//     total: number;
//     propIds: string[];
//     projIds: string[];
//   };
// };

export default function useOptimisticShortlistCompare() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (type: "add" | "remove") => {
      return type;
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["shortListed-compare-count"]);

      const previousData = queryClient.getQueryData([
        "shortListed-compare-count",
      ]);

      queryClient.setQueryData(["shortListed-compare-count"], (old: any) => {
        const updated = { ...old };

        if (newData === "add") {
          updated.total += 1;
        }

        if (newData === "remove") {
          updated.total -= 1;
        }

        return updated;
      });

      return { previousData };
    },
    onError: (err, newData, context: any) => {
      queryClient.setQueryData(
        ["shortListed-compare-count"],
        context.previousData
      );
    },
    onSettled: () => {
      //   queryClient.invalidateQueries(["shortListed-compare-count"]);
    },
  });
}
