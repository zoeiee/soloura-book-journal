'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, BookMarked, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { Book, Quote, useBookStore } from '@/lib/store'

interface BookDetailProps {
  book: Book | null
  onClose: () => void
  isOpen: boolean
}

export function BookDetail({ book, onClose, isOpen }: BookDetailProps) {
  const [newThoughts, setNewThoughts] = useState('')
  const [quoteText, setQuoteText] = useState('')
  const [quoteType, setQuoteType] = useState<'text' | 'image'>('text')
  const [imageQuoteUrl, setImageQuoteUrl] = useState('')
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [editingThoughts, setEditingThoughts] = useState(false)

  const updateThoughts = useBookStore((state) => state.updateThoughts)
  const addQuote = useBookStore((state) => state.addQuote)
  const removeQuote = useBookStore((state) => state.removeQuote)

  if (!book) return null

  const handleSaveThoughts = () => {
    updateThoughts(book.id, newThoughts)
    setEditingThoughts(false)
  }

  const handleAddQuote = () => {
    if (quoteType === 'text' && quoteText.trim()) {
      addQuote(book.id, {
        type: 'text',
        content: quoteText,
      })
      setQuoteText('')
      setShowQuoteForm(false)
    } else if (quoteType === 'image' && imageQuoteUrl.trim()) {
      addQuote(book.id, {
        type: 'image',
        content: imageQuoteUrl,
      })
      setImageQuoteUrl('')
      setShowQuoteForm(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && book && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
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
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-night-900 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />

                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-4 right-4 p-2 bg-night-950/80 hover:bg-night-950 rounded-lg border border-ember-600/20 transition-colors z-10"
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
                      <span>
                        Added: {new Date(book.dateAdded).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Thoughts Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-cream flex items-center gap-2">
                        <BookMarked className="w-5 h-5 text-ember-400" />
                        Thoughts & Musings
                      </h3>
                      {!editingThoughts && (
                        <motion.button
                          onClick={() => {
                            setEditingThoughts(true)
                            setNewThoughts(book.thoughts)
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-sm px-3 py-1 bg-ember-600/20 hover:bg-ember-600/40 border border-ember-600/30 rounded text-ember-300 transition-colors"
                        >
                          Edit
                        </motion.button>
                      )}
                    </div>

                    {editingThoughts ? (
                      <div className="space-y-3">
                        <textarea
                          value={newThoughts}
                          onChange={(e) => setNewThoughts(e.target.value)}
                          placeholder="Write your thoughts, feelings, and reflections about this book..."
                          className="input-field min-h-40 resize-none"
                        />
                        <div className="flex gap-2">
                          <motion.button
                            onClick={handleSaveThoughts}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="button-primary flex-1"
                          >
                            Save Thoughts
                          </motion.button>
                          <motion.button
                            onClick={() => setEditingThoughts(false)}
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
                        {book.thoughts ? (
                          <p className="text-cream/80 leading-relaxed whitespace-pre-wrap">
                            {book.thoughts}
                          </p>
                        ) : (
                          <p className="text-cream/40 italic">
                            No thoughts yet. Start writing to capture your reflections...
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quotes Vault Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-cream flex items-center gap-2">
                        ✨ The Quote Vault
                      </h3>
                      {!showQuoteForm && (
                        <motion.button
                          onClick={() => setShowQuoteForm(true)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-ember-600/20 hover:bg-ember-600/40 rounded-lg border border-ember-600/30 text-ember-300 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>

                    {/* Quote Form */}
                    {showQuoteForm && (
                      <motion.div
                        className="p-4 bg-night-800/40 rounded-lg border border-ember-600/20 space-y-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex gap-2">
                          {(['text', 'image'] as const).map((type) => (
                            <motion.button
                              key={type}
                              onClick={() => setQuoteType(type)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex-1 py-2 px-3 rounded text-sm font-semibold transition-all ${
                                quoteType === type
                                  ? 'bg-ember-600 text-night-950'
                                  : 'bg-night-700/40 text-cream hover:bg-night-700/60'
                              }`}
                            >
                              {type === 'text' ? '📝 Text' : '🖼️ Image'}
                            </motion.button>
                          ))}
                        </div>

                        {quoteType === 'text' && (
                          <textarea
                            value={quoteText}
                            onChange={(e) => setQuoteText(e.target.value)}
                            placeholder="Paste your favorite line..."
                            className="input-field resize-none"
                          />
                        )}

                        {quoteType === 'image' && (
                          <input
                            type="url"
                            value={imageQuoteUrl}
                            onChange={(e) => setImageQuoteUrl(e.target.value)}
                            placeholder="Paste image URL or screenshot..."
                            className="input-field"
                          />
                        )}

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
                              setQuoteText('')
                              setImageQuoteUrl('')
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

                    {/* Quotes List */}
                    {book.quotes.length > 0 ? (
                      <div className="space-y-3">
                        {book.quotes.map((quote, idx) => (
                          <motion.div
                            key={quote.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-4 bg-night-800/40 rounded-lg border border-ember-600/20 group hover:border-ember-600/50 transition-colors"
                          >
                            {quote.type === 'text' ? (
                              <div className="flex gap-3">
                                <span className="text-2xl text-ember-400 flex-shrink-0">
                                  "
                                </span>
                                <div className="flex-1">
                                  <p className="text-cream/80 italic leading-relaxed">
                                    {quote.content}
                                  </p>
                                  <p className="text-xs text-cream/40 mt-2">
                                    {new Date(quote.timestamp).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <img
                                  src={quote.content}
                                  alt="Quote screenshot"
                                  className="max-w-full max-h-40 rounded"
                                />
                                <p className="text-xs text-cream/40">
                                  {new Date(quote.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                            )}

                            <motion.button
                              onClick={() => removeQuote(book.id, quote.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-600/20 rounded text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-cream/40 italic text-center py-6">
                        No quotes saved yet. Add your favorite lines to build your vault.
                      </p>
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
