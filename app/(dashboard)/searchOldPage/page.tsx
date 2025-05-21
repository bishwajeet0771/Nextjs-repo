// import { getUserCity } from "@/app/(new_routes_seo)/utils/new-seo-routes/home.api";
import DefaultSearchPage from "./Page/DefaultSearchPage";
// import { headers } from "next/headers";
type Props = { searchParams: {} };
// eslint-disable-next-line no-unused-vars
const SearchingPage = async ({ searchParams }: Props) => {
  // const ip = headers().get("x-forwarded-for") || headers().get("cf-connecting-ip") || "";
  // const data = await getUserCity(undefined,ip);
  const data = {
    city: "Bengaluru",
    cityId: "9",
  };
  return <DefaultSearchPage cityData={data} />;
};

export default SearchingPage;
