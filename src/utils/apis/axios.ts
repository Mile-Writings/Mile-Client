import axios from 'axios';

export const client = axios.create({
  baseURL: 'temporary URL',
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});
