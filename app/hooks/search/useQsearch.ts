import RTK_CONFIG from "@/app/config/rtk";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useDebouncedValue } from "@mantine/hooks";
import { atom, useAtom, useAtomValue } from "jotai";
import { useQuery } from "react-query";
const searchAtom = atom<string | null>(null);
export default function useQsearch() {
  const [name, setName] = useAtom(searchAtom);
  const [debounced] = useDebouncedValue(name, 700);
  const { city } = useAtomValue(homeSearchFiltersAtom);
  /**
   * Fetches data from the matcher API given the debounced search query
   * and the currently selected cityId.
   *
   * @returns {Promise<any>} The JSON response from the API.
   */
  const getData = async () => {
    let url = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/matcher?word=${debounced}&cityId=${city?.split("+")[1]}`;
    const res = await fetch(url);
    const responseData = await res.json();
    return responseData;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["search" + debounced + city],
    queryFn: () => getData(),
    enabled: !!debounced && city !== null,
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
