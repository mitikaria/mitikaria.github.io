'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronUp } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  pageNumber: number
  endPageNumber?: number // For sections that span multiple pages
}

// Navigation items based on updated portfolio structure
const navItems: NavItem[] = [
  { id: 'cover', label: 'Cover', pageNumber: 1 },
  { id: 'about', label: 'About', pageNumber: 2, endPageNumber: 4 }, // Photo, Toolkit, Brief Resume
  { id: 'contents', label: 'Contents', pageNumber: 5 },
  { id: 'social-campaign', label: 'Social Campaign', pageNumber: 6, endPageNumber: 8 }, // All pages up until Pitch Project
  { id: 'pitch-pro', label: 'Pitch Project', pageNumber: 11, endPageNumber: 11 },
  { id: 'one-minute-briefs', label: 'One Minute Briefs', pageNumber: 15, endPageNumber: 15 },
  { id: 'case-study', label: 'Case Study', pageNumber: 18, endPageNumber: 18 },
  { id: 'contact', label: 'Contact', pageNumber: 21 },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('cover')
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)

      // Find current section based on scroll position
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i]
        const element = document.getElementById(`page-${item.pageNumber}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (pageNumber: number) => {
    const element = document.getElementById(`page-${pageNumber}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    setIsOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Main Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-portfolio-cream/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#page-1"
              className="text-display text-xl md:text-2xl font-semibold text-portfolio-dark"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(1)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Miti Karia
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.pageNumber)}
                  className={`nav-link ${
                    activeSection === item.id
                      ? 'text-portfolio-dark active'
                      : 'text-portfolio-gray hover:text-portfolio-dark'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-portfolio-dark"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-portfolio-cream/98 backdrop-blur-lg border-t border-portfolio-dark/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.pageNumber)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-portfolio-dark text-white'
                        : 'text-portfolio-dark hover:bg-portfolio-dark/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-caption text-xs opacity-50 block mb-1">
                      Page {item.pageNumber}
                      {item.endPageNumber && ` - ${item.endPageNumber}`}
                    </span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 z-50 p-3 bg-portfolio-dark text-white rounded-full shadow-lg hover:bg-portfolio-accent transition-colors"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Page Progress Indicator */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-center space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.pageNumber)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-portfolio-accent w-3 h-3'
                  : 'bg-portfolio-dark/20 hover:bg-portfolio-dark/40'
              }`}
              aria-label={`Go to ${item.label}`}
              title={item.label}
            />
          ))}
        </div>
      </div>
    </>
  )
}
