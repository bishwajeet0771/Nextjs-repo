const COMPANY_NAME = "GET RIGHT PROPERTY";
const COMPANY_URL = "https://www.getrightproperty.com/";
const PRICE_CURRENY = "INR";
const LOGO_URL =
  "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp";
const DOMAIN = "https://www.getrightproperty.com/";
const PHONE_NUMBER = "+91 8884440963";
const propertyMap = new Map<string, { name: string }>([
  ["apt", { name: "Apartment" }],
  ["plot", { name: "Plot" }],
  ["rowHouse", { name: "Rowhouse" }],
  ["villa", { name: "Villa" }],
  ["vlmt", { name: "Villament" }],
]);

export {
  COMPANY_NAME,
  COMPANY_URL,
  PRICE_CURRENY,
  DOMAIN,
  PHONE_NUMBER,
  propertyMap,
  LOGO_URL,
};
