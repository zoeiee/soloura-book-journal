'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, Edit2, Check } from 'lucide-react'
import { Book, Quote, useBookStore } from '@/store'

interface BookDetailProps {
  book: Book | null
  onClose: () => void
  isOpen: boolean
}

export function BookDetail({ book, onClose, isOpen }: BookDetailProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [notes, setNotes] = useState(book?.notes || '')
  const [newQuote, setNewQuote] = useState('')
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [rating, setRating] = useState(book?.rating || 0)

  const updateBook = useBookStore((state) => state.updateBook)
  const addQuote = useBookStore((state) => state.addQuote)
  const removeQuote = useBookStore((state) => state.removeQuote)

  if (!book) return null

  const handleSaveNotes = () => {
    updateBook(book.id, { notes })
    setIsEditingNotes(false)
  }

  const handleAddQuote = () => {
    if (!newQuote.trim()) return
    addQuote(book.id, { text: newQuote })
    setNewQuote('')
    setShowQuoteForm(false)
  }

  const handleSaveRating = (newRating: number) => {
    setRating(newRating)
    updateBook(book.id, { rating: newRating })
  }

  return (
    <AnimatePresence>
      {isOpen && book && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-screen flex items-start justify-center p-4 pt-8">
              <motion.div
                className="bg-night-900 rounded-2xl border border-ember-600/30 shadow-2xl max-w-3xl w-full"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Header with Image */}
                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl bg-gradient-to-b from-night-800 to-night-900">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ember-900 to-night-900">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📖</div>
                        <p className="text-cream/50 text-lg">{book.title}</p>
                      </div>
                    </div>
                  )}

                  <motion.div className="absolute inset-0 bg-gradient-to-t from-night-900 to-transparent" />

                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-4 right-4 p-2 bg-night-950/80 hover:bg-night-950 rounded-lg border border-ember-600/20 z-10"
                  >
                    <X className="w-5 h-5 text-cream" />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Title & Author */}
                  <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-cream mb-2">
                      {book.title}
                    </h2>
                    <p className="text-lg text-ember-300/80">{book.author}</p>
                    <div className="mt-4 flex gap-4 text-sm text-cream/60">
                      <span>
                        Status:{' '}
                        <span className="text-ember-300 font-semibold">
                          {book.status === 'reading' && '📖 Reading'}
                          {book.status === 'completed' && '✓ Completed'}
                          {book.status === 'want-to-read' && '⭐ Want to Read'}
                        </span>
                      </span>
                      <span>Added: {book.dateAdded}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-cream">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          onClick={() => handleSaveRating(star)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-2xl transition-transform"
                        >
                          {star <= rating ? '⭐' : '☆'}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-cream flex items-center gap-2">
                        📝 My Notes
                      </h3>
                      {!isEditingNotes && (
                        <motion.button
                          onClick={() => {
                            setIsEditingNotes(true)
                            setNotes(book.notes)
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs px-3 py-1 bg-ember-600/20 hover:bg-ember-600/40 border border-ember-600/30 rounded text-ember-300 flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </motion.button>
                      )}
                    </div>

                    {isEditingNotes ? (
                      <div className="space-y-3">
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Write your thoughts..."
                          className="input-field min-h-40 resize-none"
                        />
                        <div className="flex gap-2">
                          <motion.button
                            onClick={handleSaveNotes}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="button-primary flex-1 flex items-center justify-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Save
                          </motion.button>
                          <motion.button
                            onClick={() => setIsEditingNotes(false)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="button-secondary flex-1"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-night-800/40 rounded-lg border border-ember-600/20 prose-quote">
                        {book.notes ? (
                          <p className="text-cream/80 leading-relaxed whitespace-pre-wrap">{book.notes}</p>
                        ) : (
                          <p className="text-cream/40 italic">No notes yet...</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quotes Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-cream flex items-center gap-2">
                        💬 Quotes
                      </h3>
                      {!showQuoteForm && (
                        <motion.button
                          onClick={() => setShowQuoteForm(true)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-ember-600/20 hover:bg-ember-600/40 rounded-lg border border-ember-600/30 text-ember-300"
                        >
                          <Plus className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>

                    {showQuoteForm && (
                      <motion.div
                        className="p-4 bg-night-800/40 rounded-lg border border-ember-600/20 space-y-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <textarea
                          value={newQuote}
                          onChange={(e) => setNewQuote(e.target.value)}
                          placeholder="Add a quote..."
                          className="input-field resize-none"
                        />
                        <div className="flex gap-2">
                          <motion.button
                            onClick={handleAddQuote}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="button-primary flex-1"
                          >
                            Save Quote
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              setShowQuoteForm(false)
                              setNewQuote('')
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="button-secondary flex-1"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {book.quotes.length > 0 ? (
                      <div className="space-y-3">
                        {book.quotes.map((quote, idx) => (
                          <motion.div
                            key={quote.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 bg-night-800/40 rounded-lg border border-ember-600/20 group hover:border-ember-600/50 transition-colors relative"
                          >
                            <p className="text-cream/80 italic leading-relaxed">"{quote.text}"</p>
                            {quote.page && (
                              <p className="text-xs text-cream/40 mt-2">page {quote.page}</p>
                            )}
                            <motion.button
                              onClick={() => removeQuote(book.id, quote.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-600/20 rounded text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-cream/40 italic text-center py-6">No quotes yet...</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
