import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { API_SERVER_URL } from "../constants/server";

const useAxios = () => {
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);

  const defaultAxios: AxiosInstance = axios.create({
    baseURL: API_SERVER_URL,
  });

  const axiosData = async (configParams: AxiosRequestConfig) => {
    try {
      setIsFetchLoading(true);
      const response = await defaultAxios.request(configParams);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        return axiosError.response;
      }
    } finally {
      setIsFetchLoading(false);
    }
  };

  return { isFetchLoading, axiosData };
};

export default useAxios;
