'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-portfolio-dark text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display text-3xl md:text-4xl mb-6">
            Let's Connect
          </h2>
          <p className="text-white/70 text-body mb-8 max-w-md mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <div className="flex items-center justify-center gap-6 mb-12">
            <a
              href="mailto:mitikaria1999@gmail.com"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-portfolio-accent rounded-full transition-colors group"
            >
              <Mail size={18} />
              <span>Email</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://linkedin.com/in/mitikaria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-portfolio-accent rounded-full transition-colors group"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm">
              © {currentYear} Miti Karia. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
