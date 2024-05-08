import axios from "./axios.config";

export const loginApi = async (loginData) => {
  return await axios.post("/auth/login", loginData);
};
