import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getCookie, removeCookie, setCookie } from './Cookie';

interface CustomInstance extends AxiosInstance {
  get<T>(...params: Parameters<AxiosInstance['get']>): Promise<T>;
  delete<T>(...params: Parameters<AxiosInstance['delete']>): Promise<T>;
  post<T>(...params: Parameters<AxiosInstance['post']>): Promise<T>;
  put<T>(...params: Parameters<AxiosInstance['put']>): Promise<T>;
  patch<T>(...params: Parameters<AxiosInstance['patch']>): Promise<T>;
}

export interface GetResponse {
  responseMessage?: string;
  statusCode?: number;
}

const BASEURL = 'http://192.168.10.197:8787/api/';
// const BASEURL = 'http://192.168.10.126:8787/api/';
const client: CustomInstance = axios.create();
client.defaults.baseURL = BASEURL;
client.defaults.withCredentials = true;

client.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  function (response) {
    const url = response.config.url;
    console.log(response);
    console.log(
      `%cURL Info : ${url}-------------------------------------`,
      'background: #000; color: #bada55',
    );
    if (response.config.method !== 'get') {
      console.log(response.config.data);
    }
    console.log(response.data);
    console.log(
      '%c------------------------------------------------------------',
      'background: #000; color: #bada55',
    );

    if (response.data === null) {
      return response;
    }

    return response.data;
  },
  async error => {
    errorLog(error);
    if (error.response.status !== 401 || error.config.sent) {
      return Promise.reject(error);
    }

    error.config.sent = true;
    return await unAuthProcess(error).catch(() => logout());
  },
);

export { client };

const loginAxios: CustomInstance = axios.create();

loginAxios.defaults.baseURL = BASEURL;
loginAxios.defaults.withCredentials = true;

loginAxios.interceptors.response.use(
  function (response) {
    setCookie('accessToken', response.data.accessToken);
    setCookie('refreshToken', response.data.refreshToken);

    if (response.config.url === '/logout') {
      return '';
    }

    return response.data;
  },
  error => {
    errorLog(error);
    return Promise.reject(error);
  },
);

export { loginAxios };

const errorLog = (error: AxiosError | Error) => {
  if (axios.isAxiosError(error)) {
    const { message, config, response } = error;

    console.log(message);
    console.log(config?.url);
    console.log(response);
  }

  if (axios.isAxiosError(error)) {
    console.log(
      `%cURL Info : ${error?.config?.url}-------------------------------------`,
      'background: #000; color: #2CD4A8',
    );
    if (error.response) {
      console.log(error.response);
      console.log(
        `%cError Code : ${error?.response.status} ${error.response.statusText}\nError Msg  : ${error.response.data.responseMessage}`,
        'background: #000; color: #2CD4A8',
      );
    } else if (error.request) {
      console.log(error.request.statusText);
      console.log(error);
      console.log(
        `%cError Code : ${error.request.status} ${
          error.request.statusText || error.message
        }\nError Msg  :`,
        'background: #000; color: #2CD4A8',
      );
    }
  } else {
    console.log(error);
  }
};

const tokenAxios: CustomInstance = axios.create();

tokenAxios.defaults.baseURL = BASEURL;
tokenAxios.defaults.withCredentials = true;

let subscribers: Array<() => void> = [];
let lock = false;

tokenAxios.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = 'Bearer ' + getCookie('refreshToken');
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

function onSubscribe(cb: () => void) {
  subscribers.push(cb);
}

function onPublish() {
  subscribers.forEach(cb => cb());
}

const unAuthProcess = async ({
  config,
}: {
  config: InternalAxiosRequestConfig;
}): Promise<void | AxiosResponse> => {
  // const unAuthProcess = async (error: AxiosError): Promise<void | AxiosResponse> => {
  const originalRequest = <InternalAxiosRequestConfig>config;

  if (lock) {
    return onSubscribe(() => client(originalRequest));
    // return new Promise(resolve => onSubscribe(() => resolve(client(config))));
  }

  lock = true;
  await reissueAccessToken();
  return client(config);
  // const config = error.config as InternalAxiosRequestConfig;
  // const originalRequest: InternalAxiosRequestConfig = config;
  // console.log(error);
  // if (lock) {
  //   return onSubscribe(() => client(originalRequest));
  //   // return new Promise(resolve => onSubscribe(() => resolve(client(config))));
  // }
  //
  // lock = true;
  // await reissueAccessToken();
  // return client(config);
};

interface TokenType extends GetResponse {
  data: { accessToken: string; refreshToken?: string };
}

const reissueAccessToken = async (): Promise<string | void> => {
  try {
    const { data } = await tokenAxios.post<TokenType>('user/reissue');
    lock = false;
    onPublish();
    subscribers = [];
    setCookie('accessToken', data.accessToken);

    return data.accessToken;
  } catch (e) {
    subscribers = [];
    logout();
  }
};

function logout() {
  window.location.href = '/login';
  lock = false;
  removeCookie('accessToken');
  removeCookie('refreshToken');
}
