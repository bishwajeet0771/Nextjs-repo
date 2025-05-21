import axios from "axios";

export const myClientLogger = async (type: string, data: any) => {
  await axios.post("/api/logger", { type, data });
};
