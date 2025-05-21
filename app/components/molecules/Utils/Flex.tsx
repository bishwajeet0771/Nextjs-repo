import React from "react";

export default function Flex({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center flex-wrap flex-grow">
      {children}
    </div>
  );
}
