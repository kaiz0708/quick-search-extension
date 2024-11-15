/** @format */
import originAxios from "axios";
export const axios = originAxios;

axios.defaults.baseURL = process.env.REACT_APP_API_OPEN_AI;
axios.defaults.withCredentials = true;
