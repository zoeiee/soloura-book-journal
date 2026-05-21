'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { BookCard } from './BookCard'
import { Book, useBookStore } from '@/lib/store'

interface BookshelfProps {
  onOpenBook: (book: Book) => void
  onOpenAddModal: () => void
}

export function Bookshelf({ onOpenBook, onOpenAddModal }: BookshelfProps) {
  const [filter, setFilter] = useState<'all' | 'reading' | 'completed' | 'want-to-read'>(
    'all'
  )
  const books = useBookStore((state) => state.books)

  const filteredBooks =
    filter === 'all'
      ? books
      : books.filter((book) => book.status === filter)

  const stats = {
    reading: books.filter((b) => b.status === 'reading').length,
    completed: books.filter((b) => b.status === 'completed').length,
    wantToRead: books.filter((b) => b.status === 'want-to-read').length,
  }

  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: '📖 Reading', value: stats.reading },
            { label: '✓ Completed', value: stats.completed },
            { label: '⭐ Want to Read', value: stats.wantToRead },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="p-4 bg-night-900/60 border border-ember-600/20 rounded-lg text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ borderColor: 'rgba(244, 179, 102, 0.5)' }}
            >
              <p className="text-cream/60 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-ember-300">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          {(['all', 'reading', 'completed', 'want-to-read'] as const).map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-ember-600/40 text-ember-300 border border-ember-600/60'
                  : 'bg-night-800/40 text-cream/60 border border-ember-600/20 hover:border-ember-600/50 hover:text-cream'
              }`}
            >
              {f === 'all' && '📚 All Books'}
              {f === 'reading' && '📖 Reading'}
              {f === 'completed' && '✓ Completed'}
              {f === 'want-to-read' && '⭐ Want to Read'}
            </motion.button>
          ))}
        </div>

        {/* Add Book Button */}
        <div className="mb-8 flex justify-end">
          <motion.button
            onClick={onOpenAddModal}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(244, 179, 102, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ember-600 to-ember-500 text-night-950 font-bold rounded-lg shadow-lg hover:shadow-candlelight-lg transition-all group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Log a New Read
          </motion.button>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book, idx) => (
              <div
                key={book.id}
                onClick={() => onOpenBook(book)}
              >
                <BookCard book={book} onClick={() => onOpenBook(book)} index={idx} />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-cream/40 text-lg mb-4">No books in this category yet</p>
            <motion.button
              onClick={onOpenAddModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Your First Book
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
