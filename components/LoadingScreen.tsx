'use client'

import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-portfolio-cream flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-portfolio-dark/20 border-t-portfolio-accent rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <h1 className="text-display text-2xl text-portfolio-dark mb-2">
          Miti Karia
        </h1>
        <p className="text-body text-portfolio-gray text-sm">
          Loading portfolio...
        </p>
      </motion.div>
    </div>
  )
}
