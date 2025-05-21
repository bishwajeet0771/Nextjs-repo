import RTK_CONFIG from "@/app/config/rtk";
import { searachFilterAtom } from "@/app/store/search";
import { serverCityAtom } from "@/app/store/search/serverCity";
import { useDebouncedValue } from "@mantine/hooks";
import { atom, useAtom, useAtomValue } from "jotai";
import { useQuery } from "react-query";
const searchAtom = atom<string | null>(null);
export default function useNewsearch() {
  const [name, setName] = useAtom(searchAtom);
  const [debounced] = useDebouncedValue(name, 700);
  const allFilters = useAtomValue(searachFilterAtom);
  const servercityData = useAtomValue(serverCityAtom);
  /**
   * Fetches data from the matcher API given the debounced search query
   * and the currently selected cityId.
   *
   * @returns {Promise<any>} The JSON response from the API.
   */
  const getData = async () => {
    let url = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/matcher?word=${debounced}&cityId=${allFilters.city ? allFilters.city.split("+")[1] : servercityData?.split("+")[1]}`;
    const res = await fetch(url); 
    const responseData = await res.json();
    return responseData;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["search" + debounced + allFilters.city],
    queryFn: () => getData(),
    enabled: !!debounced && (allFilters.city !== null || servercityData !== null),
    ...RTK_CONFIG,
  });

  const nData = {
    ...data,
    localities: data?.loc ?? [],
  };
  // console.log(nData);
  const onSearchChange = (value: string) => {
    !value ? setName(null) : setName(value);
  };
  const handleResetQuery = () => {
    setName(null);
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
