import type { MetadataRoute } from 'next';
import { school } from '@/data/school';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: school.fullName,
    short_name: school.shortName,
    description:
      '栃木県真岡市の健康麻雀教室。飲まない・吸わない・賭けない健康麻雀を初心者から学べます。',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbf7ec',
    theme_color: '#2c6b33',
    lang: 'ja',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
