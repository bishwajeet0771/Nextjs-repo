import axios from "axios";
type Props = {
  projIdEnc: string;
  rating: number;
  review: string;
};
export const addRating = async (data: Props) => {
  const reqBody = {
    projIdEnc: data.projIdEnc,
    rating: data.rating,
    ...(data.review !== "" && { review: data.review }),
  };

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/add-review`;
  try {
    const response = await axios.post(url, reqBody);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
