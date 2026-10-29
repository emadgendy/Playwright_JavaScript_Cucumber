const { expect } = require('@playwright/test');

class Login {
  constructor(page) {
    this.page = page;
  }

  async clickLogin() {
    await this.page.getByRole('link', { name: 'Log in' }).click();
    await expect(this.page.locator('#logInModal')).toBeVisible();
  }

  async login(username, password) {
    await this.page.locator('#loginusername').fill(username);
    await this.page.locator('#loginpassword').fill(password);
    await this.page.locator('#logInModal button').getByText('Log in', { exact: true }).click();
  }

  async verifyLoginSuccessMsg(successMsg) {
    await expect(this.page.getByRole('link', { name: successMsg })).toBeVisible();
  }
}

module.exports = Login;
