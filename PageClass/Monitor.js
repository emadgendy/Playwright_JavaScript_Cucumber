const { expect } = require('@playwright/test');

class Monitor {
  constructor(page) {
    this.page = page;
  }

  async isMonitorDisplayed(data) {
    await this.page.getByRole('link', { name: 'Monitors' }).click();
    await expect(this.page.getByRole('link', { name: data.monitor1 })).toBeVisible();
    await expect(this.page.getByText(data.m1Price, { exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: data.monitor2 })).toBeVisible();
    await expect(this.page.getByText(data.m2Price, { exact: true })).toBeVisible();
  }
}

module.exports = Monitor;
