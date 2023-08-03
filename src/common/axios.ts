import axios, { AxiosInstance } from 'axios';
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

const BASEURL = 'http://192.168.10.126:8787/api/';
// const AUTH = getCookie('authorization');
const connectedLogin = true;
const client: CustomInstance = axios.create();
client.defaults.baseURL = BASEURL;
client.defaults.withCredentials = true;
// client.defaults.headers.common.authorization = AUTH;
// const sourceRequest = {};
client.interceptors.request.use(
  function (config) {
    // if (config.method === 'post') {
    //   const key = `${config.url}$${JSON.stringify(config.data)}`;
    //
    //   if (sourceRequest[key]) {
    //     throw new Error('Automatic cancellation'); // If the request exists cancel
    //   } else {
    //     sourceRequest[key] = new Date(); // Store request key
    //   }
    // }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  function (response) {
    console.log(response);
    const url = response.config.url;

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

    // setCookie('authorization', response.headers.authorization);
    // axios.defaults.headers.common.authorization = response.headers.authorization;
    // pollingAxios.defaults.headers.common.authorization = response.headers.authorization;

    if (response.data === null) {
      return response;
    }

    return response.data;
  },
  error => {
    // unAuthorization(error);
    errorLog(error);

    return Promise.reject(error);
  },
);

export { client };

const loginAxios: CustomInstance = axios.create();

loginAxios.defaults.baseURL = BASEURL;
loginAxios.defaults.withCredentials = true;

loginAxios.interceptors.response.use(
  function (response) {
    axios.defaults.headers.common['A-AUTH-TOKEN'] = response.data.accessToken;
    loginAxios.defaults.headers.common['A-AUTH-TOKEN'] = response.data.accessToken;
    // loginAxios.defaults.headers.common['A-AUTH-TOKEN'] = response.data.refreshToken;
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

const unAuthorization = error => {
  if (error.response.status && error.response.status === 401) {
    setCookie('authorization', 'none');
    if (connectedLogin) {
      // connectedLogin = false;
      alert('로그인이 만료되었습니다.');
      removeCookie('authorization');
      removeCookie('uid');
      removeCookie('ulevel');
      window.location.href = `${process.env.PUBLIC_URL}/Logout`;
    }
  }
};

const errorLog = error => {
  console.log(error);
  console.log(
    `%cURL Info : ${error.config.url}-------------------------------------`,
    'background: #000; color: #2CD4A8',
  );
  console.log(error);
  console.log(error.response);
  console.log(
    `%cError Code : ${error.response.status} ${error.response.statusText}\nError Msg  : ${error.response.data.responseMessage}`,
    'background: #000; color: #2CD4A8',
  );
};
