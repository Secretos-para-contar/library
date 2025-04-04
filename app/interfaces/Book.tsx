export interface IBook {
  id: number
  title: string
  author: string
  year: string | number
  rating?: string | number
  summary: string
  editorial: string
  genre: string[]
  cover: string
  downloadLink: string
  pdfLink: string
  audiobookLink: string
}
