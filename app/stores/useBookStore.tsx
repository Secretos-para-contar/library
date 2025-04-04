import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

// eslint-disable-next-line import/no-unresolved
import { IBook } from "~/interfaces/Book"

interface SearchFilters {
  searchTerm: string
  order: string
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
}

export const useBookStore = create<BooksResponse>()(
  persist(
    (set) => ({
      books: [],
      quantity: 0,
      status: 200,
      searchFilters: {
        searchTerm: "",
        order: "",
        setSearchTerm: (searchTerm: string) => {
          set((state) => ({
            searchFilters: {
              ...state.searchFilters,
              searchTerm,
            },
          }))
        },
        setOrder: (order: string) => {
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
    }),
    {
      name: "books-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
