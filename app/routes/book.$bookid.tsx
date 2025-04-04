import { useParams } from "@remix-run/react"

// State store
import { useBookStore } from "~/stores/useBookStore"

import { BookNavBarView } from "~/components/core/book-view/BookNavBar"
import {
  Star,
  Download,
  BookOpen,
  Headphones,
  ChevronRight,
  LockIcon,
} from "lucide-react"

// Shadcn Components
import { Button } from "~/components/ui/button"
import { Progress } from "~/components/ui/progress"
import { Badge } from "~/components/ui/badge"

// Animaciones
import { motion } from "framer-motion"
import { Card, CardContent } from "~/components/ui/card"
import { useAuthStore } from "~/stores/useAuthStore"

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const recommendedBooks = [
  {
    id: "2",
    title: "El amor en los tiempos del cólera",
    author: "Gabriel García Márquez",
    coverImage:
      "https://secretosparacontar.org/wp-content/uploads/2024/01/Erase-una-vez.webp",
    rating: 4.6,
    tags: ["Ficción", "Romance"],
  },
  {
    id: "3",
    title: "Crónica de una muerte anunciada",
    author: "Gabriel García Márquez",
    coverImage:
      "https://secretosparacontar.org/wp-content/uploads/2024/01/Erase-una-vez.webp",
    rating: 4.5,
    tags: ["Ficción", "Novela"],
  },
  {
    id: "4",
    title: "El coronel no tiene quien le escriba",
    author: "Gabriel García Márquez",
    coverImage:
      "https://secretosparacontar.org/wp-content/uploads/2024/01/Erase-una-vez.webp",
    rating: 4.3,
    tags: ["Ficción", "Novela corta"],
  },
  {
    id: "5",
    title: "La hojarasca",
    author: "Gabriel García Márquez",
    coverImage:
      "https://secretosparacontar.org/wp-content/uploads/2024/01/Erase-una-vez.webp",
    rating: 4.2,
    tags: ["Ficción", "Novela"],
  },
]

export default function Book() {
  const { bookid } = useParams()
  const { books } = useBookStore()
  const { isAauthenticated } = useAuthStore()

  const book = books.find((book) => book.id.toString() === bookid)

  return (
    <div className="m-auto p-4 ">
      <BookNavBarView bookTitle={book?.title} bookAuthor={book?.author} />
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna Izquierda - Portada e información */}
          <motion.div
            className="min-h-screen bg-background flex flex-col"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <div className="flex flex-col items-center">
                {/* Portada */}
                <div className="w-48 h-72 mb-4 rounded-md overflow-hidden shadow-md">
                  <img
                    src={book?.cover || "/placeholder.svg"}
                    alt={book?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Calificación */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(4.3)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">
                    {book?.rating}
                  </span>
                </div>

                {/* Botones de acción */}
                <div className="w-full space-y-3">
                  <Button
                    className="w-full gap-2 justify-center"
                    variant="primary"
                    disabled={!isAauthenticated}
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>

                  <Button
                    className="w-full gap-2 justify-center"
                    variant="secundary"
                  >
                    <BookOpen className="h-4 w-4" />
                    Leer texto
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full gap-2 justify-center"
                  >
                    <Headphones className="h-4 w-4" />
                    Audiolibro
                  </Button>
                </div>

                {/* Información adicional */}
                <div className="w-full mt-6 pt-6 border-t">
                  <h3 className="text-sm font-medium mb-3">Detalles</h3>
                  <dl className="grid grid-cols-2 gap-y-2 text-sm">
                    <dt className="text-muted-foreground">Autor</dt>
                    <dd>{book?.author}</dd>

                    <dt className="text-muted-foreground">Editorial</dt>
                    <dd>{book?.editorial}</dd>

                    <dt className="text-muted-foreground">Año</dt>
                    <dd>{book?.year}</dd>

                    <dt className="text-muted-foreground">Páginas</dt>
                    <dd>233</dd>

                    <dt className="text-muted-foreground">Idioma</dt>
                    <dd>español</dd>

                    <dt className="text-muted-foreground">ISBN</dt>
                    <dd>4368864465</dd>
                  </dl>
                </div>

                {/* Categorías */}
                <div className="w-full mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {book?.genre.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha - Contenido y resumen */}
          <motion.div
            className="min-h-screen bg-background flex flex-col col-span-2"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <div className="space-y-6">
              {/* Resumen */}
              <div className="bg-card border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Resumen</h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {book?.summary}
                </p>
              </div>

              {/* Progreso de lectura */}
              <div className="bg-card border rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">
                    <span className="flex items-center gap-1">
                      {!isAauthenticated && <LockIcon className="h-4 w-4" />}
                      Progreso de lectura
                    </span>
                  </h3>
                  <span className="text-sm font-medium">
                    {!isAauthenticated ? "0%" : "35%"}
                  </span>
                </div>
                <Progress
                  value={isAauthenticated ? 35 : 0}
                  className="h-2 mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {isAauthenticated ? (
                    <>
                      <span>Página 133 de 233</span>
                      <span>133 de 233 páginas</span>
                    </>
                  ) : (
                    <>
                      <span>Página 0 de 233</span>
                      <span>
                        Para ver tu progreso de lectura, inicia sesión
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <section className="mt-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recomendaciones</h2>
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver más
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 overflow-hidden scrollbar-hide">
                {recommendedBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: index * 0.35,
                    }}
                  >
                    <Card className="overflow-hidden h-[520px] border-slate-200 hover:shadow-md transition-shadow">
                      <div className="aspect-[2/3] relative overflow-hidden">
                        <img
                          src={book.coverImage || "/placeholder.svg"}
                          alt={book.title}
                          className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                          {book.rating}
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-sm line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {book.author}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
