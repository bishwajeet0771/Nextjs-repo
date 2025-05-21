import { usePathname, useSearchParams } from "next/navigation";
import { pathConfig, PathType } from "./config";
// import { encryptData } from "@/app/utils/auth/nodeCrypto";

type PathConfigKey = keyof typeof pathConfig;
interface SearchParams {
  projId?: string;
  propId?: string;
  builderId?: string;
  [key: string]: string | undefined;
}

// Renamed internal functions to follow React Hook naming conventions
function useGetPathTypeFromQueryParams(): string {
  const searchParams = useSearchParams();
  const path = decrypt(searchParams.get("cc") || "");

  const config = [
    {
      path: "/search",
      title: "Project Search",
      exact: true,
    },
    {
      path: "/search/listing",
      title: "Listing Search",
      exact: true,
    },
    {
      path: "/builders",
      title: "Builder Details",
      exact: false,
    },
    {
      path: "/residential/projects",
      title: "Project Details",
      exact: false,
    },
    {
      path: "/residential/listings",
      title: "Listing Details",
      exact: false,
    },
    {
      path: "/residential-listings",
      title: "Listing Details",
      exact: false,
    },
  ];

  // Find the matching config based on the `path` and `exact` flag
  const match = config.find((item) =>
    item.exact ? item.path === path : path.startsWith(item.path)
  );

  // Return the title of the matching config, or a default value
  return match ? match.title : pathConfig.default.pageTitle;
}

function useGetCallPath(): { url: string; action: string } {
  const searchParams = useSearchParams();

  return {
    url: decrypt(searchParams.get("cc") || ""),
    action: decrypt(searchParams.get("ca") || ""),
  };
}

function useGetQueryParamClient(): { query: string; redirectPath: string } {
  const searchParams = useSearchParams();
  return {
    query: `?cc=${searchParams.get("cc") || ""}`,
    redirectPath: decrypt(searchParams.get("cc") || ""),
  };
  // for (const key in pathConfig) {
  //   const id = searchParams.get(pathConfig[key as PathConfigKey].paramName);
  //   if (id) {
  //     return {
  //       query: `?${pathConfig[key as PathConfigKey].paramName}=${id}`,
  //       redirectPath: `${
  //         pathConfig[key as PathConfigKey].redirectingPath
  //       }${id}`,
  //     };
  //   }
  // }
  // return { query: "", redirectPath: pathConfig.default.redirectingPath };
}

// Server-side functions remain unchanged
export function getQueryParamForPath(path: string): string | null {
  for (const key in pathConfig) {
    const { pathPrefix, paramName } = pathConfig[key as PathConfigKey];
    if (path === pathPrefix && path.startsWith(pathPrefix)) {
      const segments = path.split("/");
      const id = segments[segments.length - 1];
      if (id && id !== pathPrefix) {
        return `?${paramName}=${id}`;
      }
      return null;
    }
  }
  return null;
}

export function getPathTypeFromQueryParamsWitParam(
  searchParams: URLSearchParams
): PathType {
  for (const key in pathConfig) {
    if (searchParams.get(pathConfig[key as PathConfigKey].paramName)) {
      return pathConfig[key as PathConfigKey].pageType;
    }
  }
  return PathType.Default;
}

export function getQueryParam(searchParams: SearchParams): string {
  if (searchParams.cc) {
    let query = `?cc=${searchParams.cc}`;
    if (searchParams.ca) {
      query += `&ca=${searchParams.ca}`;
    }
    return query;
  }
  return "";
}

export function getCallPathServer(param: SearchParams): string {
  for (const key in pathConfig) {
    const id =
      param[pathConfig[key as PathConfigKey].paramName as keyof SearchParams];
    if (id) {
      return `${pathConfig[key as PathConfigKey].redirectingPath}${id}`;
    }
  }
  return pathConfig.default.redirectingPath;
}

// Rename the export to maintain the original function names
export {
  useGetPathTypeFromQueryParams as getPathTypeFromQueryParams,
  useGetCallPath as getCallPath,
  useGetQueryParamClient as getQueryParamClient,
  encrypt as encryptUrl,
  decrypt as decryptUrl,
};

export default function usePathToOrigin(data?: {
  hash?: string;
  link?: string;
}) {
  const path = usePathname();
  let redirectQueryParam = "cc=" + encrypt(path + (data?.hash || ""));
  if (data?.link) {
    redirectQueryParam += `&ca=${encrypt(data?.link)}`;
  }
  return {
    redirectPath: path,
    redirectQueryParam,
  };
}

// import { useRouter } from 'next/router';

// A simple encrypt function (you may use a more secure one)
const encrypt = (text: string): string => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  return btoa(
    Array.from(new Uint8Array(data))
      .map((byte) => String.fromCharCode(byte))
      .join("")
  );
};

// A simple decrypt function
const decrypt = (encryptedText: string): string => {
  const decoded = atob(encryptedText);
  const data = new Uint8Array(
    decoded.split("").map((char) => char.charCodeAt(0))
  );
  const decoder = new TextDecoder();
  return decoder.decode(data);
};

// export function useGlobalRedirectLogic() {
//   const router = useRouter();

//   // Function to generate the hashed URL with encrypted query params
//   const getHashedUrl = (destination: string, callbackUrl: string): string => {
//     // Encrypt the callback URL
//     const encryptedCallback = encrypt(callbackUrl);

//     // Generate the new URL with encrypted callback as a query parameter
//     const newUrl = `${destination}?cc=${encryptedCallback}`;

//     // Return the hashed URL
//     return newUrl;
//   };

//   // Function to handle decryption and redirection from the query parameter
//   const handleDecryptionRedirect = (): void => {
//     // Check if the URL contains a query parameter for the encrypted callback
//     const urlParams = new URLSearchParams(window.location.search);
//     const encryptedCallback = urlParams.get('cc');

//     if (encryptedCallback) {
//       // Decrypt the callback URL
//       const decryptedCallback = decrypt(encryptedCallback);
//       console.log('Redirecting to:', decryptedCallback);

//       // Redirect user to the original destination
//       router.push(decryptedCallback);
//     } else {
//       console.log('No encrypted callback URL found');
//     }
//   };

//   return {
//     getHashedUrl,
//     handleDecryptionRedirect
//   };
// }
