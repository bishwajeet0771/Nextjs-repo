import React from "react";
import Cards from "./Cards";

type Props = {};

export default function CardSection({}: Props) {
  return (
    <div className="flex mt-6 gap-3">
      <Cards />
      <Cards />
      <Cards />
    </div>
  );
}
