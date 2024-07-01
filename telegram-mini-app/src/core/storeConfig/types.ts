import store from './store';

type MethodsType = 'get' | 'post' | 'put' | 'delete';

export interface AxiosRequestConfig<T> {
  url?: string;
  method?: MethodsType;
  data?: T | null;
  params?: Record<string, any>;
  headers?: any;
  responseType?: any;
  withAuth?: boolean;
}

export interface ErrorType {
  title: string;
  message: string | undefined;
  status: number | undefined;
  headers?: any;
}

export type IAxiosResponse<T> =
  | { error: ErrorType; data: null }
  | { data: T; error: null };

export interface ErrorResponseType {
  error: {
    message: string;
    code: number;
  };
}

export type requestStatusType = 'loading' | 'success' | 'error' | null;

export type errorType = {
  response: {
    statusCode: number;
    message: string;
    error: string;
  };
  status: number;
  options: any;
  message: string;
  name: string;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
