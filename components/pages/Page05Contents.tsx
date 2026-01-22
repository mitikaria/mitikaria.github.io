'use client'

import PageWrapper from './PageWrapper'

interface ContentItem {
  title: string
  pageNumber: number
  top: number
}

const contentItems: ContentItem[] = [
  { title: 'Social Campaign', pageNumber: 6, top: 30 },
  { title: 'Pitch Project', pageNumber: 11, top: 40 },
  { title: 'One Minute Briefs', pageNumber: 12, top: 50 },
  { title: 'Case Study', pageNumber: 16, top: 60 },
  { title: 'Contact', pageNumber: 21, top: 70 },
]

export default function Page05Contents() {
  const scrollToPage = (pageNumber: number) => {
    const element = document.getElementById(`page-${pageNumber}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <PageWrapper 
      pageNumber={5} 
      backgroundImage="/assets/portfolio/pages/page-05.png"
    >
      {/* Interactive content links */}
      <div className="absolute inset-0">
        <h2 className="sr-only">Table of Contents</h2>
        {contentItems.map((item) => (
          <button
            key={item.pageNumber}
            onClick={() => scrollToPage(item.pageNumber)}
            className="absolute opacity-0 hover:opacity-10 hover:bg-portfolio-accent/20 transition-opacity cursor-pointer"
            style={{
              left: '10%',
              top: `${item.top}%`,
              width: '80%',
              height: '8%',
            }}
            aria-label={`Go to ${item.title}`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </PageWrapper>
  )
}
