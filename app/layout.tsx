import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Lora } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: "Aditi's Soloura - A Book Sanctuary",
  description: 'A cozy, atmospheric book tracking and journaling experience. Track, reflect, and celebrate your reading journey.',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90" font-family="Georgia" fill="%23f4b366">📖</text></svg>',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${lora.variable} bg-night-950 text-cream antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
