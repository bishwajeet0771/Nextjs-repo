import React from "react";
type Props = { params: { slug: string } };
export default function Page({ params: { slug } }: Props) {
  const decodedUrl = decodeURIComponent(
    `${process.env.NEXT_PUBLIC_IMG_BASE}${slug}`
  );
  return (
    <div>
      <embed
        src={decodedUrl}
        type="application/pdf"
        width="100%"
        className="h-[100vh] pt-[70px]"
      />
    </div>
  );
}
