/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // ❌ Nonaktifkan ini agar API route bisa jalan
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
