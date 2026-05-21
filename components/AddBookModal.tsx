'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, Edit3 } from 'lucide-react'
import { Book, useBookStore } from '@/lib/store'

interface AddBookModalProps {
  isOpen: boolean
  onClose: () => void
}

const PLACEHOLDER_COVERS = [
  'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1543002588-d83cdf1d3644?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
]

export function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const [mode, setMode] = useState<'select' | 'kindle' | 'manual'>('select')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [kindleUrl, setKindleUrl] = useState('')
  const [status, setStatus] = useState<'reading' | 'completed' | 'want-to-read'>('want-to-read')
  const addBook = useBookStore((state) => state.addBook)

  const handleAddBook = (coverUrl: string) => {
    if (!title.trim() || !author.trim()) {
      alert('Please enter both title and author')
      return
    }

    addBook({
      title: title.trim(),
      author: author.trim(),
      coverUrl,
      status,
      thoughts: '',
      quotes: [],
    })

    setTitle('')
    setAuthor('')
    setKindleUrl('')
    setStatus('want-to-read')
    setMode('select')
    onClose()
  }

  const handleKindleQuickAdd = () => {
    // Simulate fetching book data from Kindle
    if (!kindleUrl.trim()) {
      alert('Please paste a Kindle link or identifier')
      return
    }

    // Mock data extraction
    const mockAuthor = 'Unassigned Author'
    const mockTitle = 'A New Read'

    setTitle(mockTitle)
    setAuthor(mockAuthor)
    setMode('manual')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div className="bg-night-900 rounded-2xl border border-ember-600/30 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-ember-600/20">
                <h2 className="text-2xl font-serif font-bold text-cream">
                  {mode === 'select' && 'Add a New Book'}
                  {mode === 'kindle' && '📱 Kindle Quick-Add'}
                  {mode === 'manual' && '✍️ Manual Entry'}
                </h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-night-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-cream/60" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                {mode === 'select' && (
                  <div className="space-y-4">
                    <motion.button
                      onClick={() => setMode('kindle')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-gradient-to-r from-ember-600/20 to-ember-700/20 border border-ember-600/30 hover:border-ember-600/60 rounded-lg text-left transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-ember-400 group-hover:text-ember-300" />
                        <div>
                          <h3 className="font-semibold text-cream">Kindle Quick-Add</h3>
                          <p className="text-sm text-cream/60">
                            Paste a Kindle link to auto-populate details
                          </p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      onClick={() => setMode('manual')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-gradient-to-r from-night-800/40 to-night-700/40 border border-ember-600/30 hover:border-ember-600/60 rounded-lg text-left transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Edit3 className="w-6 h-6 text-ember-400 group-hover:text-ember-300" />
                        <div>
                          <h3 className="font-semibold text-cream">Manual Entry</h3>
                          <p className="text-sm text-cream/60">
                            Enter book details manually
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                )}

                {mode === 'kindle' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-cream mb-2">
                        Paste Kindle Link
                      </label>
                      <input
                        type="text"
                        value={kindleUrl}
                        onChange={(e) => setKindleUrl(e.target.value)}
                        placeholder="https://amazon.com/dp/..."
                        className="input-field"
                      />
                      <p className="text-xs text-cream/40 mt-2">
                        We'll extract the title and author automatically
                      </p>
                    </div>

                    <motion.button
                      onClick={handleKindleQuickAdd}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="button-primary w-full"
                    >
                      Continue with Extracted Data
                    </motion.button>

                    <motion.button
                      onClick={() => setMode('select')}
                      className="button-secondary w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                  </div>
                )}

                {mode === 'manual' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-cream mb-2">
                        Book Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="The Secret History..."
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-cream mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Donna Tartt"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-cream mb-2">
                        Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className="input-field appearance-none"
                      >
                        <option value="want-to-read">Want to Read</option>
                        <option value="reading">Currently Reading</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="pt-4 space-y-3">
                      <p className="text-sm text-cream/60">Choose a cover design:</p>
                      <div className="grid grid-cols-5 gap-2">
                        {PLACEHOLDER_COVERS.map((cover, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddBook(cover)}
                            className="aspect-square rounded border border-ember-600/30 hover:border-ember-600/60 overflow-hidden group"
                          >
                            <img
                              src={cover}
                              alt="Cover option"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      onClick={() => handleAddBook(PLACEHOLDER_COVERS[0])}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="button-primary w-full mt-4"
                    >
                      Add Book
                    </motion.button>

                    <motion.button
                      onClick={() => setMode('select')}
                      className="button-secondary w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
