import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BooksLayout {
  display: "grid grid-cols-2" | "flex flex-col"
  setDisplay: (display: "grid grid-cols-2" | "flex flex-col") => void
}

export const useBooksLayoutStore = create<BooksLayout>()(
  persist(
    (set) => ({
      display: "flex flex-col",
      setDisplay: (display: "grid grid-cols-2" | "flex flex-col") =>
        set({ display }),
    }),
    { name: "books-layout" }
  )
)
