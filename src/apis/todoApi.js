import axios from "./axios.config";

export const getAllTodo = async (userId) => {
  return await axios.get(`/v1/todo?userId=${userId}`);
};

export const createTodo = async (todoData, userId) => {
  return await axios.post(`/v1/todo?userId=${userId}`, todoData);
};

export const deleteTodo = async (todoId, userId, todoData) => {
  return await axios.delete(`/v1/todo/${todoId}?userId=${userId}`, todoData);
};

export const updateTodo = async (todoId, userId, todoData) => {
  return await axios.patch(`/v1/todo/${todoId}?userId=${userId}`, todoData);
};
