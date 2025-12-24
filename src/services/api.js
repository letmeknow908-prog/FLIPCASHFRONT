import axios from 'axios';
const API_URL = 'https://flipcash-production.up.railway.app/api/v1';
const api = axios.create({ baseURL: API_URL, timeout: 30000 });
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  res => res.data,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
export const apiService = {
  register: d => api.post('/auth/register', d),
  login: d => api.post('/auth/login', d),
  getWallets: () => api.get('/wallets'),
  getRates: () => api.get('/rates'),
  getTransactions: p => api.get('/transactions', { params: p }),
  swap: d => api.post('/transactions/swap', d),
  withdraw: d => api.post('/transactions/withdraw', d),
};
export default api;
