import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000", // SESUAI EXPRESS BACKEND
  withCredentials: true,
});
