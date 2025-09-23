import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000", // FastAPI backend
});

// Example GET request function
export const getData = async () => {
  try {
    const response = await api.get("/auth"); // make sure this endpoint exists
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.response?.data || error.message);
    return null; // always return something
  }
};

export default api;
