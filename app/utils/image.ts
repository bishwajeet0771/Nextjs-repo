interface MediaObject {
  [key: string]: string | string[] | undefined;
}

function getImageUrls(
  mediaObject: MediaObject,
  propertyNames = [
    "coverImageUrl",
    "otherImgUrl",
    "projectPlanUrl",
    "floorPlanUrl",
  ]
): string[] {
  const imageUrls: string[] = [];

  if (mediaObject && propertyNames && Array.isArray(propertyNames)) {
    propertyNames.forEach((propertyName) => {
      if (mediaObject[propertyName]) {
        if (Array.isArray(mediaObject[propertyName])) {
          imageUrls.push(
            ...(mediaObject[propertyName] as string[]).map((url) => `${url}`)
          );
        } else {
          imageUrls.push(`${mediaObject[propertyName]}`);
        }
      }
    });
  }

  return imageUrls;
}

const imageUrlParser = (originalUrl: string, type?: string) => {
  if (!originalUrl) return "";
  let isVideo = originalUrl.includes("mp4") || originalUrl.includes("youtube");
  const imagePath = originalUrl.includes("youtube")
    ? originalUrl
    : originalUrl.includes(process.env.NEXT_PUBLIC_IMG_BASE!)
    ? originalUrl.split(process.env.NEXT_PUBLIC_IMG_BASE!)[1]
    : originalUrl;
  let modifiedUrl;
  if (isVideo) {
    modifiedUrl = `${process.env.NEXT_PUBLIC_URL}/video?path=${imagePath}`;
  } else {
    modifiedUrl = `${process.env.NEXT_PUBLIC_URL}/image?path=${imagePath}${
      type ? `&type=${type}` : ""
    }`;
  }
  return modifiedUrl.replace(",", "");
};
export { getImageUrls, imageUrlParser };
