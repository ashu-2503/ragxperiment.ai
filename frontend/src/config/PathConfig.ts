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

  // File Upload URLs
  static FILE_UPLOAD = `${PathConfig.API_ENDPOINT}/files/upload`;
  static FILE_STATUS = (fileId: number) => `${PathConfig.API_ENDPOINT}/files/${fileId}/status`;
  static FILE_LIST = `${PathConfig.API_ENDPOINT}/files/files`;

  //Dashboard URLs
  static DASHBOARD_KNOWLEDGEBASE_COUNT = `${PathConfig.API_ENDPOINT}/dashboard/knowledgebase-count`;

}