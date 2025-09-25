import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000", // FastAPI backend
});

// -------------------
// Signup
// -------------------
export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password
    });
    return response.data;
  } catch (error: any) {
    console.error("Error in signup:", error.response?.data || error.message);
    return null;
  }
};

// -------------------
// Login
// -------------------
export const login = async (identifier: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { identifier, password });
    return response.data; // { access_token, token_type }
  } catch (error: any) {
    console.error("Error in login:", error.response?.data || error.message);
    return null;
  }
};

export default api;
