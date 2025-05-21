import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  value: string | number;
  className?: string;
};

export default function ListItem({ label, value, className }: Props) {
  return (
    <li
      className={clsx(
        "flex w-full   justify-between items-center  list-disc   gap-[14px]  xl:gap-[26px]   text-[14px] xl:text-2xl  font-bold leading-[23.784px]  pb-2 xl:pb-5",
        className
      )}
    >
      <div className=" flex items-center   text-[#202020] text-[14px] xl:text-xl not-italic font-medium leading-[normal] relative pl-5 capitalize">
        <span className="text-center  absolute left-0 -top-[30px] xl:-top-[25px] font-medium text-5xl">
          .
        </span>

        {label}
      </div>{" "}
      <span className="text-[#242424] text-right text-[14px] xl:text-xl not-italic font-semibold">
        {typeof value === "string" ? value : `₹ ${formatCurrency(value)}`}
      </span>
    </li>
  );
}

// const config = {
//   hidePriceItems: ["Lifetime", "As Per Actuals", "Already Included"],
// };

function formatCurrency(input: number | string): string {
  // Convert input to a number if it is a string
  const value = typeof input === "string" ? parseFloat(input) : input;

  // Check for invalid numbers
  if (isNaN(value)) return "Invalid Number";

  // Helper function to format numbers with commas
  const formatNumberWithCommas = (num: number): string => {
    const numberString = num.toFixed(2); // Convert to string with 2 decimal places
    const [integerPart, decimalPart] = numberString.split(".");

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (decimalPart === "00") {
      return formattedInteger;
    }

    return `${formattedInteger}.${decimalPart}`;
  };

  // Handle large numbers with suffixes
  if (value >= 10000000) {
    const croreValue = (value / 10000000).toFixed(2);
    const formattedValue = parseFloat(croreValue); // Convert to number to remove trailing zeros
    return `₹ ${formatNumberWithCommas(formattedValue)} Cr`;
  } else if (value >= 100000) {
    const lakhValue = (value / 100000).toFixed(2);
    const formattedValue = parseFloat(lakhValue); // Convert to number to remove trailing zeros
    return `₹ ${formatNumberWithCommas(formattedValue)} Lac`;
  } else {
    return `₹ ${formatNumberWithCommas(value)}`;
  }
}
