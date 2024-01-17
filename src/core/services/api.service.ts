import axios, { type AxiosRequestConfig } from "axios";
import { API_URL, EStatusCode } from "@/core/constants/appConstants";
import { TAnyType } from "@/core/constants/commonType";

const instance = axios.create({
  // baseURL: url defined in .env file
  baseURL: API_URL,
  headers: {
    "content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return config ?? {};
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const statusCode = response?.data?.status_code;

    switch (statusCode) {
      case EStatusCode.BAD_REQUEST:
        break;
      case EStatusCode.NOT_FOUND:
        break;

      case EStatusCode.INTERNAL_SERVER_ERROR:
        break;

      default:
        break;
    }

    return response;
  },
  (error) => {
    return error;
  },
);

/**
 * ApiService provides methods for making HTTP requests.
 */
const ApiService = {
  /**
   * Executes a GET request to the specified URL.
   *
   * @param {string} url - The URL to send the GET request to.
   * @param {AxiosRequestConfig} config - (Optional) Additional configuration options for the request.
   * @returns {Promise<T>} A promise that resolves to the response data.
   */
  GET: <T = TAnyType>(url: string, config?: AxiosRequestConfig) => {
    return instance<T>(url, { method: "get", url, ...config });
  },
  /**
   * Sends a POST request to the specified URL with optional data and configuration.
   *
   * @param {string} url - The URL to send the POST request to.
   * @param {TAnyType} data - Optional data to send with the request.
   * @param {AxiosRequestConfig} config - Optional configuration for the request.
   * @returns {Promise<T>} A Promise that resolves to the response data.
   */
  POST: <T = TAnyType>(url: string, data?: TAnyType, config?: AxiosRequestConfig) => {
    return instance<T>(url, { method: "post", url, data, ...config });
  },
  /**
   * Sends a HTTP PUT request to the specified URL.
   *
   * @param {string} url - The URL to send the request to.
   * @param {TAnyType} data - Optional data to send with the request.
   * @param {AxiosRequestConfig} config - Optional configuration for the request.
   * @returns {Promise<T>} A promise that resolves with the response data.
   */
  PUT: <T = TAnyType>(url: string, data?: TAnyType, config?: AxiosRequestConfig) => {
    return instance<T>(url, { method: "put", url, data, ...config });
  },
};

export default ApiService;
