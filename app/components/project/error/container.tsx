import React from "react";

type Props = {
  children?: React.ReactNode;
  data: any[];
};

export default function ErrorContainer({ data, children }: Props) {
  return <> {data && data.length > 0 ? children : null}</>;
}
