import axios from "axios";

const aixosInstance = axios.create({
    baseURL: "http://localhost:5050",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

export default aixosInstance;