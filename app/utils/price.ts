export function calculatePerSqPrice(
  price: string | number,
  sba: string
): string {
  const priceValue: number =
    typeof price === "string" ? parseFloat(price) : price;
  const sbaValue: number = parseFloat(sba);

  if (isNaN(priceValue) || isNaN(sbaValue) || sbaValue === 0) {
    return "N/A";
  }

  const result: number = priceValue / sbaValue;

  // Format the result with thousands separators and up to 2 decimal places
  let formattedResult: string = result.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // Remove trailing decimals if they are zero
  formattedResult = formattedResult.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, '');

  return formattedResult;
}
