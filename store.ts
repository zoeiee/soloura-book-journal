'use client'

import { create } from 'zustand'

export interface Quote {
  id: string
  text: string
  page?: number
}

export interface Book {
  id: string
  title: string
  author: string
  status: 'reading' | 'completed' | 'want-to-read'
  cover?: string
  notes: string
  quotes: Quote[]
  dateAdded: string
  rating?: number
}

interface BookStore {
  books: Book[]
  addBook: (book: Omit<Book, 'id' | 'dateAdded'>) => void
  updateBook: (id: string, updates: Partial<Book>) => void
  deleteBook: (id: string) => void
  addQuote: (bookId: string, quote: Omit<Quote, 'id'>) => void
  removeQuote: (bookId: string, quoteId: string) => void
}

const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Secret History',
    author: 'Donna Tartt',
    status: 'completed',
    cover: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    notes:
      'A haunting tale of privilege and moral decay. The prose is intoxicating, and the characters linger long after you finish.',
    quotes: [
      {
        id: 'q1',
        text: '"The grotesque world is the only true world."',
        page: 234,
      },
    ],
    dateAdded: '2024-01-15',
    rating: 5,
  },
  {
    id: '2',
    title: 'Ninth House',
    author: 'Leigh Bardugo',
    status: 'reading',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop',
    notes: 'Dark academia meets supernatural mystery. The world-building is intricate and immersive.',
    quotes: [],
    dateAdded: '2024-02-03',
  },
  {
    id: '3',
    title: 'Mexican Gothic',
    author: 'Silvia Moreno-Garcia',
    status: 'completed',
    cover: 'https://images.unsplash.com/photo-1543002588-d83cdf1d3644?w=400&h=600&fit=crop',
    notes:
      'A Gothic masterpiece set in Mexico. The atmosphere is suffocating and beautiful, dripping with dread.',
    quotes: [
      {
        id: 'q2',
        text: '"Fear was the only thing that had ever made sense to me."',
      },
    ],
    dateAdded: '2024-01-01',
    rating: 4,
  },
  {
    id: '4',
    title: 'The Starless Sea',
    author: 'Erin Morgenstern',
    status: 'want-to-read',
    cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
    notes: '',
    quotes: [],
    dateAdded: '2024-02-10',
  },
  {
    id: '5',
    title: 'Piranesi',
    author: 'Susanna Clarke',
    status: 'completed',
    cover: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    notes: 'A mysterious, intricate tale of memory and identity. The prose is lyrical and strange.',
    quotes: [
      {
        id: 'q3',
        text: '"The world is not as it appears to be."',
      },
    ],
    dateAdded: '2024-01-28',
    rating: 5,
  },
]

export const useBookStore = create<BookStore>((set) => ({
  books: MOCK_BOOKS,

  addBook: (book) =>
    set((state) => ({
      books: [
        {
          ...book,
          id: Date.now().toString(),
          dateAdded: new Date().toISOString().split('T')[0],
        },
        ...state.books,
      ],
    })),

  updateBook: (id, updates) =>
    set((state) => ({
      books: state.books.map((book) => (book.id === id ? { ...book, ...updates } : book)),
    })),

  deleteBook: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
    })),

  addQuote: (bookId, quote) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === bookId
          ? {
              ...book,
              quotes: [
                ...book.quotes,
                {
                  ...quote,
                  id: Date.now().toString(),
                },
              ],
            }
          : book
      ),
    })),

  removeQuote: (bookId, quoteId) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === bookId
          ? {
              ...book,
              quotes: book.quotes.filter((q) => q.id !== quoteId),
            }
          : book
      ),
    })),
}))
