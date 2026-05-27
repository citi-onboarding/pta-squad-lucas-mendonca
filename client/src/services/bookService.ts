import api from "./api";

export const createBook = async (payload: any) => {
  const response = await api.post("/books", payload);
  return response.data;
};