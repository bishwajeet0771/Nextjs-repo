"use client";
import {
  // listingSearchAtom,
  mobileSearchPageMapModalReducerAtom,
} from "@/app/store/search/map";
import { Modal } from "@mantine/core";
import { useAtom } from "jotai";
import S from "@/app/styles/Drawer.module.css";
import MapSkeleton from "@/app/components/maps/Skeleton";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Header from "./header";
import { useMediaQuery } from "@mantine/hooks";

function MapModal() {
  const [selected, dispath] = useAtom(mobileSearchPageMapModalReducerAtom);
  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        loading: () => <MapSkeleton />,
        ssr: false,
      }),
    []
  );
  const onClose = () => dispath({ type: "close" });
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <Modal
      opened={selected.content.lat !== null}
      onClose={onClose}
      centered
      size={isMobile ? "100%" : "90%"}
      title={selected?.title}
      classNames={{
        content: S.content,
        overlay: S.overlay,
        header: S.header,
      }}
    >
      <Header close={onClose} />
      <Map key="oldSearchPageMapModal" />
    </Modal>
  );
}
export default MapModal;
