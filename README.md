# Playwright Automation Framework

This project uses [Playwright Test](https://playwright.dev/docs/intro) with [Gherkin](https://cucumber.io/docs/gherkin/) scenarios powered by `playwright-bdd`. API scenarios are under `playwright/e2e/apiTest/` and use step definitions in `playwright/stepDefinitions/api.steps.js`.

## Setup

Install the Node.js dependencies and Chromium browser:

```bash
npm install
npx playwright install chromium
```

On Linux CI images that do not already have the browser system libraries, use:

```bash
npx playwright install --with-deps chromium
```

## Run tests

```bash
npm test          # all Playwright tests
npm run uitest    # browser UI tests
npm run apitest   # API tests
```
## Run in headed mode
npm run uitest -- --headed
```
## To run specific scenario
npm run uitest -- --grep "Purchase a product"
npm run apitest -- --grep "Login with valid credentials"
```
## Run using tag
npm test -- --grep @ui
npm test -- --grep @api

The test scripts generate Playwright specs from the `.feature` files before running them.

Playwright's HTML report is written to `playwright-report/`; failure screenshots and traces are written to `test-results/`.

## Configuration

- `UI_BASE_URL` overrides the default UI URL (`https://www.demoblaze.com/`).
- `API_BASE_URL` overrides the API base URL configured in `tests/fixtures/api-config.json`.
- API checks use the test credentials and revoked token from `fixtures/loginuser.json` by default. Set `API_EMAIL`, `API_PASSWORD`, or `API_REVOKED_TOKEN` to override them.

Gherkin features use `.feature` files. API scenarios run with `npm run apitest`; generated Playwright specs are written to `.features-gen/`.
