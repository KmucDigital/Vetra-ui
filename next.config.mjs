const runtimeInput = process.env.NEXT_RUNTIME_MODE
  ? process.env.NEXT_RUNTIME_MODE.trim().toLowerCase()
  : '';

const isDynamicMode = runtimeInput === ':dynamic' || runtimeInput === 'dynamic';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isDynamicMode ? 'standalone' : 'export',
  images: {
    unoptimized: !isDynamicMode,
  },
  trailingSlash: !isDynamicMode,
};

export default nextConfig;
