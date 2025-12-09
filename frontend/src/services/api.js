import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = "Bearer " + token;
  return cfg;
});

export function decodeToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export default api;
