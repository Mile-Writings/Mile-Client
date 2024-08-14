import axios from 'axios';

// const baseUrl = import.meta.env.VITE_BASE_URL;
const devBaseUrl = import.meta.env.VITE_DEV_BASE_URL;

export const client = axios.create({
  baseURL: `${devBaseUrl}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});
const accessToken = localStorage.getItem('accessToken');
export const authClient = axios.create({
  baseURL: `${devBaseUrl}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',

    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

authClient.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    // const originReq = err.config;
    if (err.response && err.response.status === 401) {
      if (err.response.data.status === 40102) {
        //refresh로직 완료되면 개선할 예정
        //현재는 만료된 토큰 지우고 로그인페이지로 이동
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
  },
);
