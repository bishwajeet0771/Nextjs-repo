"use client";

import { isdDetailsList } from "@/app/data/isdDetails";
import clsx from "clsx";
import React, { useState } from "react";

type props = {
  className: string;
};

export default function CountryInput({ className }: props) {
  const [selected, setSelected] = useState("+91");
  return (
    <select
      name="isd"
      onChange={(e) => setSelected(e.target.value)}
      className={clsx(className, "text-black font-medium")}
      style={{ width: `${selected.length * 16.5}px` }}
      value={selected}
    >
      <option value="ISD" hidden>
        +91
      </option>
      {isdDetailsList.map((eachOne) => {
        return (
          <option
            key={`country_${eachOne.id}`}
            className="dropdown-item widthContactDropDown"
            value={eachOne.id}
          >{`${eachOne.id} ${eachOne.name}`}</option>
        );
      })}
    </select>
  );
}
