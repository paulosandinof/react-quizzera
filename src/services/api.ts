import axios from 'axios';

export const quiz_api = axios.create({
  baseURL: 'https://opentdb.com/api.php',
});

export const users_api = axios.create({
  baseURL: 'http://localhost:3333',
});
