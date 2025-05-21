import { options } from "@/app/options";
import { getServerSession } from "next-auth";

export const getData = async (city?: number | string, coordinates?: any) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/project`;
  if (coordinates) {
    url = `${url}?lt=${coordinates.lt}&la=${coordinates.la}`;
  } else if (city) {
    url = `${url}?city=${city}`;
  }
  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });
  const data = await res.json();
  return data;
};

export const getHomeListingData = async (
  city?: number | string,
  coordinates?: any
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/home/page/listing`;
  if (coordinates) {
    url = `${url}?lat=${coordinates.lt}&lng=${coordinates.la}`;
  } else if (city) {
    url = `${url}?city=${city}`;
  }
  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });
  const data = await res.json();
  return data;
};

export const getShortIds = async () => {
  const session = await getServerSession(options);
  if (session) {
    try {
      if (process.env.NODE_ENV === "development") {
        return {
          total: 8,
          projIds: [
            "9ea8cf3c5e833a71663f440d450f942f",
            "9891b38e10299b88cef791a58bc03af8",
            "4e4920af760dd82499ef7f855cbba69f",
          ],
          propIds: [
            "68da26ae16f44473a3e7710febcf6f03",
            "493516e7f29fa40dbe483c79fd3591b6",
            "881a9dfc336469ae1bc8f2f6d5af1266",
            "f38e3fde9948b9dfa85a578c80dd663b",
            "2d320b68173ffd4516aad7b2d95001d7",
          ],
        };
      } else {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/shortlist/ids`;
        let data = await fetch(url, {
          headers: {
            // @ts-ignore
            Authorization: `${session?.user?.token as any}`,
          },
        });

        return await data.json();
      }
    } catch (error: any) {
      return {
        total: 0,
        propIds: [],
        projIds: [],
      };
    }
  }
};
