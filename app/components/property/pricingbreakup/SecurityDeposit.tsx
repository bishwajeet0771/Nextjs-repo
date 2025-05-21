import { formatCurrency } from "@/app/utils/numbers";
/* import { NumberFormatter } from "@mantine/core"; */
import React from "react";

export default function SecurityDeposit({ otherPrice }: { otherPrice: any }) {
  const { security, type } = config.calcSecurityDeposit(otherPrice);
  return (
    <div className={styles.container}>
      {styles.icon}
      <h4 className={styles.textLite}>{type}</h4>
      <h4 className={styles.textBold}>{/* ₹   <NumberFormatter
            thousandSeparator
            value={security }
            thousandsGroupStyle="lakh"
            
          /> */}
                 {formatCurrency(security)}
          </h4>
    </div>
  );
}
let styles = {
  container:
    "flex  items-center gap-2 xl:gap-5 border shadow-[0px_4px_22px_0px_rgba(126,106,0,0.35)] pl-2 xl:pl-[27px] xl:pr-24 py-3 rounded-[10px] border-solid border-[#FFD600] bg-[#FFF5C3] mt-8",
  textLite:
    "text-[#38333A] text-[18px] xl:text-2xl not-italic font-medium leading-[normal] capitalize",
  textBold: "text-[#242424] whitespace-pre-line text-[18px] xl:text-[34px] not-italic font-bold",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
      className="h-[24px] w-[24px] ml-4 xl:mx-0 xl:w-[34px] xl:h-[34px]"

    >
      <path
        d="M15.75 14.9942C15.092 14.9942 14.5386 14.7698 14.0898 14.321C13.641 13.8722 13.4166 13.3188 13.4166 12.6608C13.4166 12.0028 13.641 11.4495 14.0898 11.0007C14.5386 10.5519 15.092 10.3275 15.75 10.3275C16.408 10.3275 16.9613 10.5519 17.4101 11.0007C17.8589 11.4495 18.0833 12.0028 18.0833 12.6608C18.0833 13.3188 17.8589 13.8722 17.4101 14.321C16.9613 14.7698 16.408 14.9942 15.75 14.9942ZM8.52596 18.7193C8.00718 18.7193 7.56346 18.5346 7.19479 18.1652C6.82535 17.7957 6.64062 17.352 6.64062 16.834V8.48768C6.64062 7.96968 6.82535 7.52635 7.19479 7.15768C7.56424 6.78902 8.00757 6.60429 8.52479 6.60352H22.974C23.4927 6.60352 23.9365 6.78785 24.3051 7.15652C24.6738 7.52518 24.8585 7.9689 24.8593 8.48768V16.834C24.8593 17.352 24.6746 17.7953 24.3051 18.164C23.9365 18.5342 23.4931 18.7193 22.9751 18.7193H8.52596ZM9.69262 17.5527H21.8073C21.8073 17.03 21.992 16.5851 22.3615 16.218C22.7301 15.8509 23.1735 15.6673 23.6915 15.6673V9.65435C23.1703 9.65435 22.7262 9.47002 22.3591 9.10135C21.9912 8.7319 21.8073 8.28818 21.8073 7.77018H9.69262C9.69262 8.29207 9.5079 8.73657 9.13846 9.10368C8.76979 9.47079 8.32646 9.65435 7.80846 9.65435V15.6673C8.32957 15.6673 8.77407 15.8521 9.14196 16.2215C9.50907 16.5902 9.69262 17.0335 9.69262 17.5515M20.8203 22.2182H5.02596C4.50718 22.2182 4.06346 22.0338 3.69479 21.6652C3.32535 21.2957 3.14062 20.852 3.14062 20.334V10.6413C3.14062 10.4765 3.19663 10.338 3.30863 10.226C3.42063 10.114 3.55946 10.058 3.72513 10.058C3.89079 10.058 4.02924 10.114 4.14046 10.226C4.25168 10.338 4.30729 10.4765 4.30729 10.6413V20.334C4.30729 20.5129 4.38196 20.6774 4.53129 20.8275C4.6814 20.9776 4.84629 21.0527 5.02596 21.0527H20.8203C20.986 21.0527 21.1244 21.1083 21.2356 21.2195C21.3476 21.3315 21.4036 21.4703 21.4036 21.636C21.4036 21.8017 21.3476 21.9401 21.2356 22.0513C21.1236 22.1626 20.9852 22.2174 20.8203 22.2182ZM8.52596 17.5527H7.80729V7.76902H8.52596C8.33151 7.76902 8.16313 7.84018 8.02079 7.98252C7.87846 8.12485 7.80729 8.29285 7.80729 8.48652V16.834C7.80729 17.0285 7.87846 17.1968 8.02079 17.3392C8.16313 17.4815 8.33151 17.5527 8.52596 17.5527Z"
        fill="#38333A"
      />
    </svg>
  ),
};

let config = {
  SampleText: " Security Deposit : ",
  calcSecurityDeposit(otherPrice: any): { security: number; type: string } {
    const {
      securetyType,
      security,
      securityMonth = 1,
      price,
    } = otherPrice;
    let total =
      securetyType === "M" ? securityMonth * price  : security;
    let text = this.SampleText;
    return { security: total, type: text };
  },
};
