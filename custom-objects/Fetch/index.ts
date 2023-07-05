import { APIErrorResponse, handleResponse } from "./utils";

class APIRequest {
  static async request<T>(url: string, init?: RequestInit | undefined) {
    try {
      const res = await fetch(url, init);
      return handleResponse<T>(res);
    } catch (error) {
      console.error("Could not make request");
      return {
        errorMessage: "Could not make request",
        success: false,
        data: undefined,
      } as APIErrorResponse;
    }
  }
}

export default APIRequest;