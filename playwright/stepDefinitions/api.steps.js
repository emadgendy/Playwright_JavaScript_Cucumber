const { expect } = require('@playwright/test');
const { createBdd } = require('playwright-bdd');
const { test } = require('../../support/bddTest.steps');
const apiConfig = require('../../fixtures/api-config.json');
const testCredentials = require('../../fixtures/loginuser.json');
const { login, apiRequest } = require('../../support/apiUtils');
const apiEmail = process.env.API_EMAIL || testCredentials.email;
const apiPassword = process.env.API_PASSWORD || testCredentials.password;
const revokedToken = process.env.API_REVOKED_TOKEN || testCredentials.revokedtoken;

const { Given, When, Then } = createBdd(test);

Given('valid API credentials are configured', async () => {
  expect(apiEmail).toBeTruthy();
  expect(apiPassword).toBeTruthy();
});

When('I submit the API login request', async ({ request, apiState }) => {
  apiState.response = await login(request, apiEmail, apiPassword);
  apiState.body = await apiState.response.json();
});

Then('the API login response should contain an access token', async ({ apiState }) => {
  expect(apiState.response.status()).toBe(200);
  expect(apiState.body.access_token).toBeTruthy();
});

When('I submit the API login request with invalid credentials', async ({ request, apiState }) => {
  apiState.response = await login(request, 'invalid@example.invalid', 'invalid-password');
  apiState.body = await apiState.response.json();
});

Then('the API login response should be rejected with message {string}', async ({ apiState }, message) => {
  expect(apiState.response.status()).toBe(401);
  expect(apiState.body.message).toBe(message);
});

Given('I have authenticated with the API', async ({ request, apiState }) => {
  const response = await login(request, apiEmail, apiPassword);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.access_token).toBeTruthy();
  apiState.token = body.access_token;
});

When('I request the product list with authorization', async ({ request, apiState }) => {
  apiState.response = await apiRequest(
    request,
    'GET',
    apiConfig.endpoints.products,
    apiState.token,
  );
  apiState.body = await apiState.response.json();
});

Then('the product response should contain a list of products', async ({ apiState }) => {
  expect(apiState.response.status()).toBe(200);
  const products = Array.isArray(apiState.body) ? apiState.body : apiState.body.products;
  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);
  expect(products[0]).toEqual(expect.any(Object));
  expect(Object.keys(products[0]).length).toBeGreaterThan(0);
});

When('I request the product list without authorization', async ({ request, apiState }) => {
  apiState.response = await apiRequest(request, 'GET', apiConfig.endpoints.products, null);
  apiState.body = await apiState.response.json();
});

Given('a revoked API token is configured', async () => {
  expect(revokedToken).toBeTruthy();
});

When('I request the product list with the revoked token', async ({ request, apiState }) => {
  apiState.response = await apiRequest(
    request,
    'GET',
    apiConfig.endpoints.products,
    revokedToken,
  );
  apiState.body = await apiState.response.json();
});

Then('the product request should be rejected with message {string}', async ({ apiState }, message) => {
  expect(apiState.response.status()).toBe(401);
  expect(apiState.body.message).toBe(message);
});
