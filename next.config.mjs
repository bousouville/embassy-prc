/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /** Static export for GitHub Pages. */
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
