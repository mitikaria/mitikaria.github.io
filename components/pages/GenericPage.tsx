'use client'

import PageWrapper from './PageWrapper'

interface GenericPageProps {
  pageNumber: number
  title?: string
  altText?: string
}

export default function GenericPage({ 
  pageNumber, 
  title,
  altText 
}: GenericPageProps) {
  const imagePath = `/assets/portfolio/pages/page-${String(pageNumber).padStart(2, '0')}.png`
  
  return (
    <PageWrapper 
      pageNumber={pageNumber} 
      backgroundImage={imagePath}
      priority={pageNumber <= 3}
    >
      {/* Accessible content */}
      <div className="absolute inset-0">
        {title && <h2 className="sr-only">{title}</h2>}
        {altText && <p className="sr-only">{altText}</p>}
      </div>
    </PageWrapper>
  )
}
