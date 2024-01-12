import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const client = axios.create({
  baseURL: `${baseUrl}`,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});
