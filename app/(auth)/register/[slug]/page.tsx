import Agent from "@/app/components/molecules/auth/signup/agent";
import Builder from "@/app/components/molecules/auth/signup/builder";
import Individual from "@/app/components/molecules/auth/signup/individual";
import { decryptResumeSignupToken } from "@/app/utils/auth/crypto";
// import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
// interface Props {
//   params: {
//     slug: string;
//   };
// }

type PageType = {
  individual: React.ReactElement;
  agent: React.ReactElement;
  builder: React.ReactElement;
};

const Page: React.FC<{ params: { slug: keyof PageType } }> = async ({
  params: { slug },
}) => {
  const encriptedData = await decryptResumeSignupToken(slug);
  const components: PageType = {
    individual: <Individual />,
    agent: <Agent encriptedData={encriptedData} />,
    builder: <Builder encriptedData={encriptedData} />,
  };
  const ComponentToRender = components[slug] || notFound();

  return (
    <div className="w-full flex justify-center items-center flex-col p-[5%] sm:p-[10%] pt-[5%] md:p-0">
      {ComponentToRender}
    </div>
  );
};

export default Page;
