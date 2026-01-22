'use client'

import PageWrapper from './PageWrapper'

export default function Page03Toolkit() {
  return (
    <PageWrapper 
      pageNumber={3} 
      backgroundImage="/assets/portfolio/pages/page-03.png"
    >
      {/* Accessible text overlay */}
      <div className="absolute inset-0">
        <h2 className="sr-only">Toolkit</h2>
      </div>
    </PageWrapper>
  )
}
