export const isSingleLetterOrNumber = (str: string) =>
  /^[A-Za-z0-9]$/.test(str);
function capitalizeWords(str: string): string {
  if (!str) {
    return "Not Found";
  }
  let result: string = "";
  let capitalizeNext: boolean = true;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      result += " ";
      capitalizeNext = true;
    } else if (capitalizeNext) {
      result += str[i].toUpperCase();
      capitalizeNext = false;
    } else {
      result += str[i].toLowerCase();
    }
  }

  return result;
}
const truncateText = (text: string, limit: number): string => {
  if (text?.length <= limit) return text;
  return text?.slice(0, limit) + "...";
};
export { capitalizeWords, truncateText };
