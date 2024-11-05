import axios from "axios";
import { BASE_URL_API } from "./global";
const api = axios.create({
    baseURL: `${BASE_URL_API}`
});

export default api;