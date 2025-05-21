import { useQuery } from "react-query";

export default function useSearch({
  type,
  query,
}: {
  type: "full" | "builder" | "locality";
  query: string;
}) {
  const getData = async () => {
    if (query === "") {
      return [];
    }

    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/matcher?word=${query}`;
    if (type === "locality") {
      url += `&isLocality=Y`;
    } else if (type === "builder") {
      url += `&isBuilder=Y`;
    }

    const res = await fetch(url);
    const responseData = await res.json();

    let transformedData = [];
    if (type === "locality" || type === "full") {
      transformedData = responseData.loc.map((location: any) => ({
        label: location.name,
        value: String(location.id),
      }));
    }
    return transformedData;
  };

  const { isLoading, data } = useQuery({
    queryFn: getData,
    queryKey: ["search" + type + query],
    enabled: query !== "",
  });

  return { isLoading, data };
}
