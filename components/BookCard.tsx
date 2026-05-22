'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Book } from '@/store'

interface BookCardProps {
  book: Book
  onClick: () => void
  index: number
}

export function BookCard({ book, onClick, index }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="cursor-pointer group h-full"
    >
      <div className="relative overflow-hidden rounded-lg h-80 bg-night-800 border border-ember-600/20 group-hover:border-ember-600/50 transition-all shadow-lg group-hover:shadow-candlelight-lg">
        {/* Cover Image */}
        <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-night-900 to-night-800">
          {book.cover ? (
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ember-900 to-night-900 text-cream/30">
              <div className="text-center">
                <div className="text-5xl mb-2">📖</div>
                <p className="text-sm">{book.title}</p>
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 bg-night-950/80 backdrop-blur-sm border border-ember-600/30 rounded-full">
            <span className="text-xs font-semibold text-ember-300">
              {book.status === 'reading' && '📖 Reading'}
              {book.status === 'completed' && '✓ Done'}
              {book.status === 'want-to-read' && '⭐ Want'}
            </span>
          </div>

          {/* Rating Stars */}
          {book.rating && (
            <div className="absolute bottom-3 left-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < book.rating!
                      ? 'fill-ember-400 text-ember-400'
                      : 'text-night-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hover Info */}
        <motion.div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="font-serif font-bold text-base text-cream line-clamp-2">{book.title}</h3>
          <p className="text-xs text-ember-300/80">{book.author}</p>
        </motion.div>
      </div>

      {/* Title Below */}
      <motion.div className="mt-3 px-1">
        <h3 className="font-serif font-semibold text-cream line-clamp-2 text-sm">{book.title}</h3>
        <p className="text-xs text-ember-300/70 mt-0.5">{book.author}</p>
      </motion.div>
    </motion.div>
  )
}
