import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api/playfair`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const encryptPlayfair = async ({ text, key }) => {
  console.log(BASE_URL);
  const response = await api.post("/encrypt", {
    text,
    key,
  });
  return response.data;
};

export const decryptPlayfair = async ({ text, key }) => {
  const response = await api.post("/decrypt", {
    text,
    key,
  });
  return response.data;
};
