import { environment } from "./env";

export class PathConfig {
  // Base endpoints
  static get API_ENDPOINT(): string {
    return environment.apiUrl;
  }

  static get FRONTEND_ENDPOINT(): string {
    return environment.frontendUrl;
  }

  // Authentication URLs
  static LOGIN_USER = `${PathConfig.API_ENDPOINT}/auth/login`;
  static SIGNUP_USER = `${PathConfig.API_ENDPOINT}/auth/signup`;


}