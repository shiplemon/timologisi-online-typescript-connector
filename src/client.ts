import axios from 'axios';

const API_SANDBOX = 'https://api.timologisi.online/SandBox/RestAPI.dll';
const API_LIVE = 'https://api.timologisi.online/Production/RestAPI.dll';

export function getClient(sandbox: boolean, apiKey: string) {
  const instance = axios.create({
    baseURL: sandbox ? API_SANDBOX : API_LIVE,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'API-KEY': apiKey,
    },
    validateStatus: (status) => status >= 200,
  });

  instance.interceptors.response.use(
    ({ status, data }) => {
      return Promise.resolve(data);
    },
    (e) => Promise.reject(e),
  );

  return instance;
}
