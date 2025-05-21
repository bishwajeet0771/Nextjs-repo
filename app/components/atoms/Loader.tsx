// import { Loader } from "@mantine/core";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full">
      {/* <Loader /> */}
      <div className="min-w-[30px] min-h-[30px] border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
