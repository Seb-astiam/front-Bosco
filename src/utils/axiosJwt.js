import axios from "axios";

const axiosJwt = axios.create();

axiosJwt.interceptors.request.use(
  (config) => {
    const { token } = JSON.parse(localStorage.getItem("user"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosJwt.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 403) {
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

export default axiosJwt;
