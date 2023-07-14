import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://todo-api.aavaz.biz",
  headers: { 'Content-Type': 'application/json'}
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // console.log(token);
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
})

export default apiClient;