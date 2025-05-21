import axios from "axios";
type Props = {
  projIdEnc: string;
  question: string;
  ansBy:number;
};
export const addQna = async (data: Props) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post-project/addProjectQNA`;
  try {
    const response = await axios.post(url, {
      quesition:data.question,
      projIdEnc:data.projIdEnc,
      ansBy:data.ansBy
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
