const fs = require('node:fs/promises');
const path = require('node:path');

async function log(category, message) {
  const allowedCategories = new Set(['application', 'performance', 'apitest']);
  if (!allowedCategories.has(category)) {
    throw new TypeError(`Unsupported log category: ${category}`);
  }
  const logDirectory = path.resolve(__dirname, '..', '..', 'logs');
  await fs.mkdir(logDirectory, { recursive: true });
  const line = `[${new Date().toISOString()}] ${message}\n`;
  await fs.appendFile(path.join(logDirectory, `${category}.log`), line, 'utf8');
}

module.exports = { log };
