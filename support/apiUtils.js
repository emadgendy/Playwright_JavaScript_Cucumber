const apiConfig = require('../fixtures/api-config.json');

const apiBaseUrl = process.env.API_BASE_URL || apiConfig.baseUrl;
const apiTimeout = 60000;

async function login(request, email, password) {
  return request.post(`${apiBaseUrl}${apiConfig.endpoints.login}`, {
    data: { email, password },
    timeout: apiTimeout,
  });
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}` };
}

async function apiRequest(request, method, endpoint, token, options = {}) {
  return request.fetch(`${apiBaseUrl}${endpoint}`, {
    method,
    timeout: apiTimeout,
    ...options,
    headers: token
      ? { ...authHeaders(token), ...options.headers }
      : options.headers,
  });
}

module.exports = { apiBaseUrl, apiTimeout, login, apiRequest };
