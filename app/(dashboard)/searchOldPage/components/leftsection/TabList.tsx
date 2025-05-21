import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { Tabs } from "@mantine/core";
import React from "react";
import S from "@/app/styles/seach/Index.module.css";
// import SortBy from "./SortBy";
type Props = {};

export default function TabList({}: Props) {
  return (
    <Tabs.List className={S.bg}>
      {SEARCH_FILTER_DATA.categoryDataProject.map((eachItem) => {
        return (
          <Tabs.Tab
            key={eachItem.label}
            value={eachItem.value}
            classNames={{
              tab: S.tab,
              tabLabel: S.tabLabel,
            }}
          >
            {eachItem.label}
          </Tabs.Tab>
        );
      })}
      {/*  <SortBy  /> */}
    </Tabs.List>
  );
}
