import axios from "axios";

const axiosJwt = axios.create();

axiosJwt.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosJwt.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 403) {
      console.log("No hay token");
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

export default axiosJwt;
