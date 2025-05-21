import axios from "axios";

export const encode = async (id: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/enc?id=${id}`
  );
  return res.data;
};
export { encode as encodeProID };
