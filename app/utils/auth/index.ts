import { BACKEND_BASE_URL } from "@/app/env";
import axios from "axios";
import toast from "react-hot-toast";

const resendOtp = async (
  mobile: number,
  type:
    | "newregistration"
    | "pwd_change"
    | "requestCallbackOtp"
    | "priceQouteOtp"
) => {
  if (!mobile) return;
  try {
    const res = await axios.post(
      `${BACKEND_BASE_URL}/user/v1/sendMobileAndEmailOTP`,
      {
        username: mobile,
        otpType: type,
      }
    );
    if (!res.data.status) {
      toast.error(res.data.Message);
      return res.data;
    }
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const resetPasswordApi = async (password: string) => {
  const url = `${BACKEND_BASE_URL}/user/v1/resetPassword`;

  try {
    const response = await axios.post(url, {
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset password");
  }
};
export { resendOtp };
