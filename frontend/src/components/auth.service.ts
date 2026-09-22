import axios, { AxiosResponse } from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL ?? '';

export const login = (
  username: string,
  password: string,
  csrfToken: string
): Promise<AxiosResponse<any>> => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('_csrf', csrfToken);

  return axios.post(`${API_BASE}/login`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true,
  });
};

export const fetchCsrfToken = (): Promise<string> => {
  return axios
    .get(`${API_BASE}/csrf`, { withCredentials: true })
    .then(res => res.data.token);
};