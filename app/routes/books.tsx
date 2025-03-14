import { BookCardV2 } from "~/components/core/books-view/BookCardV2"

export default function Books() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 p-4 sm:mx-40">
        {BooksData.map((book) => (
          <BookCardV2
            id={book.id}
            key={book.id}
            title={book.title}
            author={book.author}
            publisher={book.editorial}
            summary={book.summary}
            coverImage={book.cover}
            tags={book.genre}
            rating={4.5}
            year={2021}
          />
        ))}
      </div>
    </>
  )
}

const BooksData = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel Garcia Marquez",
    summary:
      "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982. Es considerada una obra maestra de la literatura hispanoamericana y universal, así como una de las obras más traducidas y leídas en español.",
    editorial: "Sudamericana",
    genre: ["Ficción", "Realismo mágico"],
    cover:
      "https://secretosparacontar.org/wp-content/uploads/2024/01/PORTADA-CONTRARIOS.webp",
    downloadLink: "https://example.com",
    pdfLink: "https://example.com",
    audiobookLink: "https://example.com",
  },
  {
    id: 2,
    title: "El amor en los tiempos del cólera",
    author: "Gabriel Garcia Marquez",
    summary:
      "El amor en los tiempos del cólera es una novela del escritor colombiano Gabriel García Márquez, publicada en 1985. Es considerada una de las obras maestras de la literatura hispanoamericana.",
    editorial: "Sudamericana",
    genre: ["Ficción", "Romance"],
    cover:
      "https://secretosparacontar.org/wp-content/uploads/2024/01/Erase-una-vez.webp",
    downloadLink: "https://example.com",
    pdfLink: "https://example.com",
    audiobookLink: "https://example.com",
  },
  {
    id: 3,
    title: "Rayuela",
    author: "Julio Cortázar",
    summary:
      "Rayuela es una novela del escritor argentino Julio Cortázar. Publicada en 1963, es una de las obras más importantes de la literatura hispanoamericana.",
    editorial: "Sudamericana",
    genre: ["Ficción", "Novela experimental"],
    cover:
      "https://secretosparacontar.org/wp-content/uploads/2024/01/PORTADA-CONTRARIOS.webp",
    downloadLink: "https://example.com",
    pdfLink: "https://example.com",
    audiobookLink: "https://example.com",
  },
]
