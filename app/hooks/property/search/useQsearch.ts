import { useDebouncedValue } from "@mantine/hooks";
import { useQueryState } from "nuqs";
// import React from "react";
import { useQuery } from "react-query";

export default function useQsearch() {
  const [name, setName] = useQueryState("q");
  const [debounced] = useDebouncedValue(name, 500);
  const getData = async () => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/matcher?word=${debounced}`;

    const res = await fetch(url);
    const responseData = await res.json();

    return responseData;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["search" + debounced],
    queryFn: () => getData(),
    enabled: !!debounced,
  });
  const onSearchChange = (value: string) => {
    !value ? setName(null) : setName(value);
  };
  const handleResetQuery = () => {
    setName(null);
    onSearchChange("");
  };
  return { data, isLoading, onSearchChange, debounced, name, handleResetQuery };
}
