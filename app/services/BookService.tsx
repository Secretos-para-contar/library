// eslint-disable-next-line import/no-unresolved
import { IBook } from "@interfaces/Book"

export async function getBooks(): Promise<IBook[]> {
  // Peticion a la api
  const response = await fetch(
    "https://67433f9cb7464b1c2a64205a.mockapi.io/api/v1/books"
  )

  return response.json()
}
