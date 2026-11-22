import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarang-ai.com';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/audit'],
      disallow: ['/admin', '/admin/*', '/api/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
