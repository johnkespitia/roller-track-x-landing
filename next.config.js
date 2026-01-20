/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // Requerido para exportación estática en GitHub Pages
  },
  // Deshabilitar trailingSlash puede causar problemas en GitHub Pages
  trailingSlash: false,
}

module.exports = nextConfig
