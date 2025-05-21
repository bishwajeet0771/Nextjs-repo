import axios from "axios";
type Props = {
  projIdEnc: string;
  type: number;
  isactive: string;
  source: "proj" | "prop";
};
export const addShortList = async (data: Props) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/add?type=${data.type}`;
  const propName = data.source == "proj" ? "projIdEnc" : "propIdEnc";
  try {
    const response = await axios.post(url, {
      [propName]: data.projIdEnc,
      isactive: data.isactive,
    });
    console.log(data.isactive == "Y" ? "Property Added" : "Property Removed", {
      [propName]: data.projIdEnc,
    });
    // toast.success(data.isactive == "Y" ? "Property Added" : "Property Removed");
    return response.data;
  } catch (error) {
    // toast.error("Something went wrong");
    console.error(error + "user not logged in");
  }
};
