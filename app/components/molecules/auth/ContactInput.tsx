import { Select } from "@mantine/core";
import React from "react";

export default function ContactInput() {
  return (
    <div>
      <Select
        label="+91"
        placeholder="Pick value"
        data={["React", "Angular", "Vue", "Svelte"]}
        searchable
      />
    </div>
  );
}
