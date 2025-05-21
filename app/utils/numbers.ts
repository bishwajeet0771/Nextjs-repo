

function formatCurrency(input: number | string): string {
  const formatter = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  // Convert input to a number if it is a string
  const value = typeof input === "string" ? parseFloat(input) : input;

  // Check for invalid numbers
  if (isNaN(value)) return "Invalid Number";

  // Handle large numbers with suffixes
  if (value >= 10000000) {
    const croreValue = value / 10000000;
    const formatted = formatter.format(croreValue).replace(/\.00$/, '');
    return `₹ ${formatted} Cr*`;
  } else if (value >= 100000) {
    const lakhValue = value / 100000;
    const formatted = formatter.format(lakhValue).replace(/\.00$/, '');
    return `₹ ${formatted} Lac*`;
  } else {
    const formatted = formatter.format(value).replace(/\.00$/, '');
    return `₹ ${formatted}*`;
  }
}

export { formatCurrency };


function formatNumberWithSuffix(input: number | string, isStar: boolean = true): string {
  const formatter = new Intl.NumberFormat("en-IN");
  // Convert input to a number, handling string input and invalid strings
  const value = typeof input === "string" ? parseFloat(input) : input;

  // Check for invalid numbers
  if (isNaN(value)) return "Invalid Number";

  // Handle large numbers with suffixes
  if (value >= 10000000) {
    const croreValue = value / 10000000;
    return `${formatter.format(croreValue)} Cr${isStar ? "*" : ""}`;
  } else if (value >= 100000) {
    const lakhValue = value / 100000;
    return `${formatter.format(lakhValue)} Lac${isStar ? "*" : ""}`;
  } else {
    return `${formatter.format(value)}${isStar ? "*" : ""}`;
  }
}

export { formatNumberWithSuffix };
