'use client'

import PageWrapper from './PageWrapper'

export default function Page02Photo() {
  return (
    <PageWrapper 
      pageNumber={2} 
      backgroundImage="/assets/portfolio/pages/page-02.png"
    >
      {/* Accessible text overlay */}
      <div className="absolute inset-0">
        <h2 className="sr-only">Photo - Miti Karia</h2>
      </div>
    </PageWrapper>
  )
}
