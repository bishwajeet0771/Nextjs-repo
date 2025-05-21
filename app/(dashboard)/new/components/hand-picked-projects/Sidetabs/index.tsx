"use client";
import React from "react";
import Card from "./Card";

type Props = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  className:string
};

export default function SideTabs({ active, setActive , className}: Props) {
  return (
    <div className={className}>
      {config.data.map((item, index) => (
        <Card
          key={item.lablel}
          label={item.lablel}
          active={active == index}
          onClick={() => setActive(index)}
        />
      ))}
    </div>
  );
}
const config = {
  data: [
    { lablel: "New Launch Projects" },
    { lablel: "On- Going Projects" },
    { lablel: "Completed Projects" },
  ],
};
