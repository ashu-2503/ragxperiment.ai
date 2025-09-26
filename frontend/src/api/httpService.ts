import http from "./http";

class HttpService {
  private errorMessage = "Server Error";

  private handleError(err: any) {
    // Standardized error object
    const message = err?.response?.data?.message || this.errorMessage;
    throw { error: message };
  }

  async get(endpoint: string, params?: Record<string, any>) {
    try {
      const response = await http.get(endpoint, { params });
      return response.data; // always return data
    } catch (err: any) {
      this.handleError(err);
    }
  }

  async post(endpoint: string, body: any) {
    try {
      const response = await http.post(endpoint, body);
      return response.data; // always return data
    } catch (err: any) {
      this.handleError(err);
    }
  }

  async put(endpoint: string, body: any) {
    try {
      const response = await http.put(endpoint, body);
      return response.data;
    } catch (err: any) {
      this.handleError(err);
    }
  }

  async delete(endpoint: string) {
    try {
      const response = await http.delete(endpoint);
      return response.data;
    } catch (err: any) {
      this.handleError(err);
    }
  }

  async getFile(endpoint: string) {
    try {
      const response = await http.get(endpoint, { responseType: "blob" });
      return response.data; // Blob
    } catch (err: any) {
      this.handleError(err);
    }
  }
}

export const httpService = new HttpService();
