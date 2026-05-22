'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Header } from '@/components/Header'
import { AmbientBackground } from '@/components/AmbientBackground'
import { AddBookModal } from '@/components/AddBookModal'
import { BookDetail } from '@/components/BookDetail'
import { BookCard } from '@/components/BookCard'
import { Profile } from '@/components/Profile'
import { useBookStore, Book } from '@/store'

export default function Home() {
  const [currentView, setCurrentView] = useState<'bookshelf' | 'profile'>('bookshelf')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'reading' | 'completed' | 'want-to-read'>('all')

  const books = useBookStore((state) => state.books)

  const filteredBooks =
    filter === 'all' ? books : books.filter((book) => book.status === filter)

  const stats = {
    reading: books.filter((b) => b.status === 'reading').length,
    completed: books.filter((b) => b.status === 'completed').length,
    wantToRead: books.filter((b) => b.status === 'want-to-read').length,
  }

  return (
    <div className="min-h-screen bg-night-950 text-cream relative overflow-hidden">
      {/* Ambient Background */}
      <AmbientBackground />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Header */}
        <Header currentView={currentView} onViewChange={setCurrentView} />

        {/* Page Content */}
        {currentView === 'bookshelf' ? (
          <motion.main
            className="flex-1 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto w-full px-6 py-8">
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: '📖 Reading', value: stats.reading },
                  { label: '✓ Completed', value: stats.completed },
                  { label: '⭐ Want to Read', value: stats.wantToRead },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 glass-card text-center rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-cream/60 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-ember-300">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Filter Tabs */}
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
                        : 'glass-card text-cream/60 hover:text-cream/80'
                    }`}
                  >
                    {f === 'all' && '📚 All'}
                    {f === 'reading' && '📖 Reading'}
                    {f === 'completed' && '✓ Done'}
                    {f === 'want-to-read' && '⭐ Want'}
                  </motion.button>
                ))}
              </div>

              {/* Add Book Button */}
              <div className="mb-8 flex justify-end">
                <motion.button
                  onClick={() => setIsAddModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 button-primary shadow-candlelight"
                >
                  <Plus className="w-5 h-5" />
                  Add Book
                </motion.button>
              </div>

              {/* Books Grid */}
              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBooks.map((book, idx) => (
                    <div key={book.id} onClick={() => setSelectedBook(book)}>
                      <BookCard book={book} onClick={() => setSelectedBook(book)} index={idx} />
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-cream/40 text-lg mb-4">No books found</p>
                  <motion.button
                    onClick={() => setIsAddModalOpen(true)}
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
          </motion.main>
        ) : (
          <Profile />
        )}
      </div>

      {/* Modals */}
      <AddBookModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <BookDetail
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        isOpen={selectedBook !== null}
      />
    </div>
  )
}
