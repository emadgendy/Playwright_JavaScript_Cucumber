const { test: base } = require('playwright-bdd');

const test = base.extend({
  apiState: async ({}, use) => {
    await use({});
  },
  uiState: async ({}, use) => {
    await use({});
  },
});

module.exports = { test };
