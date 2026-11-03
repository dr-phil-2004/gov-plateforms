/** @type {import('next').NextConfig} */
const nextConfig = {
  // 138 pages statiques : sans plafond, Next lance un worker par cœur et sature une machine à 4 Go de RAM.
  experimental: { cpus: 2, staticGenerationMaxConcurrency: 2 },
};

export default nextConfig;
