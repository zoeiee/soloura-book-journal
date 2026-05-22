'use client'

import { motion } from 'framer-motion'

export function AmbientBackground() {
  return (
    <>
      <motion.div
        className="fixed top-0 right-0 w-96 h-96 rounded-full opacity-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(244, 179, 102, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 w-80 h-80 rounded-full opacity-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(244, 179, 102, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1.2, 0.8, 1.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </>
  )
}
