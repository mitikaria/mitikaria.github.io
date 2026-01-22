'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

interface TextOverlay {
  text: string
  x: number  // percentage from left
  y: number  // percentage from top
  width: number  // percentage
  fontSize: number  // in viewport width units
  fontFamily?: 'display' | 'sans' | 'mono'
  fontWeight?: number
  color?: string
  align?: 'left' | 'center' | 'right'
  lineHeight?: number
  letterSpacing?: number
  link?: string
}

interface PageRendererProps {
  pageNumber: number
  backgroundImage: string
  textOverlays?: TextOverlay[]
  children?: React.ReactNode
  className?: string
  id?: string
  priority?: boolean
}

export default function PageRenderer({
  pageNumber,
  backgroundImage,
  textOverlays = [],
  children,
  className = '',
  id,
  priority = false,
}: PageRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const getFontFamily = (family?: string) => {
    switch (family) {
      case 'display':
        return 'var(--font-display)'
      case 'mono':
        return 'var(--font-mono)'
      default:
        return 'var(--font-sans)'
    }
  }

  return (
    <motion.section
      ref={containerRef}
      id={id || `page-${pageNumber}`}
      className={`page-section ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="page-artboard shadow-2xl rounded-sm overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={`Portfolio page ${pageNumber}`}
            fill
            className="object-cover"
            priority={priority}
            quality={95}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>

        {/* Text Overlay Layer - for accessibility and selectability */}
        <div className="artboard-content">
          {textOverlays.map((overlay, index) => {
            const TextWrapper = overlay.link ? 'a' : 'span'
            const linkProps = overlay.link
              ? {
                  href: overlay.link,
                  target: overlay.link.startsWith('http') ? '_blank' : undefined,
                  rel: overlay.link.startsWith('http') ? 'noopener noreferrer' : undefined,
                }
              : {}

            return (
              <TextWrapper
                key={index}
                className={`text-layer ${overlay.link ? 'cursor-pointer hover:underline' : ''}`}
                style={{
                  left: `${overlay.x}%`,
                  top: `${overlay.y}%`,
                  width: `${overlay.width}%`,
                  fontSize: `${(overlay.fontSize / 100) * dimensions.width}px`,
                  fontFamily: getFontFamily(overlay.fontFamily),
                  fontWeight: overlay.fontWeight || 400,
                  color: overlay.color || 'transparent',
                  textAlign: overlay.align || 'left',
                  lineHeight: overlay.lineHeight || 1.4,
                  letterSpacing: overlay.letterSpacing ? `${overlay.letterSpacing}em` : undefined,
                }}
                {...linkProps}
              >
                {overlay.text}
              </TextWrapper>
            )
          })}
        </div>

        {/* Custom Content Overlay */}
        {children && <div className="artboard-content z-10">{children}</div>}
      </div>
    </motion.section>
  )
}

// Wrapper component for pages without extracted images (fallback)
export function PagePlaceholder({
  pageNumber,
  title,
  subtitle,
}: {
  pageNumber: number
  title: string
  subtitle?: string
}) {
  return (
    <section
      id={`page-${pageNumber}`}
      className="page-section bg-portfolio-light"
    >
      <div className="page-artboard bg-white shadow-2xl rounded-sm flex items-center justify-center">
        <div className="text-center p-8">
          <span className="text-caption text-portfolio-gray mb-4 block">
            Page {pageNumber}
          </span>
          <h2 className="text-display text-4xl md:text-5xl text-portfolio-dark mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-body text-portfolio-gray max-w-md mx-auto">
              {subtitle}
            </p>
          )}
          <div className="mt-8 text-sm text-portfolio-gray/60">
            Run extraction script to load page image
          </div>
        </div>
      </div>
    </section>
  )
}
