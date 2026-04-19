import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: "kharajch---ChatX | AI-Powered Chat Experience",
  description: "A modern AI chat application powered by OpenRouter. Ask questions, get intelligent answers with real-time thinking visualization.",
  keywords: ["AI", "chat", "OpenRouter", "LLM", "kharajch", "ChatX"],
  authors: [{ name: "kharajch" }],
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
