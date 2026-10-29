const { expect } = require('@playwright/test');
const { createBdd } = require('playwright-bdd');
const { test } = require('../../support/bddTest.steps');
const AddProduct = require('../../PageClass/AddProduct');
const Login = require('../../PageClass/Login');
const Monitor = require('../../PageClass/Monitor');
const SignUp = require('../../PageClass/SignUp');
const productData = require('../../fixtures/product.json');
const loginData = require('../../fixtures/Testdata.json');
const monitorData = require('../../fixtures/monitor.json');

const { Given, When, Then } = createBdd(test);

Given('I open the store home page', async ({ page }) => {
  await page.goto('/');
});

When('I log in with the configured account', async ({ page }) => {
  const login = new Login(page);
  await login.clickLogin();
  await login.login(loginData.UserName, loginData.UserPassword);
});

Then('I should see the configured logged-in user', async ({ page }) => {
  await new Login(page).verifyLoginSuccessMsg(loginData.loginmsg);
});

When('I log in with the configured monitor account', async ({ page }) => {
  const login = new Login(page);
  await login.clickLogin();
  await login.login(monitorData.UserName, monitorData.UserPassword);
});

Then('the configured monitor names and prices should be displayed', async ({ page }) => {
  await new Login(page).verifyLoginSuccessMsg(monitorData.loginmsg);
  await new Monitor(page).isMonitorDisplayed(monitorData);
});

When('I create a fresh account and log in for the product purchase', async ({ page, uiState }) => {
  uiState.username = `Playwright${Date.now()}`;
  const signup = new SignUp(page);
  await signup.clickSignUp();
  uiState.signupMessage = await signup.submit(uiState.username, productData.UserPassword);
  expect(uiState.signupMessage).toBe('Sign up successful.');

  const login = new Login(page);
  await login.clickLogin();
  await login.login(uiState.username, productData.UserPassword);
});

Then('I should see the configured product account logged in', async ({ page, uiState }) => {
  await new Login(page).verifyLoginSuccessMsg(`Welcome ${uiState.username}`);
});

When('I add the configured product to the cart', async ({ page }) => {
  await new AddProduct(page).addProduct(productData);
});

Then('I complete the configured purchase', async ({ page }) => {
  await new AddProduct(page).completePurchase(productData);
});

Then('I should be logged out', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
});

When('I sign up with a new account', async ({ page, uiState }) => {
  const signup = new SignUp(page);
  await signup.clickSignUp();
  uiState.message = await signup.submit(`${loginData.UserName}${Date.now()}`, loginData.UserPassword);
});

When('I sign up with the existing account', async ({ page, uiState }) => {
  const signup = new SignUp(page);
  await signup.clickSignUp();
  uiState.message = await signup.submit(loginData.UserName, loginData.UserPassword);
});

When('I submit the empty sign-up form', async ({ page, uiState }) => {
  const signup = new SignUp(page);
  await signup.clickSignUp();
  uiState.message = await signup.submit();
});

Then('the sign-up message should be {string}', async ({ uiState }, message) => {
  expect(uiState.message).toContain(message);
});
