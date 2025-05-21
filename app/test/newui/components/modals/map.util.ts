export const checkLatAndLang = (number: any) => {
  var invalidChars = ["e", "E", "W", "N", "S", "+", "°"];
  if (number === undefined && number === null && number === "") return;
  const finalNumber = number.toString();
  const isIncluded = invalidChars.some((each) => finalNumber.includes(each));
  if (isIncluded) {
    return finalNumber.replace(/[^0-9.]/g, "");
  } else {
    return finalNumber;
  }
};
