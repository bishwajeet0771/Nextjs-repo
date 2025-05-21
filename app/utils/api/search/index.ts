export const getData = async (
  query: string | null,
  type: string,
  city: string
) => {
  if (query === "") {
    return [];
  }

  let url = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/matcher?word=${query}&cityId=${city?.split("+")[1]}`;
  if (type === "loc") {
    url += `&isLocality=Y`;
  } else if (type === "builders") {
    url += `&isBuilder=Y`;
  }

  const res = await fetch(url);
  const responseData = await res.json();

  let transformedData = [];
  if (type === "loc" || type === "builders") {
    transformedData = responseData[type].map((location: any) => ({
      label: location.name,
      value: `${location.stringUrl ? "" : `${location.name}+`}${
        location.stringUrl ? location.stringUrl : location.stringId
      }`,
    }));
  }

  return transformedData;
};
export const getSearchBuilder = async (query: string) => {
  if (query === "") {
    return [];
  }

  let url = `${process.env.NEXT_PUBLIC_PROJECT_URL}/matcher?word=${query}&isBuilder=Y`;

  const res = await fetch(url);
  const responseData = await res.json();

  let transformedData = [];
  transformedData = responseData.builders.map((location: any) => ({
    label: location.name,
    value: String(location.id),
  }));

  return transformedData;
};
