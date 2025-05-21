"use client";
import React from "react";

type Props = {
  projectAbout: string;
  readMoreThreshold: number;
};

export default function SearchReadMoreContent({ projectAbout }: Props) {
  return (
    <span
      className="line-clamp-2"
      dangerouslySetInnerHTML={{
        __html: projectAbout,
      }}
    />
  );
}
