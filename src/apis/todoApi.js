import axios from "./axios.config";

export const getAllTodo = async (userId) => {
  return await axios.get(`/v1/todo?userId=${userId}`);
};
