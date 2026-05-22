import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Soloura - Book Journal',
  description: 'A cozy book journal app with notes and quotes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-night-950 text-cream min-h-screen">
        {children}
      </body>
    </html>
  )
}
