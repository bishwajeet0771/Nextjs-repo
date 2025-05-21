"use server";

const addRating = async (formData: FormData) => {
  const ratingItem = formData.get("review");
  return ratingItem;
};
export { addRating };
