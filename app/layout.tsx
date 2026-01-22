import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Miti Karia | Portfolio',
  description: 'Product Designer & Visual Storyteller - Portfolio showcasing UX/UI design, branding, and creative projects.',
  keywords: ['portfolio', 'design', 'UX', 'UI', 'product design', 'Miti Karia'],
  authors: [{ name: 'Miti Karia' }],
  openGraph: {
    title: 'Miti Karia | Portfolio',
    description: 'Product Designer & Visual Storyteller',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5F2EB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-portfolio-cream text-portfolio-dark antialiased">
        {children}
      </body>
    </html>
  )
}
