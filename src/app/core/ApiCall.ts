import axios from "axios";

export const callApiFree = async (uri: string, method: any, data?: any) => {
  const baseUrl = "http://localhost:3000";
  const met = method.toString().toUpperCase();

  if (met !== "POST" && met !== "GET" && met !== "PUT" && met !== "DELETE") {
    return "bad method";
  }

  if (met === "POST") {
    return await axios.post(baseUrl + uri, data);
  }

  if (met === "GET") {
    return await axios.get(baseUrl + uri, data);
  }
};
