/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export for GitHub Pages
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // Base path for GitHub Pages (repo name: miti-karia-portfolio)
  basePath: '/miti-karia-portfolio',
  trailingSlash: true,
  // Set environment variable for basePath
  env: {
    NEXT_PUBLIC_BASE_PATH: '/miti-karia-portfolio',
  },
}

export default nextConfig
