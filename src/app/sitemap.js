export default function sitemap() {
  const baseUrl = 'https://kharajch-chatx.vercel.app'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
