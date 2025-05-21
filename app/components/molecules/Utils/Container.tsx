import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1920px]  p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 my-[130px] px-[160px] mx-auto">
      {children}
    </div>
  );
}
