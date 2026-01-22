'use client'

import PageWrapper from './PageWrapper'

export default function Page04BriefResume() {
  return (
    <PageWrapper 
      pageNumber={4} 
      backgroundImage="/assets/portfolio/pages/page-04.png"
    >
      {/* Accessible text overlay */}
      <div className="absolute inset-0">
        <h2 className="sr-only">Brief Resume</h2>
      </div>
    </PageWrapper>
  )
}
