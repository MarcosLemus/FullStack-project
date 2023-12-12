import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({ baseURL });

const errorMessages = {
  post: "Registro creado",
  put: "Registro actualizado",
  delete: "Registro borrado",
};

apiClient.interceptors.response.use(
  function (response) {
    console.log(response);
    const { method, url } = response.config;

    if (url.startsWith("/users")) return response;
    if (errorMessages[method]) {
      toast.success(errorMessages[method]);
    }

    return response;
  },
  function (error) {
    console.log("DESDE EL INTERCEPTOR");

    if (error.response.status === 500) {
      toast.error(error.response.data.message);
    } else if (error.response.status === 401 || error.response.status === 403) {
      toast.error(error.response.data.message);
    } else if (error.response.status === 404) {
      toast.error("Registro no encontrado");
    }

    return Promise.reject(error);
  }
);

export function setToken(token) {
  apiClient.defaults.headers.common["x-auth-token"] = token;
}

export default apiClient;
