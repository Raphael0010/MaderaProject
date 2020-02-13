import axios from "axios";

export const callApiFree = async (uri: string, method: any, data?: any) => {
  const baseUrl = "http://10.173.128.223:3000";
  const met = method.toString().toUpperCase();

  if (met !== "POST" && met !== "GET" && met !== "PUT" && met !== "DELETE") {
    return "bad method";
  }

  if (met === "POST") {
    const res = await axios.post(baseUrl + uri, data);
    if (!res.data) {
      console.log(res);
      return JSON.stringify(`"error":"${res}"`);
    }
    return res.data;
  }

  if (met === "GET") {
    const res = await axios.get(baseUrl + uri, data);
    if (!res.data) {
      console.log(res);
      return JSON.stringify(`"error":"${res}"`);
    }
    return res.data;
  }
};
