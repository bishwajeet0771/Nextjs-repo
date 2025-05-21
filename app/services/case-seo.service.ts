import { notFound } from "next/navigation";
import { getNewProjSearchData } from "../(new_routes_seo)/in/utils/api";
import { extractCaseSeoParams } from "../[slug]/_utils/findParams";

interface SlugValues {
  CG?: string;
  C?: string;
  P?: string;
  B?: string;
  L?: string;
  count?: number;
  PJ: string;
}

interface SearchParams {
  sf?: boolean;
}

interface FrontEndFilter {
  propType?: number;
  cg?: string;
  city?: string;
  bhk?: number[];
  localities?: string[];
  listedBy: string | null;
}

interface SeoSearchResult {
  error?: string;
  severData?: any;
  frontEndFilter?: FrontEndFilter;
}

const createUrl = (slugValues: SlugValues): string => {
  let url = `${slugValues.CG ? `&cg=${slugValues.CG}` : ""}${
    slugValues.C ? `&city=${slugValues.C}` : ""
  }&${slugValues.P ? `propType=${slugValues.P}` : ""}&${
    slugValues.B ? `bhk=${slugValues.B}` : ""
  }&${slugValues.L ? `localities=${slugValues.L}` : ""}${
    slugValues.PJ ? `&projIdEnc=${slugValues.PJ}` : ""
  }`;
  return url;
};

const CaseSeoSearchService = async (
  slug: string,
  searchParams: SearchParams
): Promise<SeoSearchResult> => {
  if (!slug.includes("-")) return notFound();
  const slugValues = extractCaseSeoParams(slug);
  let severData;
  if (!slugValues.count) {
    return notFound();
  }
  if (!searchParams.sf) {
    const url = createUrl(slugValues);
    severData = await getNewProjSearchData(url);
  }
  let city = `Bengaluru`;
  const frontEndFilter: FrontEndFilter = {
    listedBy: null,
    ...(slugValues.P ? { propType: parseInt(slugValues.P) } : {}),
    ...(slugValues.CG ? { cg: slugValues.CG } : {}),
    ...(slugValues.C ? { city: `${city}+${slugValues.C}` } : {}),
    ...(slugValues.B ? { bhk: [parseInt(slugValues.B)] } : {}),
    ...(slugValues.L
      ? {
          localities: [`${slugValues.localityName}+${slugValues.L}`],
        }
      : {}),

    ...(slugValues.PJ
      ? {
          projIdEnc: slugValues.PJ,
          projName: slug.split("in")[0].split("-").join(" "),
        }
      : {}),
  };

  return { severData, frontEndFilter };
};

export default CaseSeoSearchService;
