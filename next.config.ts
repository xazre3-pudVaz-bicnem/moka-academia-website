import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // このリポジトリ単体をルートとして扱う（親ディレクトリの lockfile を拾わせない）
  turbopack: { root: path.resolve(process.cwd()) },
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // 62=小さなサムネイル / 70=大きな背景 / 78=チラシなど文字が入る画像
    qualities: [62, 70, 78],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [96, 128, 200, 256, 320, 384],
  },
};

export default nextConfig;
