import { execSync } from 'child_process';

// CRITICAL: License integrity check MUST pass before any build
// This prevents building if the LICENSE file has been modified or removed
try {
  console.log('\n⚠️  Running mandatory LICENSE integrity check...');
  execSync('node scripts/check-license.js', { stdio: 'inherit' });
} catch (error) {
  console.error('\n❌ BUILD BLOCKED: License check failed!');
  console.error('   The LICENSE file must be present and unmodified.');
  console.error('   Build cannot proceed.\n');
  process.exit(1);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  // Enforce license check in webpack build process as additional safeguard
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Double-check license on server build
      try {
        execSync('node scripts/check-license.js', { stdio: 'pipe' });
      } catch (error) {
        throw new Error('LICENSE integrity check failed during webpack build');
      }
    }
    return config;
  },
};

export default nextConfig;
