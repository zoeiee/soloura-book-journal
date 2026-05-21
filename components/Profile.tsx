'use client'

import { motion } from 'framer-motion'
import { BookOpen, Star, Flame, Clock } from 'lucide-react'
import { useBookStore } from '@/lib/store'

export function Profile() {
  const books = useBookStore((state) => state.books)

  const stats = {
    total: books.length,
    completed: books.filter((b) => b.status === 'completed').length,
    reading: books.filter((b) => b.status === 'reading').length,
    wantToRead: books.filter((b) => b.status === 'want-to-read').length,
    averageRating:
      books.filter((b) => b.rating).length > 0
        ? (
            books
              .filter((b) => b.rating)
              .reduce((sum, b) => sum + (b.rating || 0), 0) /
            books.filter((b) => b.rating).length
          ).toFixed(1)
        : 'N/A',
  }

  const recentBooks = books.slice(0, 5)
  const topRatedBooks = books
    .filter((b) => b.rating)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-ember-500 to-ember-700 flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-night-950" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
            Aditi's Soloura
          </h1>
          <p className="text-ember-300/60 font-light tracking-widest uppercase text-sm mb-6">
            nir (aurenya)
          </p>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg leading-relaxed">
            A sanctuary for book lovers. Where every page turned is a moment cherished, and
            every reflection becomes a memory.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {[
            {
              label: 'Total Books',
              value: stats.total,
              icon: BookOpen,
              color: 'from-ember-500 to-ember-600',
            },
            {
              label: 'Completed',
              value: stats.completed,
              icon: Star,
              color: 'from-amber-500 to-amber-600',
            },
            {
              label: 'Currently Reading',
              value: stats.reading,
              icon: Flame,
              color: 'from-orange-500 to-orange-600',
            },
            {
              label: 'Want to Read',
              value: stats.wantToRead,
              icon: Clock,
              color: 'from-purple-500 to-purple-600',
            },
          ].map(({ label, value, icon: Icon, color }, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="p-6 rounded-xl border border-ember-600/20 bg-night-900/60 hover:border-ember-600/50 transition-all"
              whileHover={{ y: -4 }}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-cream/60 text-sm font-semibold mb-1">{label}</p>
              <p className="text-3xl font-bold text-cream">{value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Rating Stats */}
        {stats.averageRating !== 'N/A' && (
          <motion.div
            className="mb-12 p-6 rounded-xl border border-ember-600/20 bg-night-900/60"
            variants={item}
            initial="hidden"
            animate="show"
          >
            <h3 className="text-xl font-serif font-bold text-cream mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              Average Rating
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-amber-300">{stats.averageRating}</div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(parseFloat(stats.averageRating as string))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-night-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Books */}
        {recentBooks.length > 0 && (
          <motion.div
            className="mb-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-2xl font-serif font-bold text-cream mb-4">
              📚 Recently Added
            </h2>
            <div className="space-y-2">
              {recentBooks.map((book, idx) => (
                <motion.div
                  key={book.id}
                  variants={item}
                  className="p-4 rounded-lg border border-ember-600/20 bg-night-900/40 hover:border-ember-600/50 transition-all"
                >
                  <p className="font-semibold text-cream">{book.title}</p>
                  <p className="text-sm text-ember-300/70">{book.author}</p>
                  <p className="text-xs text-cream/40 mt-1">
                    Added {new Date(book.dateAdded).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Top Rated Books */}
        {topRatedBooks.length > 0 && (
          <motion.div
            className="mb-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h2 className="text-2xl font-serif font-bold text-cream mb-4">
              ⭐ Top Rated
            </h2>
            <div className="space-y-2">
              {topRatedBooks.map((book, idx) => (
                <motion.div
                  key={book.id}
                  variants={item}
                  className="p-4 rounded-lg border border-ember-600/20 bg-night-900/40 hover:border-ember-600/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-cream">{book.title}</p>
                      <p className="text-sm text-ember-300/70">{book.author}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (book.rating || 0)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-night-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* About Section */}
        <motion.div
          className="mt-16 p-8 rounded-xl border border-ember-600/30 bg-night-900/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-serif font-bold text-cream mb-4">About This Space</h3>
          <p className="text-cream/70 leading-relaxed">
            Aditi's Soloura is a personal sanctuary for tracking and reflecting on books. Like
            Letterboxd for literature, it celebrates the intimate journey of reading—capturing
            not just what we've read, but how it made us feel. Every thought, every cherished
            quote, and every rating is a testament to the transformative power of words.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
