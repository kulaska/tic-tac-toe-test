import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        common: {
            "Content-Type": "application/json"
        }
    },
    baseURL: process.env.REACT_APP_BASE_URL
});

export default axiosInstance;
