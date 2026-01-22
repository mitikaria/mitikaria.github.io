'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

interface PageWrapperProps {
  pageNumber: number
  backgroundImage?: string
  backgroundColor?: string
  children?: React.ReactNode
  className?: string
  priority?: boolean
}

export default function PageWrapper({
  pageNumber,
  backgroundImage,
  backgroundColor = '#F5F2EB',
  children,
  className = '',
  priority = false,
}: PageWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-5%' })

  return (
    <motion.section
      ref={containerRef}
      id={`page-${pageNumber}`}
      className={`page-section ${className}`}
      style={{ backgroundColor }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-artboard shadow-2xl rounded-sm overflow-hidden relative">
        {/* Background Image Layer */}
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
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
        )}

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </motion.section>
  )
}
