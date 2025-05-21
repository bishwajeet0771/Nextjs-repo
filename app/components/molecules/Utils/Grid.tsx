import React from "react";

export default function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-8 ">
      {children}
    </div>
  );
}
