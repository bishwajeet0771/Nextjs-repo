"use server";

import zlib from "zlib";

export async function filterBhkData(prevState: any, formData: FormData) {
  const bhkName = formData.get("bhkName");
  const compressedData = formData.get("data") as string;

  // Decompress the received data
  const buffer = Buffer.from(compressedData, "base64");
  const decompressedData = zlib.inflateSync(buffer).toString();

  // Parse the decompressed data
  const data = JSON.parse(decompressedData);

  // Filter the data
  if (bhkName === "0") {
    return data;
  } else {
    const filteredData = data.filter((item: any) => item.bhkName === bhkName);
    return filteredData;
  }
}
