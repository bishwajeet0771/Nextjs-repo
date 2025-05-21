"use client";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function MobileHidden({ children }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return !isMobile && children;
}
