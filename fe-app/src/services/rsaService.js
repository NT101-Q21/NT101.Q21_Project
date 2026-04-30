import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api/rsa`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const generateRSAKeys = async (p, q) => {
  const response = await api.post("/generate-keys", {
    p: parseInt(p),
    q: parseInt(q),
  });
  return response.data;
};

export const encryptRSA = async ({ text, e, n, output_format }) => {
  const response = await api.post("/encrypt", {
    text,
    e: parseInt(e),
    n: parseInt(n),
    output_format,
  });
  return response.data;
};

export const decryptRSA = async ({ text, d, n, input_format }) => {
  const response = await api.post("/decrypt", {
    text,
    d: parseInt(d),
    n: parseInt(n),
    input_format,
  });
  return response.data;
};