import axios from "axios";

const api = axios;

api.defaults.baseURL = process.env.REACT_APP_API_URL;

export default api;
