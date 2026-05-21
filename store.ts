import { create } from 'zustand'

export interface Quote {
  id: string
  type: 'text' | 'image'
  content: string // For text quotes
  imageUrl?: string // For image quotes
  imageAlt?: string
  timestamp: string
}

export interface Book {
  id: string
  title: string
  author: string
  coverUrl: string
  dateAdded: string
  status: 'reading' | 'completed' | 'want-to-read'
  rating?: number
  thoughts: string
  quotes: Quote[]
  color?: string // Dominant color from cover for theming
}

interface BookStore {
  books: Book[]
  addBook: (book: Omit<Book, 'id' | 'dateAdded'>) => void
  updateBook: (id: string, updates: Partial<Book>) => void
  deleteBook: (id: string) => void
  addQuote: (bookId: string, quote: Omit<Quote, 'id' | 'timestamp'>) => void
  removeQuote: (bookId: string, quoteId: string) => void
  updateThoughts: (bookId: string, thoughts: string) => void
}

const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Secret History',
    author: 'Donna Tartt',
    coverUrl: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    dateAdded: '2024-01-15',
    status: 'completed',
    rating: 5,
    thoughts:
      'A haunting tale of privilege and darkness. Tartt weaves a masterpiece of atmosphere and moral ambiguity. The intertwining of classical literature with the descent into decadence is both beautiful and terrifying. I found myself captivated by the prose and the slow-burn mystery that unfolds.',
    quotes: [
      {
        id: 'q1',
        type: 'text',
        content:
          '"The grotesque world is the only true world" - A quote that has haunted me long after finishing.',
        timestamp: '2024-01-20',
      },
    ],
    color: '#8b4513',
  },
  {
    id: '2',
    title: 'Ninth House',
    author: 'Leigh Bardugo',
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop',
    dateAdded: '2024-02-03',
    status: 'reading',
    thoughts:
      'Dark academia with a supernatural twist. The world-building is intricate, and the protagonist is refreshingly complex. Every chapter pulls me deeper into the mysteries of Yale\'s hidden magical societies.',
    quotes: [],
    color: '#1a1a2e',
  },
  {
    id: '3',
    title: 'Mexican Gothic',
    author: 'Silvia Moreno-Garcia',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-d83cdf1d3644?w=400&h=600&fit=crop',
    dateAdded: '2024-01-01',
    status: 'completed',
    rating: 4,
    thoughts:
      'A stunning blend of gothic horror and Mexican folklore. The atmosphere is suffocating in the best way—every room in the house feels alive with menace. Moreno-Garcia creates dread through elegance.',
    quotes: [
      {
        id: 'q2',
        type: 'text',
        content:
          '"Sometimes the monsters are real, and sometimes they are the people we love most."',
        timestamp: '2024-01-05',
      },
    ],
    color: '#2d5016',
  },
  {
    id: '4',
    title: 'The Starless Sea',
    author: 'Erin Morgenstern',
    coverUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
    dateAdded: '2024-02-10',
    status: 'reading',
    thoughts:
      'A labyrinthine journey through stories within stories. Morgenstern\'s prose is lush and hypnotic. I lose myself in the passages and harbor, finding new details with each read.',
    quotes: [],
    color: '#00215e',
  },
  {
    id: '5',
    title: 'The Invisible Library',
    author: 'Genevieve Cogman',
    coverUrl: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    dateAdded: '2024-01-28',
    status: 'completed',
    rating: 4,
    thoughts:
      'Whimsical and imaginative. The concept of infinite libraries across alternate worlds is delightful. Perfect escape literature with enough depth to keep you invested.',
    quotes: [
      {
        id: 'q3',
        type: 'text',
        content: '"The stories we tell define us. The stories we live create us."',
        timestamp: '2024-02-01',
      },
    ],
    color: '#4a2c2a',
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
                  timestamp: new Date().toISOString().split('T')[0],
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

  updateThoughts: (bookId, thoughts) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === bookId ? { ...book, thoughts } : book
      ),
    })),
}))
