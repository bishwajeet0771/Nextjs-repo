/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { ChangeEvent } from "react";

// Utility function to trim and replace multiple spaces with a single space
const handleTrimAndReplace = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  fieldName: string,
  form: any,
  type?: "dis" | "full"
) => {
  const value = e.target.value.trim().replace(/\s+/g, " ");
  type === "dis"
    ? form(fieldName, value)
    : form.setFieldValue(fieldName, value);
};
export const handleAllTrimAndReplace = (
  e: React.FocusEvent<HTMLInputElement>,
  fieldName: string,
  form: any
) => {
  const value = e.target.value;
  const trimmedValue = value.replace(/\s+/g, "");
  form.setFieldValue(fieldName, trimmedValue);
};
export const handleTrimAndReplaceReactHookForm = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  fieldName: string,
  form: any,
  type?: "dis" | "full" | "builderName",
  callback: (isRegex: boolean) => void = () => {}
) => {
  const value = e.target.value.trim().replace(/\s+/g, " ");
  switch (type) {
    case "builderName":
      {
        // Check if there are special characters other than &
        const hasSpecialChars = /[^\w\s&]/g.test(value);

        // Remove all special characters except &, keep alphanumeric, spaces, and &
        const validBuilderName = value
          .trim()
          .replace(/[^\w\s&]/g, "") 
          .replace(/[\s_]+/g, " "); 
        form(fieldName, validBuilderName);

        // Pass true if special characters (other than &) were found, otherwise false
        callback && callback(hasSpecialChars);
      }
      break;

    default:
      form(fieldName, value);
      break;
  }
};
export const handleTrimAllSpaces = (
  value: string,
  fieldName: string,
  setter: any,
  type?: "email" | "phone" | "name" | "builderName"
) => {
  switch (type) {
    case "email":
      // Remove invalid parts of the email before the '@' symbol
      {
        const validEmail = value
          .trim()
          .replace(/\s+/g, "") // Remove all spaces
          .toLowerCase() // Convert to lowercase
          .replace(/\.{2,}/g, ".") // Replace consecutive dots with a single dot
          .replace(/^\.|\.$/g, "") // Remove leading or trailing dots
          .replace(/(\.+)@/, "@") // Remove dots directly before the '@'
          // .replace(/^[^@]*[.]/, "") // Remove everything before the first dot if there is any dot before '@'
          .replace(/@[^.]+$/, (match) => match.replace(/^\.+/, "")); // Remove leading dots in the domain part if any

        setter(fieldName, validEmail);
      }
      break;
    case "builderName":
      {
        // Remove all special characters, keep only alphanumeric and spaces
        const validBuilderName = value
          .trim()
          .replace(/[^\w\s]/g, "") // Remove special characters, keep alphanumeric and spaces
          .replace(/\s+/g, " "); // Replace multiple spaces with a single space

        setter(fieldName, validBuilderName);
      }
      break;
    default:
      setter(fieldName, value.trim().replace(/\s+/g, ""));
      break;
  }
};
export default handleTrimAndReplace;
