'use client'

import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

interface HeaderProps {
  currentView: 'bookshelf' | 'profile'
  onViewChange: (view: 'bookshelf' | 'profile') => void
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <motion.header
      className="relative z-40 border-b border-ember-600/20 bg-night-950/40 backdrop-blur-md sticky top-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ember-500 to-ember-700 flex items-center justify-center shadow-candlelight">
              <BookOpen className="w-5 h-5 text-night-950" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-ember-400">Soloura</h1>
              <p className="text-xs text-cream/50">Book Journal</p>
            </div>
          </motion.div>

          <nav className="flex items-center gap-2">
            {(['bookshelf', 'profile'] as const).map((view) => (
              <motion.button
                key={view}
                onClick={() => onViewChange(view)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  currentView === view
                    ? 'bg-ember-600/40 text-ember-300 border border-ember-600/60'
                    : 'text-cream/60 hover:text-cream/80 border border-transparent hover:border-ember-600/30'
                }`}
              >
                {view === 'bookshelf' ? '📚 Books' : '✨ Profile'}
              </motion.button>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
