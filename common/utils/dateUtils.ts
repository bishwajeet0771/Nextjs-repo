function convertToSchemaDate(dateString: string): string {
  // Parse date correctly
  const date = new Date(dateString.replace("IST", "GMT+0530"));

  // Format date efficiently
  return date.toISOString().replace("Z", "+05:30");
}

export { convertToSchemaDate };
