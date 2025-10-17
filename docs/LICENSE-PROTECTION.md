# LICENSE Protection System

## Overview

Vetra UI implements a **multi-layered LICENSE protection system** to ensure the license file cannot be modified, removed, or bypassed during the build process. This system enforces license compliance at every stage of the development and deployment workflow.

## Protection Layers

### 1. **Hash-Based Integrity Check** ✅

The LICENSE file is protected by a SHA256 hash verification system:

- **Expected Hash**: `b447d04fdd449c09f990b0fc6a8a1b1cd3a6db61f96d3c0221c9acace0dc9b28`
- Any modification to the LICENSE file will result in a hash mismatch
- Build process **immediately terminates** if hash doesn't match

### 2. **Build-Time Enforcement** ✅

The license check runs at multiple stages:

```json
{
  "scripts": {
    "dev": "pnpm run check-license && next dev",
    "prebuild": "pnpm run check-license",
    "postinstall": "pnpm run check-license",
    "start": "pnpm run check-license && serve -s out"
  }
}
```

- **Before every build** (`prebuild`)
- **Before dev server starts** (`dev`)
- **After dependency installation** (`postinstall`)
- **Before production serving** (`start`)

### 3. **Next.js Config Enforcement** ✅

`next.config.mjs` runs the license check **synchronously** before any Next.js build:

```javascript
import { execSync } from 'child_process';

try {
  execSync('node scripts/check-license.js', { stdio: 'inherit' });
} catch (error) {
  console.error('BUILD BLOCKED: License check failed!');
  process.exit(1);
}
```

### 4. **Webpack Build Hook** ✅

Additional safeguard runs during webpack compilation:

```javascript
webpack: (config, { isServer }) => {
  if (isServer) {
    execSync('node scripts/check-license.js', { stdio: 'pipe' });
  }
  return config;
}
```

### 5. **Docker Build Verification** ✅

Dockerfile enforces license check during container builds:

```dockerfile
RUN echo "🔒 Verifying LICENSE integrity..." && \
    node scripts/check-license.js || \
    (echo "❌ LICENSE check failed - Docker build terminated" && exit 1)

RUN test -f LICENSE || (echo "❌ LICENSE file missing after build" && exit 1)
```

### 6. **Public License Page** ✅

The license is publicly accessible at `/license` route:
- Displays full license text
- Served from the actual LICENSE file at build time
- Embedded in production builds for transparency

## What Gets Checked

The `scripts/check-license.js` script verifies:

1. ✅ **File Exists**: LICENSE file must be present in project root
2. ✅ **Not Empty**: LICENSE file must contain content
3. ✅ **Hash Match**: SHA256 hash must match expected value exactly
4. ✅ **Required Terms**: Must contain all critical license terms:
   - `NON-COMMERCIAL PERSONAL USE LICENSE`
   - `Sebastian Lui`
   - `KMUC Digital`
   - `commercial purposes`
   - `https://kmuc.online`

## When License Check Runs

| Command | Check Triggered | Blocks Execution |
|---------|----------------|------------------|
| `pnpm install` | ✅ Yes (postinstall) | ✅ Yes |
| `pnpm dev` | ✅ Yes (pre-dev) | ✅ Yes |
| `pnpm build` | ✅✅✅ Triple (prebuild + config + webpack) | ✅ Yes |
| `pnpm start` | ✅ Yes (pre-start) | ✅ Yes |
| `docker build` | ✅ Yes (Dockerfile RUN) | ✅ Yes |

## Error Messages

### LICENSE Missing
```
❌ FATAL ERROR: LICENSE file missing in project root.
   The LICENSE file is required and cannot be removed.
   Build process terminated.
```

### LICENSE Modified
```
❌ FATAL ERROR: LICENSE file has been modified!
   Expected hash: b447d04fdd449c09f990b0fc6a8a1b1cd3a6db61f96d3c0221c9acace0dc9b28
   Current hash:  [different hash]

   The LICENSE file is protected and cannot be modified.
   Any changes to the license terms are strictly prohibited.
   Please restore the original LICENSE file.
   Build process terminated.
```

### LICENSE Corrupted
```
❌ FATAL ERROR: LICENSE file is corrupted or invalid.
   Missing required terms: [list of missing terms]
   Build process terminated.
```

## Manual License Check

To manually verify the LICENSE integrity:

```bash
pnpm run check-license
```

Expected output on success:
```
🔒 LICENSE INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ LICENSE file integrity verified
✅ Hash matches expected value
✅ All required terms present
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ LICENSE CHECK PASSED - Build can proceed
```

## Bypassing Protection (NOT POSSIBLE)

The following attempts will **fail**:

❌ Removing LICENSE file → Build fails immediately
❌ Modifying LICENSE content → Hash mismatch, build fails
❌ Deleting check script → next.config.mjs will fail to execute it
❌ Modifying next.config.mjs → Build still fails at prebuild hook
❌ Skipping prebuild → next.config.mjs runs check synchronously
❌ Using `--ignore-scripts` → next.config.mjs still enforces check
❌ Modifying hash in check script → Required terms check will fail

## License Compliance

This protection system ensures:

1. **Transparency**: License terms are always visible at `/license`
2. **Immutability**: License cannot be changed or removed
3. **Enforcement**: Every build verifies license integrity
4. **Traceability**: All builds include original license terms

## For Developers

If you need to work with this codebase:

1. ✅ **DO NOT** modify the LICENSE file
2. ✅ **DO NOT** remove the LICENSE file
3. ✅ **DO NOT** bypass license checks
4. ✅ **DO** respect the non-commercial license terms
5. ✅ **DO** contact https://kmuc.online for commercial licensing

## Technical Implementation

- **Script**: `scripts/check-license.js`
- **Hash Algorithm**: SHA256
- **Node.js**: Uses built-in `crypto` module
- **Exit Codes**: Non-zero exit code blocks build process
- **Multiple Hooks**: npm scripts, Next.js config, webpack, Docker

---

**License Hash**: `b447d04fdd449c09f990b0fc6a8a1b1cd3a6db61f96d3c0221c9acace0dc9b28`
**Last Updated**: 2025-01-17
