import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL('https://kharajch-chatx.vercel.app'),
  title: "kharajch---ChatX | AI-Powered Chat Experience",
  description: "A modern AI chat application powered by NVIDIA NIM. Ask questions, get intelligent answers with real-time thinking visualization --- Created by Kharaj Chakraborty (@kharajch)",
  keywords: ["AI", "chat", "NVIDIA NIM", "LLM", "kharajch", "ChatX", "Thinking Scratchpad", "Kharaj Chakraborty"],
  authors: [{ name: "kharajch" }],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: "kharajch---ChatX | AI-Powered Chat Experience",
    description: "A premium AI chat interface with real-time thinking visualization.",
    url: 'https://kharajch-chatx.vercel.app',
    siteName: 'ChatX',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
