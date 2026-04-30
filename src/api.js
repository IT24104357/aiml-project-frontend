import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-canteen-backend-kumf.onrender.com"
});

// 🔥 ADD TOKEN AUTOMATICALLY
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;