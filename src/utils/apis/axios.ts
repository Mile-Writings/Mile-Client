import axios from 'axios';

const baseUrl = import.meta.env.VITE_DEV_URL;

export const client = axios.create({
  baseURL: `${baseUrl}`,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

// export const authClient = axios.create({
//   baseURL: `${baseUrl}`,
//   headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
// });
