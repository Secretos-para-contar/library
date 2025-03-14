import { Card, CardHeader, CardTitle, CardFooter } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Download, FileText, Headphones } from "lucide-react"
import { Link } from "@remix-run/react"
import { Link as LinkIcon } from "lucide-react"

import { motion } from "framer-motion"

type BookCardProps = {
  title: string
  author: string
  editorial: string
  genre: string[]
  summary: string
  cover: string | null
  bookId: number | string
  downloadLink: string | null
  pdfLink: string | null
  audiobookLink: string | null
}

export function BookCard({
  title,
  author,
  editorial,
  genre,
  summary,
  bookId,
  cover = "",
}: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="flex flex-col max-w-4xl  hover:scale-105 transition-transform duration-300 ease-in-out p-5 animate-in">
        <div className="flex flex-col md:flex-row gap-6  ">
          <div className="flex-shrink-0 md:mr-6">
            <img
              src={cover ?? "https://placehold.co/400x500"}
              alt="Remix Logo"
              className="rounded-md shadow-md w-full max-w-[200px] md:max-w-[250px] h-auto mx-auto md:mx-0"
            />
          </div>
          <div className="">
            <CardHeader>
              <Link to={`/book/${bookId}`}>
                <CardTitle className="text-xl flex items-center gap-2 hover:underline">
                  <LinkIcon className="h-6 w-6 text-primary" />
                  {title}
                </CardTitle>
              </Link>
              <p className="text-m text-muted-foreground">
                por: <span className="font-medium">{author}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Editorial:<span className="font-medium">{editorial}</span>
              </p>
              <div className="flex gap-2">
                {genre.map((gen, index) => (
                  <Badge className="bg-blue-500 text-blue-100" key={index}>
                    {gen}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardFooter className="mt-4">
              <div>
                <h3 className="font-semibold mb-2">Resumen</h3>
                <p className="text-muted-foreground line-clamp-3">{summary}</p>
                <Link
                  to={`/book/${bookId}`}
                  className="text-primary hover:underline text-sm mt-2 inline-block"
                >
                  Leer más
                </Link>
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button
                    variant="default"
                    className="bg-blue-500 hover:bg-blue-400 text-blue-100 cursor-pointer transition-colors duration-300"
                  >
                    <Download className="mr-2 h-4 w-4 " />
                    Descargar
                  </Button>
                  <Button variant="outline" className="cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver PDF
                  </Button>
                  <Button variant="outline" className="cursor-pointer">
                    <Headphones className="mr-2 h-4 w-4" />
                    Audiolibro
                  </Button>
                </div>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
