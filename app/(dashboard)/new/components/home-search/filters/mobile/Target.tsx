import { SearchIcon } from "@/app/images/HomePageIcons";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import AppDrawer from "./Drawer";

type Props = {};

export default function Target({}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="flex sm:hidden items-center min-w-full" onClick={open}>
        <SearchIcon />
        <button className="ml-2">
          <span className="text-[#242424] text-xs not-italic font-normal">
            Search
          </span>
          <span className="text-[#242424] text-xs italic font-medium">
            “ Whitefield, Bengaluru”
          </span>
        </button>
      </div>
      <AppDrawer close={close} opened={opened} />
    </>
  );
}
