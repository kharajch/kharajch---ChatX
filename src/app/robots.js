export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://kharajch-chatx.vercel.app/sitemap.xml',
  }
}
