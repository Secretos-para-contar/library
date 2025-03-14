import { useParams } from "@remix-run/react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
export default function Book() {
  const { bookid } = useParams()

  return (
    <div className="m-auto max-w-4xl p-4">
      <div className="mb-6">
        <Link
          to={`/books`}
          className="flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la biblioteca
        </Link>
      </div>
      <h1>Book {bookid}</h1>
    </div>
  )
}
