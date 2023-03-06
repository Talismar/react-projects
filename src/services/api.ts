import axios from "axios";

const URL_BACK = import.meta.env.VITE_URL_BACK;

const api = axios.create({
  baseURL: `${URL_BACK}api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
