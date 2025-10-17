const fs = require('fs');
const path = require('path');

const licensePath = path.join(process.cwd(), 'LICENSE');

try {
  if (!fs.existsSync(licensePath)) {
    console.error('ERROR: LICENSE file missing in project root. Please add a LICENSE file.');
    process.exit(1);
  }

  const content = fs.readFileSync(licensePath, 'utf8');
  if (content.trim().length === 0) {
    console.error('ERROR: LICENSE file is empty. Please add license text.');
    process.exit(1);
  }

  // Basic sanity checks for visibility text
  if (!/copyright/i.test(content) || !/permission/i.test(content)) {
    console.warn('WARNING: LICENSE file may be malformed or missing typical sections.');
  }

  console.log('OK: LICENSE file found and appears non-empty.');
  process.exit(0);
} catch (err) {
  console.error('ERROR: Unexpected error while validating LICENSE:', err);
  process.exit(1);
}
