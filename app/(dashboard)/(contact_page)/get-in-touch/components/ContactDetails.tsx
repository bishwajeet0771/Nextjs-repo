import {
  ContactEmail,
  ContactLocation,
  ContactPhone,
  ContactUsIcon,
} from "@/app/images/HomePageIcons";
import React from "react";
import Card from "./ContactDetailCard";

export default function ContactDetails() {
  return (
    <div>
      <div className="flex justify-start items-center -ml-[3.5%] sm:-ml-3 xl:-ml-5 mb-2">
        <ContactUsIcon />{" "}
        <div className="flex flex-col items-start gap-1">
          {" "}
          <p className="text-[color:var(--800,#2D3748)] text-[14px] sm:text-[20px] xl:text-[26px] not-italic font-bold leading-[normal] capitalize">
            Contact Us
          </p>
          <p className="text-black text-[12px] sm:text-[16px] xl:text-xl not-italic font-medium">
            We’re here to help you!
          </p>
        </div>
      </div>
      <div className="space-y-[12px]">
        {Config.contactData.map((item) => (
          <Card key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

const Config = {
  contactData: [
    {
      label: "+91-8884440963",
      type: "phone",
      link: "tel:+91-8884440963",
      Icon: ContactPhone,
    },
    {
      label: "info@getrightproperty.com",
      type: "email",
      link: "mailto:rahulrpclan@gamil.com",
      Icon: ContactEmail,
    },
    {
      label:
        "Sigma Soft Tech Park, Office No - 15, Gamma Block, Whitefield, Bengaluru- 560066, Karnataka",
      type: "address",
      link: "#",
      Icon: ContactLocation,
    },
  ],
};
