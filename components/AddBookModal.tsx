'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus } from 'lucide-react'
import { useBookStore, Book } from '@/store'

interface AddBookModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddBookModal({ isOpen, onClose }: AddBookModalProps) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState<'reading' | 'completed' | 'want-to-read'>('want-to-read')
  const [cover, setCover] = useState('')
  const addBook = useBookStore((state) => state.addBook)

  const handleSubmit = () => {
    if (!title.trim() || !author.trim()) {
      alert('Please enter title and author')
      return
    }

    addBook({
      title: title.trim(),
      author: author.trim(),
      status,
      cover: cover || undefined,
      notes: '',
      quotes: [],
      rating: undefined,
    })

    setTitle('')
    setAuthor('')
    setStatus('want-to-read')
    setCover('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div className="bg-night-900 rounded-2xl border border-ember-600/30 shadow-2xl max-w-lg w-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-ember-600/20">
                <h2 className="text-2xl font-serif font-bold text-cream">Add a Book</h2>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-night-800 rounded-lg"
                >
                  <X className="w-5 h-5 text-cream/60" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-cream mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter book title..."
                    className="input-field"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cream mb-2">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name..."
                    className="input-field"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cream mb-2">Cover URL</label>
                  <input
                    type="url"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                    placeholder="https://..."
                    className="input-field text-xs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cream mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="input-field"
                  >
                    <option value="want-to-read">Want to Read</option>
                    <option value="reading">Currently Reading</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="button-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Book
                  </motion.button>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="button-secondary flex-1"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
