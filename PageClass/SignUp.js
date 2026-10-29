const { expect } = require('@playwright/test');

class SignUp {
  constructor(page) {
    this.page = page;
  }

  async clickSignUp() {
    await this.page.getByRole('link', { name: 'Sign up' }).click();
    const modal = this.page.locator('#signInModal');
    await expect(modal).toBeVisible();
    await modal.evaluate(async (element) => {
      await Promise.all(element.getAnimations({ subtree: true }).map((animation) => animation.finished));
    });
  }

  async submit(username, password) {
    if (username !== undefined) await this.page.locator('#sign-username').fill(username);
    if (password !== undefined) await this.page.locator('#sign-password').fill(password);
    let resolveDialogMessage;
    const dialogMessagePromise = new Promise((resolve) => {
      resolveDialogMessage = resolve;
    });
    this.page.once('dialog', async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      resolveDialogMessage(message);
    });
    await this.page.locator('#signInModal button').getByText('Sign up', { exact: true }).click();
    return dialogMessagePromise;
  }
}

module.exports = SignUp;
