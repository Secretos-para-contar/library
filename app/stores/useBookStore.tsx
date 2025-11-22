import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// eslint-disable-next-line import/no-unresolved
import { IBook } from "~/interfaces/Book"

interface SearchFilters {
  searchTerm: string
  order: "A-Z" | "Z-A" | "relevance" | string
  setSearchTerm: (searchTerm: string) => void
  setOrder: (order: string) => void
}

interface BooksResponse {
  books: IBook[]
  status?: number
  quantity: number
  searchFilters: SearchFilters
  setBooks: (books: IBook[]) => void
  setStatus: (status: number) => void
  orderBy: (order: string) => void
}

export const useBookStore = create<BooksResponse>()(
  persist(
    (set) => ({
      books: [],
      quantity: 0,
      status: 200,
      searchFilters: {
        searchTerm: "",
        order: "A-Z",
        setSearchTerm: (searchTerm: string) => {
          set((state) => ({
            searchFilters: {
              ...state.searchFilters,
              searchTerm,
            },
          }))
        },
        setOrder: (order: "A-Z" | "Z-A" | "relevance" | string) => {
          set((state) => ({
            searchFilters: {
              ...state.searchFilters,
              order,
            },
          }))
        },
      },
      setBooks: (books: IBook[]) => {
        set({ books, quantity: books.length })
      },
      setStatus: (status: number) => {
        set({ status })
      },
      orderBy: (order: string) => {
        // Ordenar los libros por el criterio seleccionado
        const books = useBookStore.getState().books
        
        // Helper function to normalize rating to number
        const normalizeRating = (rating?: string | number): number => {
          if (rating === undefined) return 0
          return typeof rating === 'string' ? parseFloat(rating) : rating
        }

        if (order === "A-Z") {
          const booksSorted = [...books].sort((a: IBook, b: IBook) => {
            return a.title.localeCompare(b.title)
          })
          set({ books: booksSorted })
        }

        if (order === "Z-A") {
          const booksSorted = [...books].sort((a: IBook, b: IBook) => {
            return b.title.localeCompare(a.title)
          })
          set({ books: booksSorted })
        }

        if (order === "RELEVANCE") {
          const booksSorted = [...books].sort((a: IBook, b: IBook) => {
            return normalizeRating(b.rating) - normalizeRating(a.rating)
          })
          set({ books: booksSorted })
        }
      },
    }),
    {
      name: "books-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
