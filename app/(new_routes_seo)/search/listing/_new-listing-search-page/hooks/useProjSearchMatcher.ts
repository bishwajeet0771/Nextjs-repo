import RTK_CONFIG from "@/app/config/rtk";
// import { searachFilterAtom } from "@/app/store/search";
// import { serverCityAtom } from "@/app/store/search/serverCity";
import { useDebouncedValue } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useQuery } from "react-query";
import { projSearchStore } from "../../../store/newListingStore";
export default function useProjSearchMatcher() {
  const [name, setName] = useState("");
  const [debounced] = useDebouncedValue(name, 700);
  const state = useAtomValue(projSearchStore);
  const getData = async () => {
    let url = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/matcher?word=${debounced}&cityId=${state.city?.split("+")[1] ?? 9}`;
    const res = await fetch(url);
    const responseData = await res.json();
    return responseData;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["search" + debounced + state.city],
    queryFn: () => getData(),
    enabled: !!debounced,
    ...RTK_CONFIG,
  });

  const nData = {
    ...data,
    localities: data?.loc ?? [],
  };
  // console.log(nData);
  const onSearchChange = (value: string) => {
    !value ? setName("") : setName(value);
  };
  const handleResetQuery = () => {
    setName("");
    onSearchChange("");
  };
  return {
    data: nData,
    isLoading,
    onSearchChange,
    debounced,
    name,
    handleResetQuery,
  };
}
