'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { Book } from '@/lib/store'

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
        ease: 'easeOut',
      }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      onClick={onClick}
      className="cursor-pointer group h-full"
    >
      <div className="relative overflow-hidden rounded-lg h-80 sm:h-96 bg-night-800 border border-ember-600/20 group-hover:border-ember-600/50 transition-all duration-300 shadow-lg group-hover:shadow-candlelight-lg">
        {/* Cover Image */}
        <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-night-900 to-night-800">
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Glow Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-ember-600/0 to-transparent opacity-0 group-hover:opacity-20"
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Status Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 bg-night-950/80 backdrop-blur-sm border border-ember-600/30 rounded-full">
            <span className="text-xs font-semibold text-ember-300">
              {book.status === 'reading' && '📖 Reading'}
              {book.status === 'completed' && '✓ Done'}
              {book.status === 'want-to-read' && '⭐ Want to Read'}
            </span>
          </div>

          {/* Rating Stars - if completed */}
          {book.rating && book.status === 'completed' && (
            <div className="absolute bottom-3 left-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < book.rating!
                      ? 'fill-ember-400 text-ember-400'
                      : 'text-night-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hover Info Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-cream line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-ember-300/80">{book.author}</p>
            <p className="text-xs text-cream/50 italic">
              Added {new Date(book.dateAdded).toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Title and Author Below Card */}
      <motion.div
        className="mt-3 px-1 min-h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="font-serif font-semibold text-cream line-clamp-2 text-sm leading-tight">
          {book.title}
        </h3>
        <p className="text-xs text-ember-300/70 mt-1">{book.author}</p>
      </motion.div>
    </motion.div>
  )
}
