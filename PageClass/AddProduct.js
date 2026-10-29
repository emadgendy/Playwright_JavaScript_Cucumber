const { expect } = require('@playwright/test');

class AddProduct {
  constructor(page) {
    this.page = page;
  }

  async addProduct(data) {
    await this.page.getByRole('link', { name: 'Phones' }).click();
    await this.page.getByRole('link', { name: data.product, exact: true }).click();
    await expect(this.page.locator('#tbodyid h3')).toContainText(data.Price);
    let resolveDialogMessage;
    const dialogMessagePromise = new Promise((resolve) => {
      resolveDialogMessage = resolve;
    });
    this.page.once('dialog', async (dialog) => {
      const dialogMessage = dialog.message();
      await dialog.accept();
      resolveDialogMessage(dialogMessage);
    });
    await this.page.getByRole('link', { name: 'Add to cart' }).click();
    const dialogMessage = await dialogMessagePromise;
    expect(dialogMessage).toBe(data.expectedMsg1);
    await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
    const expectedTotal = data.Price.replace(/[^\d]/g, '');
    await expect(this.page.locator('#totalp')).toHaveText(expectedTotal);
    await this.page.getByRole('button', { name: 'Place Order' }).click();
  }

  async completePurchase(data) {
    for (const [field, value] of Object.entries({
      name: data.name,
      country: data.Country,
      city: data.City,
      card: data.Creditcard,
      month: data.Month,
      year: data.Year,
    })) {
      await this.page.locator(`#${field}`).fill(value);
    }

    await this.page.getByRole('button', { name: 'Purchase' }).click();
    await expect(this.page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();
    await this.page.getByRole('button', { name: 'OK' }).click();
    const orderModal = this.page.locator('#orderModal');
    if (await orderModal.isVisible()) {
      await orderModal.getByRole('button', { name: 'Close', exact: true }).last().click();
      await expect(orderModal).toBeHidden();
    }
    await this.page.getByRole('link', { name: 'Log out' }).click();
    await expect(this.page.getByRole('link', { name: 'Log in' })).toBeVisible();
  }
}

module.exports = AddProduct;
