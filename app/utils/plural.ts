/**
 * Pluralize or singularize a string based on the provided value.
 *
 * @param value - The value to check.
 * @param str - The string to modify.
 * @returns The modified string based on the value.
 */
const pluralizeOrSingularize = (value: number, str: string): string => {
  return value === 1 ? str.replace(/s$/, "") : str;
};
export { pluralizeOrSingularize };
