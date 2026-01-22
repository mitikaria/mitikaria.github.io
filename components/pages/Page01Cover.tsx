'use client'

import { motion } from 'framer-motion'
import PageWrapper from './PageWrapper'

export default function Page01Cover() {
  return (
    <PageWrapper 
      pageNumber={1} 
      backgroundImage="/assets/portfolio/pages/page-01.png"
      priority={true}
    >
      {/* Accessible text overlay - invisible but selectable */}
      <div className="absolute inset-0 flex flex-col p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Screen reader content */}
          <h1 className="sr-only">Portfolio by Miti Karia</h1>
          
          {/* Interactive email link - positioned to match PDF */}
          <a 
            href="mailto:MITIKARIA1999@GMAIL.COM" 
            className="absolute opacity-0 hover:opacity-10 hover:bg-portfolio-accent/20 rounded transition-opacity"
            style={{ 
              left: '8%', 
              top: '8%', 
              width: '24%', 
              height: '5%' 
            }}
            aria-label="Email: mitikaria1999@gmail.com"
          >
            MITIKARIA1999@GMAIL.COM
          </a>
          
          {/* LinkedIn link */}
          <a 
            href="https://linkedin.com/in/mitikaria" 
            target="_blank"
            rel="noopener noreferrer"
            className="absolute opacity-0 hover:opacity-10 hover:bg-portfolio-accent/20 rounded transition-opacity"
            style={{ 
              left: '8%', 
              top: '15%', 
              width: '10%', 
              height: '5%' 
            }}
            aria-label="LinkedIn profile"
          >
            LINKEDIN
          </a>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
