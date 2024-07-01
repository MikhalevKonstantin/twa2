import axios, { AxiosError } from 'axios';
import {
  AxiosRequestConfig,
  ErrorResponseType,
  ErrorType,
  IAxiosResponse,
} from './types';
import WebApp from '@twa-dev/sdk';

export const defaultAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: WebApp.initData,
    'Content-Type': 'application/json',
  },
});

const wrappedAxiosRequest = async <ReqType, RespType>({
  url,
  method,
  data = null,
  headers = {},
  params = {},
  responseType,
}: AxiosRequestConfig<ReqType>) => {
  try {
    const response = await defaultAxios({
      url,
      method,
      data,
      headers,
      params,
      responseType,
    });

    console.log('response: ', response.data);

    const responseObj: IAxiosResponse<RespType> = {
      data: response.data,
      error: null,
    };
    return responseObj;
  } catch (error) {
    const handledError = errorHandler(error);
    const errorObj: IAxiosResponse<RespType> = {
      error: handledError,
      data: null,
    };
    return errorObj;
  }
};

const errorHandler = (error: any): ErrorType => {
  const typedError = error as AxiosError<ErrorResponseType>;

  if (typedError.response?.status === 401) {
    // todo refresh token
  }
  console.log(typedError.toJSON());
  return {
    title: typedError.message,
    message: typedError.response?.data?.error?.message,
    status: typedError.response?.status,
    headers: typedError.response?.headers,
  };
};

export { wrappedAxiosRequest };
