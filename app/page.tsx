'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import { 
  Page01Cover, 
  Page02Photo,
  Page03Toolkit,
  Page04BriefResume,
  Page05Contents,
  GenericPage 
} from '@/components/pages'

// Page metadata for SEO and accessibility - 21 pages total
const pageData = [
  { pageNumber: 1, title: 'Cover - Portfolio by Miti Karia', component: 'cover' },
  { pageNumber: 2, title: 'Photo - Miti Karia', component: 'photo' },
  { pageNumber: 3, title: 'Toolkit', component: 'toolkit' },
  { pageNumber: 4, title: 'Brief Resume', component: 'brief-resume' },
  { pageNumber: 5, title: 'Table of Contents', component: 'contents' },
  { pageNumber: 6, title: 'Social Campaign - Overview', component: 'generic' },
  { pageNumber: 7, title: 'Social Campaign - Design', component: 'generic' },
  { pageNumber: 8, title: 'Social Campaign - Results', component: 'generic' },
  { pageNumber: 9, title: 'Pitch Project - Overview', component: 'generic' },
  { pageNumber: 10, title: 'Pitch Project - Design', component: 'generic' },
  { pageNumber: 11, title: 'Pitch Project - Results', component: 'generic' },
  { pageNumber: 12, title: 'One Minute Briefs - Overview', component: 'generic' },
  { pageNumber: 13, title: 'One Minute Briefs - Research', component: 'generic' },
  { pageNumber: 14, title: 'One Minute Briefs - Design', component: 'generic' },
  { pageNumber: 15, title: 'One Minute Briefs - Results', component: 'generic' },
  { pageNumber: 16, title: 'Case Study - Overview', component: 'generic' },
  { pageNumber: 17, title: 'Case Study - Design', component: 'generic' },
  { pageNumber: 18, title: 'Case Study - Results', component: 'generic' },
  { pageNumber: 19, title: 'Additional Work', component: 'generic' },
  { pageNumber: 20, title: 'Additional Work - Continued', component: 'generic' },
  { pageNumber: 21, title: 'Contact & Thank You', component: 'generic' },
]

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(21)

  useEffect(() => {
    // Load metadata and initialize
    fetch('/assets/portfolio/metadata.json')
      .then(res => res.json())
      .then(data => {
        if (data.total_pages) {
          setTotalPages(data.total_pages)
        }
      })
      .catch(() => {
        console.log('Using default page configuration')
      })
      .finally(() => {
        // Smooth loading transition
        setTimeout(() => setIsLoading(false), 600)
      })
  }, [])

  // Generate pages based on configuration
  const generatePages = () => {
    const pages = []
    
    for (let i = 1; i <= totalPages; i++) {
      const pageInfo = pageData.find(p => p.pageNumber === i)
      
      switch (pageInfo?.component) {
        case 'cover':
          pages.push(<Page01Cover key={i} />)
          break
        case 'photo':
          pages.push(<Page02Photo key={i} />)
          break
        case 'toolkit':
          pages.push(<Page03Toolkit key={i} />)
          break
        case 'brief-resume':
          pages.push(<Page04BriefResume key={i} />)
          break
        case 'contents':
          pages.push(<Page05Contents key={i} />)
          break
        default:
          pages.push(
            <GenericPage 
              key={i} 
              pageNumber={i} 
              title={pageInfo?.title || `Page ${i}`}
            />
          )
      }
    }
    
    return pages
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen bg-portfolio-cream">
      <Navigation />
      
      {/* Portfolio Pages */}
      <div className="pt-16 md:pt-20">
        {generatePages()}
      </div>
      
      <Footer />
    </main>
  )
}
