// api.ts
import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api: any = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface BasicDetailsResponse {
  data: any;
}

export const getBasicDetails = (
  projIdEnc: string
): Promise<BasicDetailsResponse> => {
  return api.get(`/api/project/basicDetails?projIdEnc=1234`, {
    params: {
      projIdEnc,
    },
  });
};

export default api;
