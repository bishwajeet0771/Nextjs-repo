export const getCitiesBuilder = async ({
  page = 0,
  sort = 1,
  city,
  query,
}: {
  page?: number;
  sort?: number;
  city?: string;
  query?: string;
}) => {
  try {
    const url = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/user/v1/get-active-builder-list?page=${page}&sort=${sort}${
      query?.trim() ? `&searchName=${query}` : ""
    }${city ? `&city=${city}` : ""}`;
    // console.log(url);
    const response = await fetch(url, {
      cache: "no-cache",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to allow the caller to handle it
  }
};
export const getAllCititesForBuilders = async () => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/get-active-builder-city-list`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
