export const environment = {
  production: import.meta.env.MODE === "production", // true if in prod build
  apiUrl: import.meta.env.VITE_API_URL as string,
  frontendUrl: import.meta.env.VITE_FRONTEND_URL as string,
};