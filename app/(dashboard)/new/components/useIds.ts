"use client";
import { useSession } from "next-auth/react";
// import React from "react";
import { useQuery } from "react-query";

export default function useIds() {
  const { data: session } = useSession();
  const getData = async () => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/shortlist/ids`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["project_home"],
    queryFn: () =>
      process.env.NODE_ENV === "development" ? devData : getData(),
    enabled: !!session,
  });
  return { ids: data, isLoading };
}

const devData = {
  total: 25,
  projIds: [
    "c09d9c2b1b65cf606aa964f0c52def41",
    "fc3305f40835444b4325bca4898e35b1",
    "dc766148701f46debedb4f9cf3a18809",
    "f3975f42681cf5150ba9bc0d8c6c8fab",
    "948f3351cd3aa795a34527da91f138d0",
    "b2f36cee9b75a4c648d80ee0f7145772",
    "77bd16763f81f3f5a8f47e6b5e81262a",
    "26f4c6a78ba0dca60edecf83a3b23f44",
    "4a7ac73abd0251c54924ecd80da69b07",
    "c3e54bf41b7efff10108f6437caf0fa5",
    "a4752624f7f0b060a967f226edf3d1e9",
    "f26130ce9eba818a36f38a544e5459e4",
    "096cdab513c37e73eae9d39ccf197e8d",
    "675e016b8809c81e516e20354d2bc10d",
    "c673eaff6e67cbad774268598d830b29",
    "a6883a526e86623998d250bd14fb0707",
    "2d987bf535498df6d1e8d0208f4740b5",
    "5b970700acfde5ad3ba2f485f68ec6ca",
    "f965c5adb73e009a13737919e951a96f",
  ],
  propIds: [
    "fc3305f40835444b4325bca4898e35b1",
    "68da26ae16f44473a3e7710febcf6f03",
    "dc766148701f46debedb4f9cf3a18809",
    "26f4c6a78ba0dca60edecf83a3b23f44",
    "8b0c767c8e79320152b11ae1498b7dbf",
    "d3fa28728b55c4c455076ed50e1bad9c",
  ],
};
