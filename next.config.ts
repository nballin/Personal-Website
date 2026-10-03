import type { NextConfig } from 'next';

// Old static-site URLs → new routes, so existing links (LinkedIn, resume, etc.) keep working.
const legacyProjects = [
  'ai-finance-tracker',
  'bookbuds',
  'csv-converter',
  'fixmyresume',
  'graphmind',
  'lediq',
  'onlyus',
  'portfolio-website',
  'self-watering-flower-pot',
  'storyos',
  'tiny-recursive-models',
];

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory otherwise confuses root detection.
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about', destination: '/stack', permanent: true },
      { source: '/research-blog.html', destination: '/research', permanent: true },
      { source: '/ResumeApril.pdf', destination: '/media/resume.pdf', permanent: true },
      ...legacyProjects.map((slug) => ({
        source: `/project-${slug}.html`,
        destination: `/projects/${slug}`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
