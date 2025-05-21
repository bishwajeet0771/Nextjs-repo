// const builderSlugsMap = new Map<string, string>([
//   ["B", "bhk"], //unitTypes
//   ["L", "localities"], //localities
//   ["CG", "cg"], //cg
//   ["C", "city"], //NOT INCLUDE
//   ["P", "propType"], //propTypes
// ]);

// const FrontEndFilters = new Map<string, string>([
//   ["B", "unitTypes"],
//   ["L", "localities"],
//   ["CG", "cg"],
//   ["P", "propTypes"],
// ]);

// type QueryParams = {
//   [key: string]: string | undefined;
// };
// function mapFiltersToFrontEnd(filters: string[]) {
//   const queryParams: { [key: string]: any } = {};

//   filters.forEach((filter) => {
//     const match = filter.match(/(\d+)?%?(\w+)/); // Regex to capture numbers and letters
//     if (match) {
//       const [, value, key] = match;
//       const mappedKey = FrontEndFilters.get(key);

//       if (mappedKey) {
//         if (mappedKey === "unitTypes" || mappedKey === "localities") {
//           // Initialize as array if not already
//           if (!queryParams[mappedKey]) {
//             queryParams[mappedKey] = [];
//           }
//           // Push the value into the array
//           queryParams[mappedKey].push(
//             mappedKey === "localities" ? `value` : Number(value)
//           );
//         } else {
//           // Assign the value directly for single value keys
//           queryParams[mappedKey] =
//             mappedKey === "propTypes" ? Number(value) : value;
//         }
//       }
//     }
//   });

//   return queryParams;
// }
// Function to parse filters into query parameters
// const parseFilters = (filters: string[]): QueryParams => {
//   const queryParams: QueryParams = {};

//   filters.forEach((filter) => {
//     const match = filter.match(/(\d+)?%?(\w+)/); // Regex to capture numbers and letters
//     if (match) {
//       const [, percentage, key] = match;
//       const mappedKey = builderSlugsMap.get(key);

//       if (mappedKey) {
//         queryParams[mappedKey] = percentage || key; // Use the percentage if available, otherwise use the key
//       }
//     }
//   });

//   return queryParams;
// };

// Function to get search data from the API
export const getSearchData = async (filters?: string): Promise<any> => {
  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=0&city=9`;
    if (filters && filters.includes("page=")) {
      baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?city=9`;
    } else {
      baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=0&city=9`;
    }

    const url = `${baseUrl}${filters ? `&${filters}` : ""}`;
    console.log(url);
    // console.log(url);
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getProjSearchData = async (filters: string): Promise<any> => {
  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=0&city=9`;
    if (filters && filters.includes("page=")) {
      baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?city=9`;
    } else {
      baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=0&city=9`;
    }
    const url = `${baseUrl}${filters ? `&${filters}` : ""}`;
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getNewProjSearchData = async (filters: string): Promise<any> => {
  try {
    let baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=0`;
    if (filters && filters.includes("page=")) {
      baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search`;
    } else {
      baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=0`;
    }
    const url = `${baseUrl}${filters ? `${filters}` : ""}`;
    console.log(url);
    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};
