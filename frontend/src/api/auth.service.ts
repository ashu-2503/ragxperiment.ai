import { httpService } from "./httpService";
import { PathConfig } from "../config/PathConfig";

export const authService = {
  signup: async (data: { name: string; email: string; password: string }) => {
    // response is already the API JSON
    return await httpService.post(PathConfig.SIGNUP_USER, data);
  },

  login: async (data: { email: string; password: string }) => {
    return await httpService.post(PathConfig.LOGIN_USER, data);
  },

  // Future: refreshToken, logout, forgotPassword, etc.
};


