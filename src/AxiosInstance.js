import axios from "axios";
import Cookies from "js-cookie";

// export const BASE_URL = "http://localhost:5000/api/v1/";
export const BASE_URL = "https://event-market.onrender.com/api/v1/";
const TOKEN = Cookies.get("token");

const api = axios.create({
    baseURL : BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

export default api;

