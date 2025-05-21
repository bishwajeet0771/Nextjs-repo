import axios from "axios";

export const formatNumberWithCommas = (num: any): string | undefined => {
  if (num) {
    const number = num !== undefined && num !== "" ? parseFloat(num) : num;
    const numberString = number.toFixed(2); // Convert to string with 2 decimal places
    const [integerPart, decimalPart] = numberString.split(".");

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (decimalPart === "00") {
      return formattedInteger;
    }

    return `${formattedInteger}.${decimalPart}`;
  }
};

async function getUrlSlugs(type: "project" | "listing") {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/all/active/ids?identifier=${type}`;
  let data = await axios.get(url);
  return data.data;
}

export { getUrlSlugs };
