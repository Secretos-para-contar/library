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
        // Ordenar los librso por el criterio seleccionado
        const books = useBookStore.getState().books

        if (order === "A-Z") {
          const booksSorted = books.sort((a: IBook, b: IBook) => {
            if (a.title > b.title) return 1
            if (a.title < b.title) return -1
            return 0
          })
          set({ books: booksSorted })
        }

        if (order === "Z-A") {
          const booksSorted = books.sort((a: IBook, b: IBook) => {
            if (a.title < b.title) return 1
            if (a.title > b.title) return -1
            return 0
          })
          set({ books: booksSorted })
        }

        if (order == "RELEVANCE") {
          const booksSorted = books.sort((a: IBook, b: IBook) => {
            return a.rating! > b.rating! ? 1 : -1
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
