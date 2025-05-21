import React from "react";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";

type Props = {};

export default function MainContent({}: Props) {
  return (
    <div className="inline-flex items-start justify-start sm:gap-[80px] xl:gap-[120px] m-auto pt-5 px-5 sm:px-0 sm:pt-10 pb-[5%] flex-wrap-reverse sm:flex-nowrap">
      <ContactDetails /> 
      <ContactForm />
    </div>
  );
}
