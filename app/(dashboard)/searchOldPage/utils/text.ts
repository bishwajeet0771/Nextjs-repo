export interface SearchParams {
  listedBy: string | null;
  cg: string;
  city?: string
}

export const DynamicText = (params: SearchParams) => {
  const { listedBy, cg } = params;
  const propertyText =
    listedBy === "I" || listedBy === "A" || listedBy === "B" || listedBy === "ALL"
      ? "Properties for"
      : "Projects";
  const rentOrSellText = cg === "R" ? "Rent" : "Sale";
  const cityText = params.city ? ` in ${params.city.split("+")[0]}` : '';
  const dynamicText = `${propertyText} ${
    listedBy === "I" || listedBy === "A" || listedBy === "B" || listedBy === "ALL"
      ? rentOrSellText
      : ""
  }${cityText}`;

  return dynamicText;
};
